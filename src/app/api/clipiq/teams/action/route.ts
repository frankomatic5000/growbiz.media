import { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import { publishQueueItem } from '@/lib/clipiq/publish'
import type { QueueItem } from '@/types/clipiq'

function getRedis() {
  return new Redis({ url: process.env.KV_REST_API_URL!, token: process.env.KV_REST_API_TOKEN! })
}

export async function POST(req: NextRequest) {
  try {
    const { itemId, action } = (await req.json()) as { itemId: string; action: 'approve' | 'changes' }

    if (!itemId || !action) {
      return Response.json({ error: 'Missing itemId or action' }, { status: 400 })
    }

    const kv = getRedis()
    const keys = await kv.keys('clipiq:queue:*')

    for (const key of keys) {
      const queue = (await kv.get<QueueItem[]>(key)) ?? []
      const idx = queue.findIndex((q) => q.id === itemId)
      if (idx === -1) continue

      if (action === 'approve') {
        // Trigger immediate publish
        const published = await publishQueueItem(queue[idx])
        queue[idx] = published
        await kv.set(key, queue)

        const allOk = Object.values(published.publishResults ?? {}).every((r) => r.success)
        return Response.json({
          type: 'message',
          text: allOk
            ? `✓ "${queue[idx].title}" published successfully to ${queue[idx].platforms.join(', ')}.`
            : `⚠ "${queue[idx].title}" published with some errors. Check the dashboard.`,
        })
      } else {
        queue[idx].status = 'review'
        queue[idx].updatedAt = new Date().toISOString()
        await kv.set(key, queue)

        return Response.json({
          type: 'message',
          text: `"${queue[idx].title}" sent back for changes.`,
        })
      }
    }

    return Response.json({ error: 'Item not found' }, { status: 404 })
  } catch {
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
