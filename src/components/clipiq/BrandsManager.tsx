'use client'

import { useState } from 'react'
import { Plus, X, Layers } from 'lucide-react'
import type { BrandProfile } from '@/types/clipiq'
import { BrandProfileCard } from './BrandProfileCard'

const EMPTY_FORM: Omit<BrandProfile, 'id' | 'createdAt'> = {
  name: '',
  emoji: '🏷️',
  handle: '',
  audience: '',
  voice: '',
  niche: '',
  language: 'en',
}

interface Props {
  initialBrands: BrandProfile[]
  userId: string
}

export function BrandsManager({ initialBrands }: Props) {
  const [brands, setBrands] = useState(initialBrands)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<BrandProfile | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)

  function openNew() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  function openEdit(brand: BrandProfile) {
    setEditing(brand)
    setForm({ name: brand.name, emoji: brand.emoji, handle: brand.handle, audience: brand.audience, voice: brand.voice, niche: brand.niche, language: brand.language })
    setShowForm(true)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (editing) {
      const res = await fetch(`/api/clipiq/brands/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const updated: BrandProfile = await res.json()
      setBrands((prev) => prev.map((b) => b.id === updated.id ? updated : b))
    } else {
      const res = await fetch('/api/clipiq/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const created: BrandProfile = await res.json()
      setBrands((prev) => [...prev, created])
    }
    setShowForm(false)
  }

  async function remove(id: string) {
    await fetch(`/api/clipiq/brands/${id}`, { method: 'DELETE' })
    setBrands((prev) => prev.filter((b) => b.id !== id))
  }

  const fields: { key: keyof typeof EMPTY_FORM; label: string; placeholder: string; type?: string }[] = [
    { key: 'emoji', label: 'Emoji', placeholder: '🏷️' },
    { key: 'name', label: 'Brand name', placeholder: 'e.g. GrowBiz Talks' },
    { key: 'handle', label: 'Social handle', placeholder: '@growbiztalks' },
    { key: 'audience', label: 'Target audience', placeholder: 'e.g. immigrant entrepreneurs 25-45' },
    { key: 'voice', label: 'Brand voice / tone', placeholder: 'e.g. bold, inspiring, multicultural' },
    { key: 'niche', label: 'Content niche', placeholder: 'e.g. entrepreneurship, leadership' },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="text-clipiq-muted text-xs font-syne">{brands.length} brand{brands.length !== 1 ? 's' : ''} configured</p>
        <button
          onClick={openNew}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-clipiq-accent text-white text-xs font-syne font-semibold hover:bg-clipiq-accent2 transition-colors"
        >
          <Plus size={12} /> New brand
        </button>
      </div>

      {brands.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Layers size={28} className="text-clipiq-muted mb-3 opacity-40" />
          <p className="text-clipiq-muted text-sm font-syne">No brands yet</p>
          <p className="text-clipiq-muted text-xs font-syne mt-1">Add your first brand profile to get started.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {brands.map((b) => (
          <BrandProfileCard key={b.id} brand={b} onEdit={openEdit} onDelete={remove} />
        ))}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-clipiq-card border border-clipiq-border rounded-xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-syne font-bold text-clipiq-text text-sm">{editing ? 'Edit brand' : 'New brand profile'}</h2>
              <button onClick={() => setShowForm(false)} className="text-clipiq-muted hover:text-clipiq-text">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={save} className="space-y-3">
              {fields.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-clipiq-muted text-[10px] font-syne mb-1">{label}</label>
                  <input
                    type="text"
                    value={form[key] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-lg bg-clipiq-card2 border border-clipiq-border text-clipiq-text placeholder:text-clipiq-muted text-sm font-syne focus:outline-none focus:border-clipiq-accent"
                  />
                </div>
              ))}
              <div>
                <label className="block text-clipiq-muted text-[10px] font-syne mb-1">Primary language</label>
                <select
                  value={form.language}
                  onChange={(e) => setForm((f) => ({ ...f, language: e.target.value as BrandProfile['language'] }))}
                  className="w-full px-3 py-2 rounded-lg bg-clipiq-card2 border border-clipiq-border text-clipiq-text text-sm font-syne focus:outline-none focus:border-clipiq-accent"
                >
                  <option value="en">English</option>
                  <option value="pt-BR">Portuguese (Brazil)</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-lg border border-clipiq-border text-clipiq-muted text-sm font-syne hover:text-clipiq-text transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2 rounded-lg bg-clipiq-accent text-white text-sm font-syne font-semibold hover:bg-clipiq-accent2 transition-colors">
                  {editing ? 'Save changes' : 'Create brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
