import type { Metadata } from 'next'
import { auth } from '@/auth'
import { ClipIQTopbar } from '@/components/clipiq/ClipIQTopbar'
import { BrandsManager } from '@/components/clipiq/BrandsManager'
import { getUserBrands } from '@/lib/clipiq/kv'

export const metadata: Metadata = {
  title: 'Brand Profiles — ClipIQ',
}

export default async function BrandsPage() {
  const session = await auth()
  const userId = session?.user?.email ?? 'anonymous'
  const brands = await getUserBrands(userId)

  return (
    <>
      <ClipIQTopbar
        title="Brand Profiles"
        userImage={session?.user?.image}
        userName={session?.user?.name}
      />
      <main className="flex-1 p-6">
        <BrandsManager initialBrands={brands} userId={userId} />
      </main>
    </>
  )
}
