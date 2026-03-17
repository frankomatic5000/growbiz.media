import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { FolderPipeline } from '@/components/clipiq/FolderPipeline'
import { getUserBrands } from '@/lib/clipiq/kv'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ClipIQ — Start',
}

export default async function ClipIQHome() {
  const session = await auth()
  if (!session) redirect('/clipiq/login')

  const brands = await getUserBrands(session.user?.email ?? '')
  const googleAccessToken = (session as unknown as Record<string, unknown>).googleAccessToken as string | undefined

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-screen p-6">
      <FolderPipeline brands={brands} googleAccessToken={googleAccessToken} />
    </main>
  )
}
