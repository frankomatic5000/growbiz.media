'use client'

import { motion } from 'framer-motion'
import { MosaicStrip } from '@/components/shared/MosaicStrip'
import { BrandCard } from '@/components/hub/BrandCard'
import { SUBSIDIARIES } from '@/lib/constants'

export default function SubsidiariesPage() {
  return (
    <main className="bg-cream">
      {/* Hero strip */}
      <div className="bg-navy pt-20">
        <MosaicStrip height={90} />
        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
              Portfolio
            </p>
            <h1 className="font-display font-black text-cream text-4xl md:text-5xl lg:text-6xl leading-tight">
              Our Universe
            </h1>
            <p className="font-body text-cream/70 text-lg mt-4">
              Eight brands. One mission. Infinite impact.
            </p>
          </div>
        </div>
        <MosaicStrip height={60} />
      </div>

      {/* Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SUBSIDIARIES.map((brand, i) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <BrandCard
                  name={brand.name}
                  tagline={brand.tagline}
                  description={brand.description}
                  url={brand.url}
                  accent={brand.accent}
                  icon={brand.icon}
                  expanded
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
