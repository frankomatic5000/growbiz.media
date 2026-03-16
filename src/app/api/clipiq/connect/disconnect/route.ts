import { NextRequest } from 'next/server'
import { auth } from '@/auth'
import { deletePlatformTokens } from '@/lib/clipiq/publish'
import type { PlatformKey } from '@/types/clipiq'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { platform } = (await req.json()) as { platform: PlatformKey }
  if (!platform) return Response.json({ error: 'Missing platform' }, { status: 400 })

  await deletePlatformTokens(session.user.email, platform)

  // If disconnecting instagram, also remove facebook (same Meta app)
  if (platform === 'instagram') {
    await deletePlatformTokens(session.user.email, 'facebook')
  }

  return Response.json({ ok: true })
}
