import type { Metadata } from 'next'
import { auth } from '@/auth'
import { ClipIQTopbar } from '@/components/clipiq/ClipIQTopbar'
import { getUserQueue } from '@/lib/clipiq/kv'
import { BarChart2, Zap, ListOrdered, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard — ClipIQ',
}

export default async function DashboardPage() {
  const session = await auth()
  const userId = session?.user?.email ?? 'anonymous'
  const queue = await getUserQueue(userId)

  const pending = queue.filter((i) => i.status === 'review').length
  const approved = queue.filter((i) => i.status === 'approved').length
  const scheduled = queue.filter((i) => i.status === 'scheduled').length
  const published = queue.filter((i) => i.status === 'published').length
  const avgHook =
    queue.filter((i) => i.hookScore).length > 0
      ? Math.round(queue.reduce((s, i) => s + (i.hookScore ?? 0), 0) / queue.filter((i) => i.hookScore).length)
      : 0

  const stats = [
    { label: 'Pending review', value: pending, icon: Clock, color: 'text-clipiq-warn' },
    { label: 'Approved', value: approved, icon: Zap, color: 'text-clipiq-green' },
    { label: 'Scheduled', value: scheduled, icon: ListOrdered, color: 'text-clipiq-accent' },
    { label: 'Avg hook score', value: avgHook > 0 ? `${avgHook}/100` : '—', icon: BarChart2, color: 'text-clipiq-text' },
  ]

  return (
    <>
      <ClipIQTopbar
        title="Dashboard"
        subtitle={`Welcome back${session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}`}
        userImage={session?.user?.image}
        userName={session?.user?.name}
      />
      <main className="flex-1 p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-clipiq-card border border-clipiq-border rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon size={15} className={color} />
                <p className="text-clipiq-muted text-xs font-syne">{label}</p>
              </div>
              <p className={`font-syne font-bold text-2xl ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="font-syne font-bold text-clipiq-text text-sm mb-3">Quick actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/clipiq/generate"
              className="bg-clipiq-card border border-clipiq-border rounded-xl p-5 hover:border-clipiq-accent transition-colors group"
            >
              <Zap size={20} className="text-clipiq-accent mb-3" />
              <p className="font-syne font-bold text-clipiq-text text-sm">Generate captions</p>
              <p className="text-clipiq-muted text-xs mt-1 font-syne">Paste a transcript and get AI-optimized captions</p>
            </a>
            <a
              href="/clipiq/queue"
              className="bg-clipiq-card border border-clipiq-border rounded-xl p-5 hover:border-clipiq-accent transition-colors group"
            >
              <ListOrdered size={20} className="text-clipiq-accent mb-3" />
              <p className="font-syne font-bold text-clipiq-text text-sm">Review queue</p>
              <p className="text-clipiq-muted text-xs mt-1 font-syne">
                {pending > 0 ? `${pending} post${pending !== 1 ? 's' : ''} awaiting review` : 'No posts pending review'}
              </p>
            </a>
            <a
              href="/clipiq/brands"
              className="bg-clipiq-card border border-clipiq-border rounded-xl p-5 hover:border-clipiq-accent transition-colors group"
            >
              <BarChart2 size={20} className="text-clipiq-accent mb-3" />
              <p className="font-syne font-bold text-clipiq-text text-sm">Manage brands</p>
              <p className="text-clipiq-muted text-xs mt-1 font-syne">Set up brand voice and content profiles</p>
            </a>
          </div>
        </div>

        {/* Recent queue items */}
        {queue.length > 0 && (
          <div>
            <h2 className="font-syne font-bold text-clipiq-text text-sm mb-3">Recent queue</h2>
            <div className="bg-clipiq-card border border-clipiq-border rounded-xl overflow-hidden">
              {queue.slice(0, 5).map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 px-4 py-3 ${idx < Math.min(queue.length, 5) - 1 ? 'border-b border-clipiq-border' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-syne text-clipiq-text text-sm truncate">{item.title}</p>
                    <p className="text-clipiq-muted text-xs font-syne">{item.platforms?.join(", ")} · {item.brandName}</p>
                  </div>
                  <span className={`text-xs font-syne px-2 py-0.5 rounded-full border ${
                    item.status === 'approved' ? 'text-clipiq-green border-clipiq-green/30 bg-clipiq-green/10' :
                    item.status === 'review' ? 'text-clipiq-warn border-clipiq-warn/30 bg-clipiq-warn/10' :
                    item.status === 'published' ? 'text-clipiq-muted border-clipiq-border' :
                    'text-clipiq-accent border-clipiq-accent/30 bg-clipiq-accent/10'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
