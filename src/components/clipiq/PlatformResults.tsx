'use client'

import { useState } from 'react'
import { Copy, CheckCheck, PlusCircle } from 'lucide-react'
import type { GenerateResult, PlatformKey } from '@/types/clipiq'

const PLATFORM_LABELS: Record<PlatformKey, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  x: 'X / Twitter',
  linkedin: 'LinkedIn',
}

interface Props {
  result: GenerateResult
  platforms: PlatformKey[]
  title: string
  guest?: string
  brandId: string
  brandName: string
}

export function PlatformResults({ result, platforms, title, guest, brandId, brandName }: Props) {
  const [active, setActive] = useState<PlatformKey>(platforms[0])
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [addedPlatforms, setAddedPlatforms] = useState<Set<PlatformKey>>(new Set())

  const caption = result[active]

  async function copy(text: string, field: string) {
    await navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  async function addToQueue(platform: PlatformKey) {
    const pc = result[platform]
    if (!pc) return
    await fetch('/api/clipiq/queue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        guest,
        platform,
        brandId,
        brandName,
        hook: pc.hook,
        caption: pc.caption,
        hashtags: pc.hashtags,
        hookScore: result.hookScore,
        status: 'draft',
      }),
    })
    setAddedPlatforms((prev) => new Set([...prev, platform]))
  }

  if (!caption) return null

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex gap-1 bg-clipiq-card border border-clipiq-border rounded-xl p-1 w-fit flex-wrap">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => setActive(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-syne font-semibold transition-colors ${
              active === p
                ? 'bg-clipiq-card2 text-clipiq-text'
                : 'text-clipiq-muted hover:text-clipiq-text'
            }`}
          >
            {PLATFORM_LABELS[p]}
          </button>
        ))}
      </div>

      {/* Caption card */}
      <div className="bg-clipiq-card border border-clipiq-border rounded-xl p-5 space-y-4">
        {/* Hook */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-clipiq-muted text-[10px] font-syne font-semibold uppercase tracking-widest">Hook</p>
            <button onClick={() => copy(caption.hook, 'hook')} className="text-clipiq-muted hover:text-clipiq-text">
              {copiedField === 'hook' ? <CheckCheck size={12} className="text-clipiq-green" /> : <Copy size={12} />}
            </button>
          </div>
          <p className="text-clipiq-text text-sm font-syne font-semibold leading-snug">{caption.hook}</p>
        </div>

        {/* Caption */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-clipiq-muted text-[10px] font-syne font-semibold uppercase tracking-widest">Caption</p>
            <button onClick={() => copy(caption.caption, 'caption')} className="text-clipiq-muted hover:text-clipiq-text">
              {copiedField === 'caption' ? <CheckCheck size={12} className="text-clipiq-green" /> : <Copy size={12} />}
            </button>
          </div>
          <p className="text-clipiq-text text-sm font-syne leading-relaxed whitespace-pre-line">{caption.caption}</p>
        </div>

        {/* Hashtags */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-clipiq-muted text-[10px] font-syne font-semibold uppercase tracking-widest">Hashtags</p>
            <button onClick={() => copy(caption.hashtags, 'hashtags')} className="text-clipiq-muted hover:text-clipiq-text">
              {copiedField === 'hashtags' ? <CheckCheck size={12} className="text-clipiq-green" /> : <Copy size={12} />}
            </button>
          </div>
          <p className="text-clipiq-accent text-xs font-syne">{caption.hashtags}</p>
        </div>

        {/* Metadata chips */}
        <div className="flex gap-2 flex-wrap">
          {caption.bestTime && (
            <span className="text-[10px] font-syne px-2 py-0.5 rounded-full bg-clipiq-card2 border border-clipiq-border text-clipiq-muted">
              ⏰ {caption.bestTime}
            </span>
          )}
          {caption.formatTip && (
            <span className="text-[10px] font-syne px-2 py-0.5 rounded-full bg-clipiq-card2 border border-clipiq-border text-clipiq-muted">
              💡 {caption.formatTip}
            </span>
          )}
        </div>

        {/* Alt hooks */}
        {caption.altHooks?.length > 0 && (
          <div>
            <p className="text-clipiq-muted text-[10px] font-syne font-semibold uppercase tracking-widest mb-2">Alternative hooks</p>
            <ul className="space-y-1">
              {caption.altHooks.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-syne text-clipiq-muted">
                  <span className="text-clipiq-border2 mt-0.5">—</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-clipiq-border">
          <button
            onClick={() => copy(`${caption.hook}\n\n${caption.caption}\n\n${caption.hashtags}`, 'full')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-clipiq-border text-xs font-syne text-clipiq-muted hover:text-clipiq-text hover:border-clipiq-border2 transition-colors"
          >
            {copiedField === 'full' ? <CheckCheck size={12} className="text-clipiq-green" /> : <Copy size={12} />}
            Copy full post
          </button>
          <button
            onClick={() => addToQueue(active)}
            disabled={addedPlatforms.has(active)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-syne transition-colors ${
              addedPlatforms.has(active)
                ? 'border border-clipiq-green/30 text-clipiq-green bg-clipiq-green/10'
                : 'border border-clipiq-accent/40 text-clipiq-accent hover:bg-clipiq-accent hover:text-white'
            }`}
          >
            <PlusCircle size={12} />
            {addedPlatforms.has(active) ? 'Added to queue' : 'Add to queue'}
          </button>
        </div>
      </div>
    </div>
  )
}
