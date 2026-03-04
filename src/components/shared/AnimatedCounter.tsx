'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix: string
  label: string
}

export function AnimatedCounter({ value, suffix, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), value)
      setCount(current)
      if (step >= steps) clearInterval(timer)
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl font-black text-navy leading-none">
        {count}
        <span className="text-mustard">{suffix}</span>
      </div>
      <div className="mt-3 font-body text-sm uppercase tracking-widest text-ink/60 font-semibold">
        {label}
      </div>
    </div>
  )
}
