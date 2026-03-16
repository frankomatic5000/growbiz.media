import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getConnectedPlatforms } from '@/lib/clipiq/publish'
import { ClipIQTopbar } from '@/components/clipiq/ClipIQTopbar'
import { ConnectPlatforms } from '@/components/clipiq/ConnectPlatforms'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Connect Platforms — ClipIQ' }

export default async function ConnectPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>
}) {
  const session = await auth()
  if (!session?.user?.email) redirect('/clipiq/login')

  const { success, error } = await searchParams
  const connected = await getConnectedPlatforms(session.user.email)

  return (
    <>
      <ClipIQTopbar
        title="Connect Platforms"
        subtitle="Link your social accounts to enable publishing"
        userImage={session.user?.image}
        userName={session.user?.name}
      />
      <main className="flex-1 p-6 max-w-xl">
        <ConnectPlatforms
          connectedPlatforms={connected}
          successMessage={success === 'true' ? 'Platform connected successfully!' : undefined}
          errorMessage={error ? decodeURIComponent(error) : undefined}
        />
      </main>
    </>
  )
}
