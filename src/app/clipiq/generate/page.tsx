import type { Metadata } from 'next'
import { auth } from '@/auth'
import { ClipIQTopbar } from '@/components/clipiq/ClipIQTopbar'
import { GenerateForm } from '@/components/clipiq/GenerateForm'
import { getUserBrands } from '@/lib/clipiq/kv'

export const metadata: Metadata = {
  title: 'Generate — ClipIQ',
}

export default async function GeneratePage() {
  const session = await auth()
  const userId = session?.user?.email ?? 'anonymous'
  const brands = await getUserBrands(userId)

  return (
    <>
      <ClipIQTopbar
        title="Generate Content"
        subtitle="Paste transcript → get SEO-optimized captions for all platforms"
        userImage={session?.user?.image}
        userName={session?.user?.name}
      />
      <main className="flex-1 p-6">
        <GenerateForm brands={brands} />
      </main>
    </>
  )
}
