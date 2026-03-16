import { auth } from '@/auth'
import { getUserQueue, saveUserQueue } from '@/lib/clipiq/kv'
import { notifyTeamsApproval } from '@/lib/clipiq/teams'
import type { QueueItem } from '@/types/clipiq'
import { randomUUID } from 'crypto'

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const queue = await getUserQueue(session.user.email)
  return Response.json(queue)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const now = new Date().toISOString()

  const newItem: QueueItem = {
    id: randomUUID(),
    userId: session.user.email,
    title: body.title ?? '',
    guest: body.guest,
    platform: body.platform,
    brandId: body.brandId ?? '',
    brandName: body.brandName ?? '',
    hook: body.hook ?? '',
    caption: body.caption ?? '',
    hashtags: body.hashtags ?? '',
    status: body.status ?? 'draft',
    hookScore: body.hookScore,
    createdAt: now,
    updatedAt: now,
  }

  const queue = await getUserQueue(session.user.email)
  queue.push(newItem)
  await saveUserQueue(session.user.email, queue)

  // Notify Teams if status is 'review'
  if (newItem.status === 'review' && process.env.TEAMS_WEBHOOK_URL) {
    notifyTeamsApproval(newItem).catch(console.error)
  }

  return Response.json(newItem, { status: 201 })
}
