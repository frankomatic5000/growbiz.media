'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowRight, Loader2, CheckCircle2, XCircle, FolderOpen, Sparkles, HardDrive, Link2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { BrandProfile, VideoItem } from '@/types/clipiq'

type Phase =
  | { name: 'idle' }
  | { name: 'scanning' }
  | { name: 'found'; folderName: string; videos: VideoItem[]; projectId: string }
  | { name: 'processing'; folderName: string; videos: VideoItem[]; projectId: string; current: number }
  | { name: 'done'; projectId: string }
  | { name: 'error'; message: string }

interface Props {
  brands: BrandProfile[]
  googleAccessToken?: string
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gapi: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any
  }
}

export function FolderPipeline({ brands, googleAccessToken }: Props) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>({ name: 'idle' })
  const [input, setInput] = useState('')
  const [selectedBrand, setSelectedBrand] = useState(brands[0]?.id ?? '')
  const [inputMode, setInputMode] = useState<'link' | 'picker'>('picker')
  const [pickerReady, setPickerReady] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load Google Picker API
  useEffect(() => {
    if (!googleAccessToken) return
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    if (!apiKey) return

    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = () => {
      window.gapi.load('picker', () => setPickerReady(true))
    }
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [googleAccessToken])

  const openPicker = useCallback(() => {
    if (!pickerReady || !googleAccessToken) return
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!

    const docsView = new window.google.picker.DocsView(window.google.picker.ViewId.FOLDERS)
      .setSelectFolderEnabled(true)
      .setMimeTypes('application/vnd.google-apps.folder')

    const picker = new window.google.picker.PickerBuilder()
      .addView(docsView)
      .setOAuthToken(googleAccessToken)
      .setDeveloperKey(apiKey)
      .setTitle('Select a folder with your edited videos')
      .setCallback((data: { action: string; docs?: { id: string; name: string }[] }) => {
        if (data.action === window.google.picker.Action.PICKED && data.docs?.[0]) {
          const folder = data.docs[0]
          scanFolder(`https://drive.google.com/drive/folders/${folder.id}`)
        }
      })
      .build()

    picker.setVisible(true)
  }, [pickerReady, googleAccessToken])

  async function scanFolder(folderUrl: string) {
    setPhase({ name: 'scanning' })
    try {
      const res = await fetch('/api/clipiq/process-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderUrl }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to scan folder')
      const { projectId, folderName, videos } = data as { projectId: string; folderName: string; videos: VideoItem[] }
      setPhase({ name: 'found', projectId, folderName, videos })
    } catch (err) {
      setPhase({ name: 'error', message: err instanceof Error ? err.message : 'Something went wrong' })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    await scanFolder(input.trim())
  }

  async function startProcessing() {
    if (phase.name !== 'found') return
    const { projectId, folderName, videos } = phase

    const updatedVideos: VideoItem[] = videos.map((v) => ({ ...v, status: 'pending' as const }))
    setPhase({ name: 'processing', projectId, folderName, videos: updatedVideos, current: 0 })

    for (let i = 0; i < updatedVideos.length; i++) {
      setPhase((p) =>
        p.name === 'processing'
          ? { ...p, current: i, videos: p.videos.map((v, idx) => idx === i ? { ...v, status: 'transcribing' } : v) }
          : p
      )

      const res = await fetch('/api/clipiq/process-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, videoItemId: updatedVideos[i].id, brandId: selectedBrand }),
      })
      const data = await res.json()

      setPhase((p) =>
        p.name === 'processing'
          ? {
              ...p,
              videos: p.videos.map((v, idx) =>
                idx === i
                  ? { ...v, status: res.ok ? 'ready' : 'error', error: data.error }
                  : v
              ),
            }
          : p
      )
    }

    setPhase({ name: 'done', projectId })
  }

  const noAccessToken = !googleAccessToken
  const canUsePicker = pickerReady && !!googleAccessToken && !!process.env.NEXT_PUBLIC_GOOGLE_API_KEY

  return (
    <div className="w-full max-w-lg space-y-8">
      {/* Logo */}
      <div className="text-center">
        <p className="font-syne font-bold text-3xl text-clipiq-text">
          Clip<span className="text-clipiq-accent">IQ</span>
        </p>
        <p className="text-clipiq-muted text-sm font-syne mt-1">Content Intelligence for Media Studios</p>
      </div>

      {/* Phase: idle */}
      {phase.name === 'idle' && (
        <div className="space-y-5">
          <p className="text-clipiq-text font-syne text-lg text-center leading-snug">
            Select your edited videos folder
          </p>

          {noAccessToken && (
            <div className="flex items-start gap-3 bg-clipiq-warn/10 border border-clipiq-warn/30 rounded-xl px-4 py-3">
              <p className="text-clipiq-warn text-xs font-syne">
                Sign out and sign back in with Google to enable Drive access.
              </p>
            </div>
          )}

          {brands.length > 1 && (
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-clipiq-card border border-clipiq-border text-clipiq-text text-sm font-syne focus:outline-none focus:border-clipiq-accent"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.emoji} {b.name}</option>
              ))}
            </select>
          )}

          {/* Primary CTA: Browse Drive */}
          <button
            onClick={openPicker}
            disabled={!canUsePicker}
            className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-clipiq-accent text-white font-syne font-bold text-base hover:bg-clipiq-accent2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HardDrive size={20} />
            Browse Google Drive
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-clipiq-border" />
            <p className="text-clipiq-muted text-xs font-syne">or paste a folder link</p>
            <div className="flex-1 h-px bg-clipiq-border" />
          </div>

          {/* Secondary: paste link */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-clipiq-card border border-clipiq-border focus-within:border-clipiq-accent transition-colors">
              <Link2 size={14} className="text-clipiq-muted shrink-0" />
              <input
                ref={inputRef}
                type="url"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/..."
                className="flex-1 bg-transparent text-clipiq-text placeholder:text-clipiq-muted text-sm font-syne focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-clipiq-accent text-white text-xs font-syne font-semibold hover:bg-clipiq-accent2 transition-colors disabled:opacity-40"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </form>

          {brands.length === 0 && (
            <p className="text-clipiq-muted text-xs font-syne text-center">
              <a href="/clipiq/brands" className="text-clipiq-accent hover:underline">Set up a brand profile</a>{' '}
              first for better captions
            </p>
          )}
        </div>
      )}

      {/* Phase: scanning */}
      {phase.name === 'scanning' && (
        <div className="text-center space-y-3">
          <Loader2 size={28} className="animate-spin text-clipiq-accent mx-auto" />
          <p className="text-clipiq-text font-syne text-sm">Scanning folder...</p>
        </div>
      )}

      {/* Phase: found */}
      {phase.name === 'found' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-clipiq-card border border-clipiq-border rounded-xl px-4 py-3">
            <FolderOpen size={16} className="text-clipiq-accent shrink-0" />
            <div>
              <p className="font-syne font-semibold text-clipiq-text text-sm">{phase.folderName}</p>
              <p className="text-clipiq-muted text-xs font-syne">{phase.videos.length} video{phase.videos.length !== 1 ? 's' : ''} found</p>
            </div>
          </div>

          <ul className="space-y-1.5 max-h-48 overflow-y-auto">
            {phase.videos.map((v) => (
              <li key={v.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-clipiq-card border border-clipiq-border">
                <div className="w-1.5 h-1.5 rounded-full bg-clipiq-muted shrink-0" />
                <p className="text-clipiq-text text-xs font-syne truncate">{v.fileName}</p>
              </li>
            ))}
          </ul>

          <div className="flex gap-2">
            <button
              onClick={() => setPhase({ name: 'idle' })}
              className="px-4 py-3 rounded-xl border border-clipiq-border text-clipiq-muted font-syne text-sm hover:text-clipiq-text transition-colors"
            >
              Back
            </button>
            <button
              onClick={startProcessing}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-clipiq-accent text-white font-syne font-bold text-sm hover:bg-clipiq-accent2 transition-colors"
            >
              <Sparkles size={15} />
              Generate captions for all {phase.videos.length} video{phase.videos.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}

      {/* Phase: processing */}
      {phase.name === 'processing' && (
        <div className="space-y-3">
          <p className="text-clipiq-text font-syne text-sm text-center mb-4">
            Processing {phase.current + 1} of {phase.videos.length}...
          </p>
          <ul className="space-y-2 max-h-72 overflow-y-auto">
            {phase.videos.map((v, idx) => (
              <li
                key={v.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                  idx === phase.current
                    ? 'border-clipiq-accent bg-clipiq-card2'
                    : 'border-clipiq-border bg-clipiq-card'
                }`}
              >
                <span className="shrink-0">
                  {v.status === 'ready' ? (
                    <CheckCircle2 size={15} className="text-clipiq-green" />
                  ) : v.status === 'error' ? (
                    <XCircle size={15} className="text-clipiq-red" />
                  ) : idx === phase.current ? (
                    <Loader2 size={15} className="animate-spin text-clipiq-accent" />
                  ) : (
                    <div className="w-[15px] h-[15px] rounded-full border border-clipiq-border" />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-clipiq-text text-xs font-syne truncate">{v.fileName}</p>
                  {idx === phase.current && v.status === 'transcribing' && (
                    <p className="text-clipiq-muted text-[10px] font-syne">Transcribing audio...</p>
                  )}
                  {idx === phase.current && v.status === 'generating' && (
                    <p className="text-clipiq-accent text-[10px] font-syne">Generating captions...</p>
                  )}
                  {v.status === 'error' && (
                    <p className="text-clipiq-red text-[10px] font-syne truncate">{v.error}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Phase: done */}
      {phase.name === 'done' && (
        <div className="text-center space-y-4">
          <CheckCircle2 size={36} className="text-clipiq-green mx-auto" />
          <p className="text-clipiq-text font-syne font-bold text-lg">All done!</p>
          <p className="text-clipiq-muted text-sm font-syne">Captions generated for all videos.</p>
          <button
            onClick={() => router.push(`/clipiq/review/${phase.projectId}`)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-clipiq-accent text-white font-syne font-bold text-sm hover:bg-clipiq-accent2 transition-colors"
          >
            Review & Schedule <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Phase: error */}
      {phase.name === 'error' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-clipiq-red/10 border border-clipiq-red/30 rounded-xl px-4 py-3">
            <XCircle size={16} className="text-clipiq-red shrink-0 mt-0.5" />
            <p className="text-clipiq-text text-sm font-syne">{phase.message}</p>
          </div>
          <button
            onClick={() => setPhase({ name: 'idle' })}
            className="w-full py-3 rounded-xl border border-clipiq-border text-clipiq-muted font-syne text-sm hover:text-clipiq-text transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  )
}
