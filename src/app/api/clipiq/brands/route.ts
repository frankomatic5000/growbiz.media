import { auth } from '@/auth'
import { getUserBrands, saveUserBrands } from '@/lib/clipiq/kv'
import type { BrandProfile } from '@/types/clipiq'
import { randomUUID } from 'crypto'

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const brands = await getUserBrands(session.user.email)
  return Response.json(brands)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const newBrand: BrandProfile = {
    id: randomUUID(),
    name: body.name ?? '',
    emoji: body.emoji ?? '🏷️',
    handle: body.handle ?? '',
    audience: body.audience ?? '',
    voice: body.voice ?? '',
    niche: body.niche ?? '',
    language: body.language ?? 'en',
    createdAt: new Date().toISOString(),
  }

  const brands = await getUserBrands(session.user.email)
  brands.push(newBrand)
  await saveUserBrands(session.user.email, brands)
  return Response.json(newBrand, { status: 201 })
}
