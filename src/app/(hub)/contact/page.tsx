'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MosaicStrip } from '@/components/shared/MosaicStrip'
import { Instagram, Linkedin, Youtube, MapPin, Mail } from 'lucide-react'

const INTERESTS = [
  'Studio Production',
  'Speaking Events',
  'Magazine Feature',
  'Partnership',
  'Other',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
      .then((res) => {
        if (res.ok) setSubmitted(true)
      })
      .catch(() => {
        // Fallback: open mailto
        const name = data.get('name') as string
        const email = data.get('email') as string
        const message = data.get('message') as string
        window.location.href = `mailto:info@growbiz.media?subject=Contact from ${name}&body=${message}%0A%0AReply to: ${email}`
      })
  }

  return (
    <main className="bg-cream">
      {/* Hero strip */}
      <div className="bg-navy pt-20">
        <MosaicStrip height={90} />
        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
              Let&apos;s Connect
            </p>
            <h1 className="font-display font-black text-cream text-4xl md:text-5xl lg:text-6xl leading-tight">
              Work With Us
            </h1>
          </div>
        </div>
        <MosaicStrip height={60} />
      </div>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-mustard/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-mustard rounded-full" />
                </div>
                <h2 className="font-display font-bold text-navy text-2xl mb-3">
                  Message Sent!
                </h2>
                <p className="font-body text-ink/70">
                  We&apos;ll get back to you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-xs uppercase tracking-widest text-navy/60 font-semibold block mb-2">
                      Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full bg-white border border-navy/15 rounded-sm px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-mustard transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-widest text-navy/60 font-semibold block mb-2">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full bg-white border border-navy/15 rounded-sm px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-mustard transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-navy/60 font-semibold block mb-2">
                    Company / Brand
                  </label>
                  <input
                    name="company"
                    type="text"
                    className="w-full bg-white border border-navy/15 rounded-sm px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-mustard transition-colors"
                    placeholder="Your company or brand name"
                  />
                </div>

                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-navy/60 font-semibold block mb-2">
                    I&apos;m interested in *
                  </label>
                  <select
                    name="interest"
                    required
                    className="w-full bg-white border border-navy/15 rounded-sm px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-mustard transition-colors"
                  >
                    <option value="">Select an option</option>
                    {INTERESTS.map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-navy/60 font-semibold block mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-white border border-navy/15 rounded-sm px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-mustard transition-colors resize-none"
                    placeholder="Tell us about yourself and what you're looking for..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-body font-semibold bg-mustard text-navy px-8 py-4 rounded-sm hover:bg-mustard-dark transition-colors uppercase tracking-wide text-sm"
                >
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display font-bold text-navy text-lg mb-4">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-ink/70 font-body text-sm">
                  <MapPin size={16} className="text-mustard mt-0.5 shrink-0" />
                  <span>New Jersey / New York Area</span>
                </div>
                <div className="flex items-start gap-3 text-ink/70 font-body text-sm">
                  <Mail size={16} className="text-mustard mt-0.5 shrink-0" />
                  <a href="mailto:info@growbiz.media" className="hover:text-navy transition-colors">
                    info@growbiz.media
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-navy text-lg mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/growbizmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-ink/60 hover:text-mustard transition-colors"
                >
                  <Instagram size={18} />
                  Instagram
                </a>
                <a
                  href="https://linkedin.com/company/growbizmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-ink/60 hover:text-mustard transition-colors"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
                <a
                  href="https://youtube.com/@growbizmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-ink/60 hover:text-mustard transition-colors"
                >
                  <Youtube size={18} />
                  YouTube
                </a>
              </div>
            </div>

            <div className="bg-navy rounded-sm p-6">
              <h4 className="font-display font-bold text-cream text-base mb-3">
                Response Time
              </h4>
              <p className="font-body text-cream/70 text-sm leading-relaxed">
                We typically respond within 48 business hours. For urgent inquiries, reach us directly at info@growbiz.media.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
