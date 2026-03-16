import { Redis } from '@upstash/redis'
import { notifyTeamsDigest } from '@/lib/clipiq/teams'
import type { QueueItem } from '@/types/clipiq'

const kv = new Redis({ url: process.env.KV_REST_API_URL!, token: process.env.KV_REST_API_TOKEN! })

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const keys = await kv.keys('clipiq:queue:*')
  let totalPublished = 0
  let totalHookScore = 0
  let hookCount = 0
  let pendingApprovals = 0
  let scheduledThisWeek = 0
  let topPost: QueueItem | null = null

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  for (const key of keys) {
    const queue = (await kv.get<QueueItem[]>(key)) ?? []
    for (const item of queue) {
      if (item.status === 'published' && item.publishedDate && item.publishedDate > weekAgo) {
        totalPublished++
        if (item.hookScore) { totalHookScore += item.hookScore; hookCount++ }
        if (!topPost || (item.hookScore ?? 0) > (topPost.hookScore ?? 0)) topPost = item
      }
      if (item.status === 'review') pendingApprovals++
      if (item.status === 'scheduled' && item.scheduledDate && item.scheduledDate < nextWeek) scheduledThisWeek++
    }
  }

  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - 6)
  const weekLabel = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`

  await notifyTeamsDigest({
    weekLabel,
    postsPublished: totalPublished,
    avgHookScore: hookCount ? Math.round(totalHookScore / hookCount) : 0,
    pendingApprovals,
    scheduledThisWeek,
    topPost: topPost ? { title: topPost.title, platform: topPost.platforms?.[0] ?? '', hookScore: topPost.hookScore ?? 0 } : undefined,
  })

  return Response.json({ ok: true })
}
