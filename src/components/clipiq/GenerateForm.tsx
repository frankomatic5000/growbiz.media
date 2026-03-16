'use client'

import { useState } from 'react'
import { Loader2, Zap } from 'lucide-react'
import type { BrandProfile, GenerateResult, PlatformKey, ContentTone, CtaType, ContentType } from '@/types/clipiq'
import { HookAnalysis } from './HookAnalysis'
import { PlatformResults } from './PlatformResults'

const PLATFORMS: { key: PlatformKey; label: string; color: string }[] = [
  { key: 'instagram', label: 'Instagram', color: 'text-pink-500 border-pink-500/40' },
  { key: 'youtube', label: 'YouTube', color: 'text-red-500 border-red-500/40' },
  { key: 'tiktok', label: 'TikTok', color: 'text-cyan-400 border-cyan-400/40' },
  { key: 'x', label: 'X / Twitter', color: 'text-gray-400 border-gray-400/40' },
  { key: 'linkedin', label: 'LinkedIn', color: 'text-blue-500 border-blue-500/40' },
]

const TONES: { value: ContentTone; label: string }[] = [
  { value: 'inspirational', label: 'Inspirational' },
  { value: 'educational', label: 'Educational' },
  { value: 'controversial', label: 'Controversial' },
  { value: 'emotional', label: 'Emotional' },
  { value: 'entertaining', label: 'Entertaining' },
]

const CTAS: { value: CtaType; label: string }[] = [
  { value: 'watch', label: 'Watch the full episode' },
  { value: 'follow', label: 'Follow for more' },
  { value: 'save', label: 'Save this post' },
  { value: 'comment', label: 'Comment below' },
  { value: 'share', label: 'Share with someone' },
]

const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: 'interview', label: 'Interview' },
  { value: 'clip', label: 'Clip / highlight' },
  { value: 'tip', label: 'Tip / how-to' },
  { value: 'story', label: 'Story' },
  { value: 'educational', label: 'Educational' },
]

interface Props {
  brands: BrandProfile[]
}

