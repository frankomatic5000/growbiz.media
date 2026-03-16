'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

const LOCALES = ['en', 'pt-BR', 'es'] as const
type Locale = (typeof LOCALES)[number]

const LABELS: Record<Locale, string> = {
  en: 'EN',
  'pt-BR': 'PT',
  es: 'ES',
}

function getLocaleFromCookie(): Locale {
  if (typeof document === 'undefined') return 'en'
  const match = document.cookie.match(/clipiq-locale=([^;]+)/)
  return (match?.[1] as Locale) ?? 'en'
}

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const current: Locale = getLocaleFromCookie()

  const switchLocale = useCallback(
    (locale: Locale) => {
      document.cookie = `clipiq-locale=${locale};path=/;max-age=31536000`
      router.refresh()
    },
    [router]
  )

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`px-2 py-1 text-xs font-syne font-semibold rounded transition-colors ${
            current === locale
              ? 'text-clipiq-accent bg-clipiq-card2'
              : 'text-clipiq-muted hover:text-clipiq-text'
          }`}
        >
          {LABELS[locale]}
        </button>
      ))}
    </div>
  )
}
