'use client'

import { SessionProvider } from 'next-auth/react'

export function ClipIQProviders({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