export function GenerateForm({ brands }: Props) {
  const [title, setTitle] = useState('')
  const [guest, setGuest] = useState('')
  const [location, setLocation] = useState('')
  const [contentType, setContentType] = useState<ContentType>('interview')
  const [transcript, setTranscript] = useState('')
  const [keywords, setKeywords] = useState('')
  const [tone, setTone] = useState<ContentTone>('inspirational')
  const [cta, setCta] = useState<CtaType>('watch')
  const [platforms, setPlatforms] = useState<PlatformKey[]>(['instagram'])
  const [brandId, setBrandId] = useState(brands[0]?.id ?? '')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerateResult | null>(null)
  const [error, setError] = useState('')

  function togglePlatform(key: PlatformKey) {
    setPlatforms((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !transcript || platforms.length === 0) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/clipiq/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, guest, location, epType: contentType, tone, cta, platforms, transcript, keywords, brandId }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Generation failed')
      setResult(await res.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Brand selector */}
        {brands.length > 0 && (
          <div>
            <label className="block text-clipiq-muted text-xs font-syne mb-1.5">Brand profile</label>
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-clipiq-card border border-clipiq-border text-clipiq-text text-sm font-syne focus:outline-none focus:border-clipiq-accent"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.emoji} {b.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-clipiq-muted text-xs font-syne mb-1.5">Episode / video title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. How I built a $10M business from zero"
            className="w-full px-3 py-2.5 rounded-lg bg-clipiq-card border border-clipiq-border text-clipiq-text placeholder:text-clipiq-muted text-sm font-syne focus:outline-none focus:border-clipiq-accent"
          />
        </div>

        {/* Guest + Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-clipiq-muted text-xs font-syne mb-1.5">Guest name (optional)</label>
            <input
              type="text"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              placeholder="e.g. Maria Santos"
              className="w-full px-3 py-2.5 rounded-lg bg-clipiq-card border border-clipiq-border text-clipiq-text placeholder:text-clipiq-muted text-sm font-syne focus:outline-none focus:border-clipiq-accent"
            />
          </div>
          <div>
            <label className="block text-clipiq-muted text-xs font-syne mb-1.5">Guest location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. São Paulo, Brazil"
              className="w-full px-3 py-2.5 rounded-lg bg-clipiq-card border border-clipiq-border text-clipiq-text placeholder:text-clipiq-muted text-sm font-syne focus:outline-none focus:border-clipiq-accent"
            />
          </div>
        </div>

        {/* Content type + Tone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-clipiq-muted text-xs font-syne mb-1.5">Content type</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value as ContentType)}
              className="w-full px-3 py-2.5 rounded-lg bg-clipiq-card border border-clipiq-border text-clipiq-text text-sm font-syne focus:outline-none focus:border-clipiq-accent"
            >
              {CONTENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-clipiq-muted text-xs font-syne mb-1.5">Content tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ContentTone)}
              className="w-full px-3 py-2.5 rounded-lg bg-clipiq-card border border-clipiq-border text-clipiq-text text-sm font-syne focus:outline-none focus:border-clipiq-accent"
            >
              {TONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </div>

        {/* CTA */}
        <div>
          <label className="block text-clipiq-muted text-xs font-syne mb-1.5">Primary CTA</label>
          <select
            value={cta}
            onChange={(e) => setCta(e.target.value as CtaType)}
            className="w-full px-3 py-2.5 rounded-lg bg-clipiq-card border border-clipiq-border text-clipiq-text text-sm font-syne focus:outline-none focus:border-clipiq-accent"
          >
            {CTAS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        {/* Transcript */}
        <div>
          <label className="block text-clipiq-muted text-xs font-syne mb-1.5">Transcript / key quotes *</label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            required
            rows={6}
            placeholder="Paste the full transcript, auto-generated captions, or key quotes and moments from this episode..."
            className="w-full px-3 py-2.5 rounded-lg bg-clipiq-card border border-clipiq-border text-clipiq-text placeholder:text-clipiq-muted text-sm font-syne focus:outline-none focus:border-clipiq-accent resize-y"
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-clipiq-muted text-xs font-syne mb-1.5">Extra keywords (optional)</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. immigrant entrepreneur, mindset, resilience"
            className="w-full px-3 py-2.5 rounded-lg bg-clipiq-card border border-clipiq-border text-clipiq-text placeholder:text-clipiq-muted text-sm font-syne focus:outline-none focus:border-clipiq-accent"
          />
        </div>

        {/* Platforms */}
        <div>
          <label className="block text-clipiq-muted text-xs font-syne mb-2">Target platforms *</label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map(({ key, label, color }) => (
              <button
                key={key}
                type="button"
                onClick={() => togglePlatform(key)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-syne font-semibold transition-colors ${
                  platforms.includes(key)
                    ? `${color} bg-clipiq-card2`
                    : 'text-clipiq-muted border-clipiq-border hover:border-clipiq-border2'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-clipiq-red text-sm font-syne">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !title || !transcript || platforms.length === 0}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-clipiq-accent text-white font-syne font-bold text-sm hover:bg-clipiq-accent2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Zap size={15} />}
          {loading ? 'Generating...' : 'Generate All Captions'}
        </button>
      </form>

      {/* Results */}
      {result && (
        <div className="space-y-6 border-t border-clipiq-border pt-8">
          <HookAnalysis
            score={result.hookScore}
            reason={result.hookScoreReason}
            bestHook={result.bestHook}
          />
          <PlatformResults
            result={result}
            platforms={platforms}
            title={title}
            guest={guest}
            brandId={brandId}
            brandName={brands.find((b) => b.id === brandId)?.name ?? 'Unknown'}
          />
        </div>
      )}
    </div>
  )
}
