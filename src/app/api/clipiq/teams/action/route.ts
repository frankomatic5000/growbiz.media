import { NextRequest } from 'next/server'
import { kv } from '@vercel/kv'
import type { QueueItem } from '@/types/clipiq'

export async function POST(req: NextRequest) {
  try {
    const { itemId, action } = (await req.json()) as { itemId: string; action: 'approve' | 'changes' }

    if (!itemId || !action) {
      return Response.json({ error: 'Missing itemId or action' }, { status: 400 })
    }

    const keys = await kv.keys('clipiq:queue:*')

    for (const key of keys) {
      const queue = (await kv.get<QueueItem[]>(key)) ?? []
      const idx = queue.findIndex((q) => q.id === itemId)
      if (idx === -1) continue

      queue[idx].status = action === 'approve' ? 'approved' : 'review'
      queue[idx].updatedAt = new Date().toISOString()
      await kv.set(key, queue)

      return Response.json({
        type: 'message',
        text:
          action === 'approve'
            ? `✓ "${queue[idx].title}" approved and ready to schedule.`
            : `"${queue[idx].title}" sent back for changes.`,
      })
    }

    return Response.json({ error: 'Item not found' }, { status: 404 })
  } catch {
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
