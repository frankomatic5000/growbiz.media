'use client'

import { Copy, CheckCheck } from 'lucide-react'
import { useState } from 'react'

interface Props {
  score: number
  reason: string
  bestHook: string
}

export function HookAnalysis({ score, reason, bestHook }: Props) {
  const [copied, setCopied] = useState(false)

  const isHigh = score >= 75
  const isMed = score >= 50 && score < 75
  const color = isHigh ? 'text-clipiq-green' : isMed ? 'text-clipiq-warn' : 'text-clipiq-red'
  const barColor = isHigh ? 'bg-clipiq-green' : isMed ? 'bg-clipiq-warn' : 'bg-clipiq-red'
  const label = isHigh ? '🔥 High potential' : isMed ? '⚡ Medium potential' : '📉 Needs improvement'

  async function copy() {
    await navigator.clipboard.writeText(bestHook)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-clipiq-card border border-clipiq-border rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-syne font-bold text-clipiq-text text-sm">Hook Score</h3>
        <span className={`font-syne font-bold text-2xl ${color}`}>{score}/100</span>
      </div>

      {/* Score bar */}
      <div className="h-2 bg-clipiq-card2 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className={`text-sm font-syne font-semibold ${color}`}>{label}</p>
      {reason && <p className="text-clipiq-muted text-xs font-syne leading-relaxed">{reason}</p>}

      {bestHook && (
        <div className="bg-clipiq-card2 border border-clipiq-border2 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-clipiq-muted text-xs font-syne font-semibold uppercase tracking-wider">Best hook detected</p>
            <button
              onClick={copy}
              className="text-clipiq-muted hover:text-clipiq-text transition-colors"
            >
              {copied ? <CheckCheck size={13} className="text-clipiq-green" /> : <Copy size={13} />}
            </button>
          </div>
          <p className="text-clipiq-text text-sm font-syne leading-relaxed">{bestHook}</p>
        </div>
      )}
    </div>
  )
}
