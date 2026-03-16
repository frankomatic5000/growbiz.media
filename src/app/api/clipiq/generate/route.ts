import { auth } from '@/auth'
import Anthropic from '@anthropic-ai/sdk'
import { getUserBrands } from '@/lib/clipiq/kv'
import type { BrandProfile, PlatformKey, GenerateResult } from '@/types/clipiq'

const client = new Anthropic()

function buildSystemPrompt(brand: BrandProfile | undefined): string {
  return `You are an expert social media content strategist specializing in viral content for digital media brands. You create high-converting, SEO-optimized captions with authentic brand voice.

BRAND: ${brand?.name ?? 'Unknown'}
Handle: ${brand?.handle ?? ''}
Audience: ${brand?.audience ?? ''}
Voice: ${brand?.voice ?? ''}
Niche: ${brand?.niche ?? ''}
Language: ${brand?.language ?? 'en'}

RULES:
1. Strong hook in first 1-2 lines (before fold/truncation)
2. Natural keyword integration for platform SEO
3. Strategic emoji usage — not excessive
4. Specific, action-driving CTA at end
5. Platform-native hashtag strategy
6. Analyze transcript for the single most viral/emotional/provocative moment
7. Score hook potential 0-100: emotional trigger (25pts) + curiosity gap (25pts) + relatability (25pts) + specificity (25pts)

RESPOND WITH VALID JSON ONLY. No markdown, no backticks, no text outside JSON.`
}

function buildUserPrompt(params: {
  title: string
  guest: string
  location: string
  epType: string
  tone: string
  cta: string
  platforms: PlatformKey[]
  transcript: string
  keywords: string
}): string {
  const platformList = params.platforms.join(', ')
  return `Generate captions for the following content:

Title: ${params.title}
Guest: ${params.guest || 'N/A'}
Location: ${params.location || 'N/A'}
Content type: ${params.epType}
Tone: ${params.tone}
Primary CTA: ${params.cta}
Platforms needed: ${platformList}
Extra keywords: ${params.keywords || 'none'}

TRANSCRIPT / KEY QUOTES:
${params.transcript}

Return JSON matching this exact schema (only include platforms from the list above):
{
  "hookScore": <number 0-100>,
  "hookScoreReason": "<explanation of score>",
  "bestHook": "<the single best opening hook>",
  "seoKeywords": ["<keyword>"],
  ${params.platforms.map((p) => `"${p}": { "hook": "<hook>", "caption": "<full caption>", "hashtags": "<hashtags>", "altHooks": ["<alt>"], "bestTime": "<best time>", "formatTip": "<tip>" }`).join(',\n  ')}
}`
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json() as {
    title: string
    guest: string
    location: string
    epType: string
    tone: string
    cta: string
    platforms: PlatformKey[]
    transcript: string
    keywords: string
    brandId: string
  }

  const brands = await getUserBrands(session.user.email)
  const brand = brands.find((b) => b.id === body.brandId)

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: buildSystemPrompt(brand),
    messages: [{ role: 'user', content: buildUserPrompt(body) }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  let result: GenerateResult
  try {
    result = JSON.parse(text)
  } catch {
    // Attempt to extract JSON from response if wrapped in text
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return Response.json({ error: 'Failed to parse AI response' }, { status: 500 })
    result = JSON.parse(match[0])
  }

  return Response.json(result)
}
