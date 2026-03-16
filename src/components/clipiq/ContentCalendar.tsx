'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { QueueItem, PlatformKey } from '@/types/clipiq'

const PLATFORM_COLORS: Record<PlatformKey, string> = {
  instagram: 'bg-pink-500',
  facebook: 'bg-blue-500',
  tiktok: 'bg-cyan-400',
  x: 'bg-gray-400',
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface Props {
  events: QueueItem[]
}

export function ContentCalendar({ events }: Props) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState<QueueItem | null>(null)

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  )

  function getEvents(day: number) {
    return events.filter((e) => {
      if (!e.scheduledDate) return false
      const d = new Date(e.scheduledDate)
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day
    })
  }

  function prev() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1) }
    else setMonth((m) => m - 1)
  }
  function next() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1) }
    else setMonth((m) => m + 1)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-syne font-bold text-clipiq-text text-base">
          {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-1">
          <button onClick={prev} className="p-2 rounded-lg text-clipiq-muted hover:text-clipiq-text hover:bg-clipiq-card transition-colors">
            <ChevronLeft size={15} />
          </button>
          <button onClick={next} className="p-2 rounded-lg text-clipiq-muted hover:text-clipiq-text hover:bg-clipiq-card transition-colors">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-clipiq-card border border-clipiq-border rounded-xl overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-clipiq-border">
          {DAYS.map((d) => (
            <div key={d} className="p-2 text-center text-[10px] font-syne font-semibold text-clipiq-muted uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            const dayEvents = day ? getEvents(day) : []
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
            return (
              <div
                key={idx}
                className={`min-h-[72px] p-1.5 border-b border-r border-clipiq-border last:border-r-0 ${
                  !day ? 'bg-clipiq-card2' : ''
                }`}
              >
                {day && (
                  <>
                    <span className={`text-xs font-syne ${isToday ? 'font-bold text-clipiq-accent' : 'text-clipiq-muted'}`}>
                      {day}
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {dayEvents.slice(0, 3).map((e) => (
                        <button
                          key={e.id}
                          onClick={() => setSelected(e)}
                          className={`w-full text-left px-1.5 py-0.5 rounded text-[9px] font-syne font-semibold text-white truncate ${PLATFORM_COLORS[e.platforms?.[0] ?? 'x']}`}
                        >
                          {e.title}
                        </button>
                      ))}
                      {dayEvents.length > 3 && (
                        <p className="text-[9px] text-clipiq-muted font-syne px-1">+{dayEvents.length - 3} more</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Event modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-clipiq-card border border-clipiq-border rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-syne font-bold text-clipiq-text text-sm">{selected.title}</p>
                <p className="text-clipiq-muted text-xs font-syne">{selected.platforms?.join(', ')} · {selected.brandName}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-clipiq-muted hover:text-clipiq-text">
                <X size={16} />
              </button>
            </div>
            <p className="text-clipiq-text text-xs font-syne leading-relaxed">{selected.hook}</p>
            {selected.scheduledDate && (
              <p className="text-clipiq-muted text-xs font-syne mt-3">
                Scheduled: {new Date(selected.scheduledDate).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
