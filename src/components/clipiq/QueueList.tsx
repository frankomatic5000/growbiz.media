'use client'

import { useState } from 'react'
import { Trash2, CheckCircle, Clock, ListOrdered } from 'lucide-react'
import type { QueueItem, PostStatus } from '@/types/clipiq'

const STATUS_STYLES: Record<PostStatus, string> = {
  draft: 'text-clipiq-muted border-clipiq-border',
  review: 'text-clipiq-warn border-clipiq-warn/40 bg-clipiq-warn/10',
  approved: 'text-clipiq-green border-clipiq-green/40 bg-clipiq-green/10',
  scheduled: 'text-clipiq-accent border-clipiq-accent/40 bg-clipiq-accent/10',
  published: 'text-clipiq-muted border-clipiq-border',
}

const FILTER_OPTIONS: { value: PostStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'review', label: 'Needs review' },
  { value: 'approved', label: 'Approved' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
]

interface Props {
  initialQueue: QueueItem[]
  userId: string
}

export function QueueList({ initialQueue, userId }: Props) {
  const [queue, setQueue] = useState(initialQueue)
  const [filter, setFilter] = useState<PostStatus | 'all'>('all')

  const filtered = filter === 'all' ? queue : queue.filter((i) => i.status === filter)

  async function updateStatus(id: string, status: PostStatus) {
    await fetch(`/api/clipiq/queue/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setQueue((prev) => prev.map((i) => i.id === id ? { ...i, status } : i))
  }

  async function remove(id: string) {
    await fetch(`/api/clipiq/queue/${id}`, { method: 'DELETE' })
    setQueue((prev) => prev.filter((i) => i.id !== id))
  }

  if (queue.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ListOrdered size={32} className="text-clipiq-muted mb-3 opacity-40" />
        <p className="text-clipiq-muted text-sm font-syne">Queue is empty</p>
        <p className="text-clipiq-muted text-xs font-syne mt-1">Generate content and add posts to your queue.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-1 bg-clipiq-card border border-clipiq-border rounded-xl p-1 w-fit flex-wrap">
        {FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-syne font-semibold transition-colors ${
              filter === value
                ? 'bg-clipiq-card2 text-clipiq-text'
                : 'text-clipiq-muted hover:text-clipiq-text'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-2">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-clipiq-card border border-clipiq-border rounded-xl p-4 flex gap-4 items-start"
          >
            {/* Status bar */}
            <div className={`w-1 self-stretch rounded-full ${
              item.status === 'approved' ? 'bg-clipiq-green' :
              item.status === 'review' ? 'bg-clipiq-warn' :
              item.status === 'scheduled' ? 'bg-clipiq-accent' :
              'bg-clipiq-border'
            }`} />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-syne font-semibold text-clipiq-text text-sm truncate">{item.title}</p>
                <span className={`shrink-0 text-[10px] font-syne px-2 py-0.5 rounded-full border ${STATUS_STYLES[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-clipiq-muted text-xs font-syne mb-2">{item.platform} · {item.brandName}{item.guest ? ` · ${item.guest}` : ''}</p>
              <p className="text-clipiq-muted text-xs font-syne line-clamp-2 leading-relaxed">{item.hook}</p>

              {/* Actions */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {item.status !== 'approved' && item.status !== 'published' && (
                  <button
                    onClick={() => updateStatus(item.id, 'approved')}
                    className="flex items-center gap-1 text-[10px] font-syne px-2.5 py-1 rounded-lg border border-clipiq-green/40 text-clipiq-green hover:bg-clipiq-green/10 transition-colors"
                  >
                    <CheckCircle size={11} /> Approve
                  </button>
                )}
                {item.status === 'approved' && (
                  <button
                    onClick={() => updateStatus(item.id, 'scheduled')}
                    className="flex items-center gap-1 text-[10px] font-syne px-2.5 py-1 rounded-lg border border-clipiq-accent/40 text-clipiq-accent hover:bg-clipiq-accent/10 transition-colors"
                  >
                    <Clock size={11} /> Schedule
                  </button>
                )}
                <button
                  onClick={() => remove(item.id)}
                  className="flex items-center gap-1 text-[10px] font-syne px-2.5 py-1 rounded-lg border border-clipiq-red/30 text-clipiq-red hover:bg-clipiq-red/10 transition-colors"
                >
                  <Trash2 size={11} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
