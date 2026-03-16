import type { Metadata } from 'next'
import { auth } from '@/auth'
import { ClipIQTopbar } from '@/components/clipiq/ClipIQTopbar'
import { signOut } from 'next-auth/react'
import { AccountPanel } from './AccountPanel'

export const metadata: Metadata = {
  title: 'Account — ClipIQ',
}

export default async function AccountPage() {
  const session = await auth()

  return (
    <>
      <ClipIQTopbar
        title="My Account"
        userImage={session?.user?.image}
        userName={session?.user?.name}
      />
      <main className="flex-1 p-6 max-w-lg">
        <AccountPanel
          name={session?.user?.name ?? ''}
          email={session?.user?.email ?? ''}
          image={session?.user?.image ?? null}
        />
      </main>
    </>
  )
}
