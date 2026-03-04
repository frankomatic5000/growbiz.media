import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin, Youtube } from 'lucide-react'
import { MosaicStrip } from './MosaicStrip'
import { SUBSIDIARIES } from '@/lib/constants'

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Our Universe', href: '/subsidiaries' },
  { label: 'Magazine', href: 'https://growbizmagazine.com' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-ink">
      <MosaicStrip height={90} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/assets/logo-dark.png"
                alt="GrowBiz Media"
                width={160}
                height={75}
                className="h-10 w-auto"
              />
            </div>
            <p className="font-editorial text-cream/60 text-sm leading-relaxed mb-6 italic">
              A Global Media of Virtues
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/growbizmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-mustard transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com/company/growbizmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-mustard transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://youtube.com/@growbizmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-mustard transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Col 2: Company */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Brands */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-5">
              Our Brands
            </h4>
            <ul className="space-y-3">
              {SUBSIDIARIES.slice(0, 7).map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={brand.url}
                    className="font-body text-sm text-cream/60 hover:text-cream transition-colors"
                    target={brand.url.startsWith('http') ? '_blank' : undefined}
                    rel={brand.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-5">
              Contact
            </h4>
            <div className="space-y-3 font-body text-sm text-cream/60">
              <p>New Jersey / New York Area</p>
              <a
                href="mailto:info@growbiz.media"
                className="block hover:text-cream transition-colors"
              >
                info@growbiz.media
              </a>
              <Link
                href="/contact"
                className="inline-block mt-2 text-mustard hover:text-mustard-dark transition-colors font-semibold"
              >
                Work With Us →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-body text-xs text-cream/40">
            © 2025 GrowBiz Media · All Rights Reserved · growbiz.media
          </p>
          <p className="font-editorial italic text-xs text-cream/30">
            A Global Media of Virtues
          </p>
        </div>
      </div>
    </footer>
  )
}
