import type { Metadata } from 'next'
import { auth } from '@/auth'
import { ClipIQTopbar } from '@/components/clipiq/ClipIQTopbar'
import { getUserQueue } from '@/lib/clipiq/kv'
import { BarChart2, Zap, Clock, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Analytics — ClipIQ',
}

export default async function AnalyticsPage() {
  const session = await auth()
  const userId = session?.user?.email ?? 'anonymous'
  const queue = await getUserQueue(userId)

  const published = queue.filter((i) => i.status === 'published')
  const scored = queue.filter((i) => i.hookScore != null)
  const avgHook = scored.length > 0
    ? Math.round(scored.reduce((s, i) => s + (i.hookScore ?? 0), 0) / scored.length)
    : 0
  const timeSaved = published.length * 25 // est. 25 min per post

  const platformCounts = queue.reduce<Record<string, number>>((acc, item) => {
    for (const p of item.platforms ?? []) {
      acc[p] = (acc[p] ?? 0) + 1
    }
    return acc
  }, {})

  const stats = [
    { label: 'Posts published', value: published.length, icon: TrendingUp, color: 'text-clipiq-green' },
    { label: 'Avg hook score', value: avgHook > 0 ? `${avgHook}/100` : '—', icon: Zap, color: 'text-clipiq-accent' },
    { label: 'Total in queue', value: queue.length, icon: BarChart2, color: 'text-clipiq-text' },
    { label: 'Time saved (est.)', value: `${timeSaved}m`, icon: Clock, color: 'text-clipiq-warn' },
  ]

  return (
    <>
      <ClipIQTopbar
        title="Analytics"
        userImage={session?.user?.image}
        userName={session?.user?.name}
      />
      <main className="flex-1 p-6 space-y-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-clipiq-card border border-clipiq-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon size={15} className={color} />
                <p className="text-clipiq-muted text-xs font-syne">{label}</p>
              </div>
              <p className={`font-syne font-bold text-2xl ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Platform breakdown */}
        {Object.keys(platformCounts).length > 0 && (
          <div>
            <h2 className="font-syne font-bold text-clipiq-text text-sm mb-4">Posts by platform</h2>
            <div className="bg-clipiq-card border border-clipiq-border rounded-xl p-5 space-y-3">
              {Object.entries(platformCounts).map(([platform, count]) => (
                <div key={platform} className="flex items-center gap-3">
                  <p className="font-syne text-clipiq-text text-sm capitalize w-24">{platform}</p>
                  <div className="flex-1 h-2 bg-clipiq-card2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-clipiq-accent rounded-full"
                      style={{ width: `${Math.min((count / queue.length) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-clipiq-muted text-xs font-syne w-6 text-right">{count}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {queue.length === 0 && (
          <div className="text-center py-20 text-clipiq-muted font-syne">
            <BarChart2 size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No data yet — generate and publish some posts to see analytics.</p>
          </div>
        )}
      </main>
    </>
  )
}
