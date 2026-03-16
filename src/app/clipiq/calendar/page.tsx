import type { Metadata } from 'next'
import { auth } from '@/auth'
import { ClipIQTopbar } from '@/components/clipiq/ClipIQTopbar'
import { ContentCalendar } from '@/components/clipiq/ContentCalendar'
import { getUserQueue } from '@/lib/clipiq/kv'

export const metadata: Metadata = {
  title: 'Calendar — ClipIQ',
}

export default async function CalendarPage() {
  const session = await auth()
  const userId = session?.user?.email ?? 'anonymous'
  const queue = await getUserQueue(userId)
  const scheduled = queue.filter((i) => i.scheduledDate)

  return (
    <>
      <ClipIQTopbar
        title="Content Calendar"
        userImage={session?.user?.image}
        userName={session?.user?.name}
      />
      <main className="flex-1 p-6">
        <ContentCalendar events={scheduled} />
      </main>
    </>
  )
}
