import { auth } from '@/auth'
import { parseFolderUrl, listVideosInFolder, getFolderName } from '@/lib/clipiq/drive'
import { saveProject } from '@/lib/clipiq/kv'
import type { VideoProject, VideoItem } from '@/types/clipiq'
import { randomUUID } from 'crypto'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const accessToken = (session as unknown as Record<string, unknown>).googleAccessToken as string | undefined
  if (!accessToken) {
    return Response.json(
      { error: 'Google Drive access not authorised. Please sign out and sign back in to grant Drive access.' },
      { status: 403 }
    )
  }

  const { folderUrl } = await req.json() as { folderUrl: string }
  const folderId = parseFolderUrl(folderUrl)
  if (!folderId) {
    return Response.json({ error: 'Invalid Google Drive folder link. Paste the full folder URL.' }, { status: 400 })
  }

  const [folderName, files] = await Promise.all([
    getFolderName(folderId, accessToken),
    listVideosInFolder(folderId, accessToken),
  ])

  if (!files.length) {
    return Response.json({ error: 'No video files found in that folder.' }, { status: 404 })
  }

  const videos: VideoItem[] = files.map((f) => ({
    id: randomUUID(),
    fileId: f.id,
    fileName: f.name,
    status: 'pending',
  }))

  const project: VideoProject = {
    id: randomUUID(),
    userId: session.user.email,
    folderId,
    folderName,
    status: 'processing',
    videos,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await saveProject(session.user.email, project)

  return Response.json({ projectId: project.id, folderName, videos })
}
