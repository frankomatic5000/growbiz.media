'use client'

import { Pencil, Trash2 } from 'lucide-react'
import type { BrandProfile } from '@/types/clipiq'

interface Props {
  brand: BrandProfile
  active?: boolean
  onEdit: (brand: BrandProfile) => void
  onDelete: (id: string) => void
}

export function BrandProfileCard({ brand, active, onEdit, onDelete }: Props) {
  return (
    <div
      className={`bg-clipiq-card border rounded-xl p-5 transition-colors ${
        active ? 'border-clipiq-accent shadow-[0_0_16px_rgba(108,99,255,0.2)]' : 'border-clipiq-border'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{brand.emoji}</span>
          <div>
            <p className="font-syne font-bold text-clipiq-text text-sm">{brand.name}</p>
            <p className="text-clipiq-muted text-xs font-syne">@{brand.handle}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(brand)}
            className="p-1.5 rounded-lg text-clipiq-muted hover:text-clipiq-text hover:bg-clipiq-card2 transition-colors"
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={() => onDelete(brand.id)}
            className="p-1.5 rounded-lg text-clipiq-muted hover:text-clipiq-red hover:bg-clipiq-red/10 transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-[10px] font-syne text-clipiq-muted">
          <span className="text-clipiq-border2">Audience</span> · {brand.audience}
        </p>
        <p className="text-[10px] font-syne text-clipiq-muted">
          <span className="text-clipiq-border2">Voice</span> · {brand.voice}
        </p>
        <p className="text-[10px] font-syne text-clipiq-muted">
          <span className="text-clipiq-border2">Niche</span> · {brand.niche}
        </p>
        <p className="text-[10px] font-syne text-clipiq-muted">
          <span className="text-clipiq-border2">Language</span> · {brand.language}
        </p>
      </div>
    </div>
  )
}
