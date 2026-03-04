import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-playfair',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'GrowBiz Media — A Global Media of Virtues',
  description: 'A multicultural media holding empowering entrepreneurs, founders, and leaders through strategic production, events, and publishing.',
  openGraph: {
    title: 'GrowBiz Media',
    description: 'A Global Media of Virtues',
    url: 'https://growbiz.media',
    siteName: 'GrowBiz Media',
    images: [{ url: '/assets/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrowBiz Media',
    description: 'A Global Media of Virtues',
    images: ['/assets/og-image.png'],
  },
  alternates: {
    canonical: 'https://growbiz.media',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased font-body bg-cream text-ink">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
