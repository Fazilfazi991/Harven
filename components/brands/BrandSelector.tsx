'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { BRANDS_DATA } from '@/config/brands.config'

export function BrandSelector() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-12 bg-cream-warm px-6 lg:px-16 border-b border-cream-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-text-dark">Explore Our Brands</h2>
            <p className="text-text-muted text-sm mt-1">Select a brand to view exclusive collections</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BRANDS_DATA.map((brand) => (
            <button
              key={brand.id}
              onClick={() => scrollToSection(brand.id)}
              className="group relative bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-cream-dark text-left"
            >
              <div className="aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                <img 
                  src={brand.introImage} 
                  alt={brand.name} 
                  className="w-full h-full object-cover saturate-[0.8] group-hover:saturate-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end md:justify-center p-8 lg:p-12">
                  <span className={`font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-2 ${brand.id === 'fiori' ? 'text-terracotta' : 'text-sage'}`}>
                    {brand.category}
                  </span>
                  <h3 className="text-white font-display text-3xl lg:text-4xl font-bold mb-3">
                    {brand.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-xs font-medium group-hover:text-white transition-colors">
                    View Collections <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
