'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function CTABanner() {
  return (
    <section className="bg-mustard py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="font-display font-black text-navy text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
          Ready to Grow Your Brand?
        </h2>
        <p className="font-body text-navy/70 text-lg md:text-xl leading-relaxed mb-10">
          Studio time, stage presence, media visibility — all under one roof.
        </p>
        <Link
          href="/contact"
          className="inline-block font-body font-semibold bg-navy text-cream px-10 py-4 rounded-sm hover:bg-navy-dark transition-colors uppercase tracking-wide text-sm"
        >
          Work With Us →
        </Link>
      </motion.div>
    </section>
  )
}
