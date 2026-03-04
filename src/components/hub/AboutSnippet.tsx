'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const STATS = [
  { value: '8+', label: 'Brands Under One Roof' },
  { value: 'NY/NJ', label: 'Based, Global Reach' },
  { value: '3', label: 'Media Pillars' },
]

export function AboutSnippet() {
  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
            About GrowBiz Media
          </p>
          <h2 className="font-display font-black text-navy text-3xl md:text-4xl leading-tight mb-6">
            One Holding.
            <br />
            Eight Brands. One Mission.
          </h2>
          <div className="space-y-4 font-body text-ink/70 leading-relaxed text-base md:text-lg">
            <p>
              GrowBiz Media is a multicultural media holding company rooted in New Jersey and New York, built to serve entrepreneurs, founders, and leaders who are creating impact across communities.
            </p>
            <p>
              We operate through three pillars — Production, Events, and Publishing — giving every founder access to studio-grade content, live stages, and editorial storytelling.
            </p>
            <p>
              Our brands serve immigrants, global professionals, women entrepreneurs, and multicultural business leaders. We believe every story deserves to be told with excellence.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-8 font-body text-sm font-semibold text-mustard hover:text-mustard-dark transition-colors uppercase tracking-wide"
          >
            Our Story →
          </Link>
        </motion.div>

        {/* Right: Stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-navy rounded-sm px-8 py-7 flex flex-col gap-1"
            >
              <span className="font-display font-black text-mustard text-4xl leading-none">
                {stat.value}
              </span>
              <span className="font-body text-cream/70 text-sm uppercase tracking-wide font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
