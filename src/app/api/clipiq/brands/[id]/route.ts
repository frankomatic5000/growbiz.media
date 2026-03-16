import { auth } from '@/auth'
import { getUserBrands, saveUserBrands } from '@/lib/clipiq/kv'

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const brands = await getUserBrands(session.user.email)
  const idx = brands.findIndex((b) => b.id === id)
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 })

  brands[idx] = { ...brands[idx], ...body }
  await saveUserBrands(session.user.email, brands)
  return Response.json(brands[idx])
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const brands = await getUserBrands(session.user.email)
  await saveUserBrands(session.user.email, brands.filter((b) => b.id !== id))
  return Response.json({ ok: true })
}
