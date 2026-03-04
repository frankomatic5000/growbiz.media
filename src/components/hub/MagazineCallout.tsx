'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

export function MagazineCallout() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">
      {/* Left: dark / magazine mockup */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="bg-navy flex items-center justify-center p-12 relative overflow-hidden"
      >
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #D6A846 0px, #D6A846 6px, transparent 6px, transparent 30px)',
          }}
          aria-hidden="true"
        />
        {/* Magazine mockup */}
        <div className="relative bg-cream/5 border border-mustard/30 rounded-sm w-48 h-64 flex flex-col items-center justify-center gap-4 p-6">
          <BookOpen size={40} className="text-mustard" strokeWidth={1} />
          <div className="text-center">
            <p className="font-display font-bold text-cream text-sm leading-tight">
              GrowBiz<br />Magazine
            </p>
            <p className="font-body text-mustard text-xs mt-2 uppercase tracking-widest">
              Issue #1
            </p>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-mustard rotate-45" />
        </div>
      </motion.div>

      {/* Right: cream / CTA */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-cream flex items-center px-10 md:px-16 py-16"
      >
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
            Editorial
          </p>
          <h2 className="font-display font-black text-navy text-2xl md:text-3xl lg:text-4xl leading-tight mb-6">
            Get Featured in
            <br />
            GrowBiz Magazine
          </h2>
          <p className="font-body text-ink/70 leading-relaxed text-base mb-8">
            GrowBiz Magazine amplifies multicultural business leaders, women founders, and global entrepreneurs. Tell your story to thousands of readers who are building the future of business.
          </p>
          <Link
            href="https://growbizmagazine.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body font-semibold bg-navy text-cream px-8 py-4 rounded-sm hover:bg-navy-dark transition-colors uppercase tracking-wide text-sm"
          >
            Apply Now →
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
