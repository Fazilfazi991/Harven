import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function BrandHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(139,175,124,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <span className="section-tag animate-in fade-in slide-in-from-bottom-4 duration-700">HARVEN Exclusive</span>
        <h1 className="font-display text-[clamp(2.8rem,6vw,5rem)] font-normal text-text-dark leading-[1.05] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          Nature’s Finest, <br />
          <strong className="font-semibold italic text-forest">Curated by HARVEN.</strong>
        </h1>
        <p className="section-sub mx-auto mb-10 text-lg opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Introducing our exclusive portfolio of premium food brands. Sourced from the lush landscapes of India and processed with uncompromising quality.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <Link href="/contact" className="bg-forest text-white px-8 py-4 rounded-full font-medium text-[0.9rem] flex items-center gap-2 transition-all hover:bg-forest-deep hover:-translate-y-1 shadow-lg shadow-forest/10">
            Contact Us <ArrowRight size={18} />
          </Link>
          {/* Duplicate button removed as per requirements */}
        </div>
      </div>
    </section>
  )
}
