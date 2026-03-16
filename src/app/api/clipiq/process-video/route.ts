import { auth } from '@/auth'
import { downloadFile } from '@/lib/clipiq/drive'
import { transcribeBuffer } from '@/lib/clipiq/transcribe'
import { getProject, saveProject } from '@/lib/clipiq/kv'
import { getUserBrands } from '@/lib/clipiq/kv'
import Anthropic from '@anthropic-ai/sdk'
import type { GenerateResult, BrandProfile } from '@/types/clipiq'

const anthropic = new Anthropic()

function buildPrompt(transcript: string, fileName: string, brand: BrandProfile | undefined): string {
  return `You are an expert social media content strategist. Generate viral captions for this video.

VIDEO FILE: ${fileName}
BRAND: ${brand?.name ?? 'Unknown'} | Voice: ${brand?.voice ?? 'professional'} | Audience: ${brand?.audience ?? 'general'} | Language: ${brand?.language ?? 'en'}

TRANSCRIPT:
${transcript.slice(0, 4000)}

Generate captions for Instagram, Facebook, X (Twitter), and TikTok. Score the hook potential 0-100.

RULES:
- Hook in first 1-2 lines (before truncation)
- Platform-native tone and format
- Strategic hashtags per platform
- Specific CTA at the end
- For X: max 280 chars for the hook

RESPOND WITH VALID JSON ONLY — no markdown, no backticks:
{
  "hookScore": <0-100>,
  "hookScoreReason": "<why>",
  "bestHook": "<best opening line>",
  "seoKeywords": ["<keyword>"],
  "instagram": { "hook": "", "caption": "", "hashtags": "", "altHooks": [], "bestTime": "", "formatTip": "" },
  "facebook":  { "hook": "", "caption": "", "hashtags": "", "altHooks": [], "bestTime": "", "formatTip": "" },
  "x":         { "hook": "", "caption": "", "hashtags": "", "altHooks": [], "bestTime": "", "formatTip": "" },
  "tiktok":    { "hook": "", "caption": "", "hashtags": "", "altHooks": [], "bestTime": "", "formatTip": "" }
}`
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const accessToken = (session as unknown as Record<string, unknown>).googleAccessToken as string | undefined
  if (!accessToken) return Response.json({ error: 'Google Drive access not authorised' }, { status: 403 })

  const { projectId, videoItemId, brandId } = await req.json() as {
    projectId: string
    videoItemId: string
    brandId?: string
  }

  const project = await getProject(session.user.email, projectId)
  if (!project) return Response.json({ error: 'Project not found' }, { status: 404 })

  const videoItem = project.videos.find((v) => v.id === videoItemId)
  if (!videoItem) return Response.json({ error: 'Video not found' }, { status: 404 })

  // Mark as transcribing
  videoItem.status = 'transcribing'
  project.updatedAt = new Date().toISOString()
  await saveProject(session.user.email, project)

  try {
    // Download + transcribe
    const { buffer, name, mimeType } = await downloadFile(videoItem.fileId, accessToken)
    const transcript = await transcribeBuffer(buffer, name, mimeType)

    // Mark as generating
    videoItem.status = 'generating'
    videoItem.transcript = transcript
    await saveProject(session.user.email, project)

    // Get brand context
    const brands = await getUserBrands(session.user.email)
    const brand = brands.find((b) => b.id === brandId) ?? brands[0]

    // Generate captions with Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      messages: [{ role: 'user', content: buildPrompt(transcript, videoItem.fileName, brand) }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    let captions: GenerateResult
    try {
      captions = JSON.parse(text)
    } catch {
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('Failed to parse AI response')
      captions = JSON.parse(match[0])
    }

    // Mark as ready
    videoItem.status = 'ready'
    videoItem.captions = captions
    project.updatedAt = new Date().toISOString()

    const allDone = project.videos.every((v) => v.status === 'ready' || v.status === 'error')
    if (allDone) project.status = 'ready'

    await saveProject(session.user.email, project)
    return Response.json({ videoItemId, captions, transcript })
  } catch (err) {
    videoItem.status = 'error'
    videoItem.error = err instanceof Error ? err.message : 'Processing failed'
    await saveProject(session.user.email, project)
    return Response.json({ error: videoItem.error }, { status: 500 })
  }
}
