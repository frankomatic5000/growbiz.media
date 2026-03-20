'use client'

import { motion } from 'framer-motion'
import { BrandCard } from './BrandCard'
import { SUBSIDIARIES } from '@/lib/constants'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function SubsidiariesGrid() {
  return (
    <section className="bg-cream py-24 px-6 border-t border-navy/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
            Portfolio
          </p>
          <h2 className="font-display font-black text-navy text-3xl md:text-4xl lg:text-5xl">
            Our Universe
          </h2>
          <p className="font-body text-gold text-lg mt-3">
            Nine brands. One mission. Infinite impact.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {SUBSIDIARIES.map((brand) => (
            <motion.div key={brand.id} variants={cardVariants}>
              <BrandCard
                name={brand.name}
                tagline={brand.tagline}
                url={brand.url}
                accent={brand.accent}
                icon={brand.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
