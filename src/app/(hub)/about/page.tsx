'use client'

import { motion } from 'framer-motion'
import { MosaicStrip } from '@/components/shared/MosaicStrip'
import { CORE_VALUES } from '@/lib/constants'
import {
  Heart,
  Star,
  Users,
  TrendingUp,
  Globe,
  Zap,
  type LucideProps,
} from 'lucide-react'

const VALUE_ICONS: Record<string, React.ComponentType<LucideProps>> = {
  Heart,
  Star,
  Users,
  TrendingUp,
  Globe,
  Zap,
}

const TIMELINE = [
  { year: '2015', event: 'GrowBiz Media founded in New Jersey' },
  { year: '2017', event: 'GrowBiz Studios launched — first media production service' },
  { year: '2019', event: 'GrowBiz Talks holds its first speaking events' },
  { year: '2021', event: 'GrowBiz Magazine goes digital — first editorial issue' },
  { year: '2022', event: 'Imigrou launched to serve immigrant entrepreneurs' },
  { year: '2024', event: 'Portfolio expands to 8 brands under one holding' },
]

export default function AboutPage() {
  return (
    <main className="bg-cream">
      {/* Hero strip */}
      <div className="bg-navy pt-20">
        <MosaicStrip height={90} />
        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
              Who We Are
            </p>
            <h1 className="font-display font-black text-cream text-4xl md:text-5xl lg:text-6xl leading-tight">
              Our Story
            </h1>
          </div>
        </div>
        <MosaicStrip height={60} />
      </div>

      {/* Mission & Vision */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
              Our Mission
            </p>
            <blockquote className="font-editorial text-2xl md:text-3xl text-navy font-semibold leading-snug border-l-4 border-mustard pl-6">
              "To empower multicultural entrepreneurs, founders, and leaders with the media tools, visibility, and community they deserve."
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
              Our Vision
            </p>
            <blockquote className="font-editorial text-2xl md:text-3xl text-navy font-semibold leading-snug border-l-4 border-gold pl-6">
              "A world where every multicultural business leader has a stage, a story, and a media ecosystem built for their success."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-navy py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
              What We Stand For
            </p>
            <h2 className="font-display font-black text-cream text-3xl md:text-4xl">
              Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((value, i) => {
              const Icon = VALUE_ICONS[value.icon] ?? Star
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-navy-dark/40 border border-cream/10 rounded-sm p-8 hover:border-mustard/30 transition-colors"
                >
                  <Icon size={28} className="text-mustard mb-4" strokeWidth={1.5} />
                  <h3 className="font-display font-bold text-cream text-lg mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-cream/70 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
              Our Journey
            </p>
            <h2 className="font-display font-black text-navy text-3xl md:text-4xl">
              How We Got Here
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-navy/20 md:-translate-x-px" />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`relative flex gap-8 md:items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} pl-16 md:pl-0`}
                >
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-mustard rotate-45 mt-1 md:mt-0" />
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <span className="font-display font-black text-mustard text-2xl">{item.year}</span>
                    <p className="font-body text-ink/70 text-sm mt-1 leading-relaxed">{item.event}</p>
                  </div>
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="bg-cream border-t border-navy/5 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
            Leadership
          </p>
          <h2 className="font-display font-black text-navy text-3xl md:text-4xl mb-6">
            Meet the Team
          </h2>
          <p className="font-body text-ink/60 text-lg leading-relaxed">
            Our leadership team will be featured here soon. In the meantime, connect with us directly.
          </p>
        </div>
      </section>
    </main>
  )
}
