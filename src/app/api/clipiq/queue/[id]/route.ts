import { auth } from '@/auth'
import { getUserQueue, saveUserQueue } from '@/lib/clipiq/kv'

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const queue = await getUserQueue(session.user.email)
  const idx = queue.findIndex((i) => i.id === id)
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 })

  queue[idx] = { ...queue[idx], ...body, updatedAt: new Date().toISOString() }
  await saveUserQueue(session.user.email, queue)
  return Response.json(queue[idx])
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const queue = await getUserQueue(session.user.email)
  const filtered = queue.filter((i) => i.id !== id)
  await saveUserQueue(session.user.email, filtered)
  return Response.json({ ok: true })
}
