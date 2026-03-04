'use client'

import { motion } from 'framer-motion'
import { Video, Mic2, Newspaper, type LucideProps } from 'lucide-react'
import { MosaicStrip } from '@/components/shared/MosaicStrip'
import { MISSION_PILLARS } from '@/lib/constants'

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  Video,
  Mic2,
  Newspaper,
}

export function MissionPillars() {
  return (
    <section className="bg-navy">
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
              How We Work
            </p>
            <h2 className="font-display font-black text-cream text-3xl md:text-4xl lg:text-5xl">
              Three Pillars,
              <br />
              One Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MISSION_PILLARS.map((pillar, i) => {
              const Icon = ICONS[pillar.icon] ?? Video
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  viewport={{ once: true }}
                  className="bg-navy-dark/50 border border-cream/10 rounded-sm p-8 hover:border-mustard/30 transition-colors"
                >
                  <div className="text-mustard mb-5">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-cream text-xl mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-cream/70 leading-relaxed text-sm">
                    {pillar.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <MosaicStrip height={90} />
    </section>
  )
}
