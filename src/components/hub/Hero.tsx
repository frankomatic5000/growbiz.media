'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
}

export function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col overflow-hidden">

      {/* Full-width header-mosaic frame — top of hero */}
      <div className="relative w-full shrink-0" style={{ height: '220px' }}>
        <Image
          src="/assets/header-mosaic.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Fade to black at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-black" aria-hidden="true" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto px-6 w-full pt-4 pb-24 flex flex-col items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Logo — hero centrepiece */}
            <motion.div variants={itemVariants} className="mb-4">
              <Image
                src="/assets/logo-dark.png"
                alt="GrowBiz Media"
                width={480}
                height={226}
                className="w-72 sm:w-96 md:w-[480px] lg:w-[600px] h-auto"
                priority
              />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display font-black text-cream text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6"
            >
              Where Brands
              <br />
              Build Authority.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body text-cream/70 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              A multicultural media holding empowering entrepreneurs, founders, and leaders — globally. Eight brands, one mission, infinite impact.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/subsidiaries"
                className="font-body font-semibold bg-mustard text-navy px-8 py-4 rounded-sm hover:bg-mustard-dark transition-colors uppercase tracking-wide text-sm"
              >
                Explore Our Universe
              </Link>
              <Link
                href="/about"
                className="font-body font-semibold border-2 border-cream/40 text-cream px-8 py-4 rounded-sm hover:bg-cream/10 transition-colors uppercase tracking-wide text-sm"
              >
                Meet GrowBiz
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
