import type { Metadata } from 'next'
import { auth } from '@/auth'
import { ClipIQTopbar } from '@/components/clipiq/ClipIQTopbar'
import { QueueList } from '@/components/clipiq/QueueList'
import { getUserQueue } from '@/lib/clipiq/kv'

export const metadata: Metadata = {
  title: 'Queue — ClipIQ',
}

export default async function QueuePage() {
  const session = await auth()
  const userId = session?.user?.email ?? 'anonymous'
  const queue = await getUserQueue(userId)

  return (
    <>
      <ClipIQTopbar
        title="Publishing Queue"
        subtitle="Review, approve and schedule your posts"
        userImage={session?.user?.image}
        userName={session?.user?.name}
      />
      <main className="flex-1 p-6">
        <QueueList initialQueue={queue} userId={userId} />
      </main>
    </>
  )
}
