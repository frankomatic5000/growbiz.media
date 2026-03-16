'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, ExternalLink, Loader2 } from 'lucide-react'
import type { PlatformKey } from '@/types/clipiq'

const PLATFORMS: {
  key: PlatformKey | 'meta'
  label: string
  icon: string
  color: string
  description: string
  oauthKey: string
}[] = [
  {
    key: 'meta',
    label: 'Instagram & Facebook',
    icon: '📸',
    color: 'border-pink-400/40 bg-pink-400/5 hover:bg-pink-400/10',
    description: 'Connect your Meta account to publish Reels and Page videos',
    oauthKey: 'meta',
  },
  {
    key: 'x',
    label: 'X (Twitter)',
    icon: '✕',
    color: 'border-gray-400/40 bg-gray-400/5 hover:bg-gray-400/10',
    description: 'Post videos and threads directly to your X account',
    oauthKey: 'x',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    icon: '♪',
    color: 'border-cyan-400/40 bg-cyan-400/5 hover:bg-cyan-400/10',
    description: 'Upload and publish short-form videos to TikTok',
    oauthKey: 'tiktok',
  },
]

interface Props {
  connectedPlatforms: PlatformKey[]
  successMessage?: string
  errorMessage?: string
}

export function ConnectPlatforms({ connectedPlatforms, successMessage, errorMessage }: Props) {
  const [disconnecting, setDisconnecting] = useState<string | null>(null)
  const [localConnected, setLocalConnected] = useState<PlatformKey[]>(connectedPlatforms)

  async function disconnect(platform: PlatformKey) {
    setDisconnecting(platform)
    const res = await fetch(`/api/clipiq/connect/disconnect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform }),
    })
    if (res.ok) {
      setLocalConnected((p) => p.filter((x) => x !== platform))
    }
    setDisconnecting(null)
  }

  const isConnected = (key: string) => {
    if (key === 'meta') return localConnected.includes('instagram') || localConnected.includes('facebook')
    return localConnected.includes(key as PlatformKey)
  }

  return (
    <div className="space-y-4">
      {successMessage && (
        <div className="flex items-center gap-3 bg-clipiq-green/10 border border-clipiq-green/30 rounded-xl px-4 py-3">
          <CheckCircle2 size={15} className="text-clipiq-green shrink-0" />
          <p className="text-clipiq-green text-sm font-syne">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="flex items-center gap-3 bg-clipiq-red/10 border border-clipiq-red/30 rounded-xl px-4 py-3">
          <XCircle size={15} className="text-clipiq-red shrink-0" />
          <p className="text-clipiq-red text-sm font-syne">{errorMessage}</p>
        </div>
      )}

      {PLATFORMS.map(({ key, label, icon, color, description, oauthKey }) => {
        const connected = isConnected(key)
        const connectedKeys = key === 'meta'
          ? (['instagram', 'facebook'] as PlatformKey[]).filter((p) => localConnected.includes(p))
          : []

        return (
          <div
            key={key}
            className={`border rounded-xl px-5 py-4 transition-colors ${color}`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">{icon}</span>
                <div className="min-w-0">
                  <p className="font-syne font-semibold text-clipiq-text text-sm">{label}</p>
                  <p className="text-clipiq-muted text-xs font-syne mt-0.5">{description}</p>
                  {key === 'meta' && connectedKeys.length > 0 && (
                    <p className="text-clipiq-green text-[10px] font-syne mt-1">
                      Connected: {connectedKeys.join(', ')}
                    </p>
                  )}
                </div>
              </div>

              <div className="shrink-0">
                {connected ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-clipiq-green" />
                    <button
                      onClick={() => disconnect(
                        key === 'meta'
                          ? (connectedKeys[0] ?? 'instagram')
                          : (key as PlatformKey)
                      )}
                      disabled={disconnecting === key}
                      className="text-[10px] font-syne text-clipiq-muted hover:text-clipiq-red transition-colors"
                    >
                      {disconnecting === key ? (
                        <Loader2 size={10} className="animate-spin" />
                      ) : 'Disconnect'}
                    </button>
                  </div>
                ) : (
                  <a
                    href={`/api/clipiq/connect/${oauthKey}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-clipiq-accent text-white text-xs font-syne font-semibold hover:bg-clipiq-accent2 transition-colors"
                  >
                    Connect <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )
      })}

      <p className="text-clipiq-muted text-xs font-syne text-center pt-2">
        Your access tokens are stored securely and never shared.
      </p>
    </div>
  )
}
