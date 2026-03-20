import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, DM_Sans, Syne } from 'next/font/google'
import './globals.css'

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

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'GrowBiz Media — A Global Media of Virtues',
  description: 'A multicultural media holding empowering entrepreneurs, founders, and leaders through strategic production, events, and publishing.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: '16x16 32x32 48x48' },
      { url: '/favicon-32x32.png?v=2', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png?v=2', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg?v=2', color: '#0a0a0a' },
    ],
  },
  manifest: '/site.webmanifest',
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
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable} ${syne.variable}`}>
      <body className="antialiased font-body bg-cream text-ink">
        {children}
      </body>
    </html>
  )
}
