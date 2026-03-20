'use client'

import { motion } from 'framer-motion'

export function BrandStatement() {
  return (
    <section className="bg-cream py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="flex items-center gap-6 mb-8 justify-center">
          <div className="flex-1 h-px bg-mustard max-w-24" />
          <span className="font-body text-xs uppercase tracking-widest text-mustard font-semibold">
            Our Creed
          </span>
          <div className="flex-1 h-px bg-mustard max-w-24" />
        </div>

        <p className="font-editorial text-3xl md:text-4xl lg:text-5xl text-navy leading-snug font-semibold">
          &quot;A Global Media of Virtues&quot;
        </p>

        <div className="flex items-center gap-6 mt-8 justify-center">
          <div className="flex-1 h-px bg-mustard max-w-24" />
          <div className="w-2 h-2 bg-mustard rotate-45" />
          <div className="flex-1 h-px bg-mustard max-w-24" />
        </div>
      </motion.div>
    </section>
  )
}
