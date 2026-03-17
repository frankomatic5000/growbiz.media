import type { Metadata } from 'next'
import { ClipIQSidebar } from '@/components/clipiq/ClipIQSidebar'
import { ClipIQProviders } from '@/components/clipiq/ClipIQProviders'

export const metadata: Metadata = {
  title: 'ClipIQ — Content Intelligence for Media Studios',
  description: 'Generate SEO-optimized captions, score hooks, and manage your publishing queue — powered by AI.',
}

export default function ClipIQLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClipIQProviders>
      <div className="min-h-screen bg-clipiq-bg text-clipiq-text">
        <ClipIQSidebar />
        <div className="md:ml-[220px] flex flex-col min-h-screen">
          {children}
        </div>
      </div>
    </ClipIQProviders>
  )
}
