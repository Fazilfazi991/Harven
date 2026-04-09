"use client";

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

// Dummy Data mimicking Supabase `landing_pages` output
const mockLandingPage = {
  slug: 'premium-black-pepper',
  title: 'Premium Black Pepper — Now Available',
  hero_headline: 'Premium Black Pepper — Now Available',
  hero_subtext: 'High ASTA, cleaned and sterilized black pepper direct from Vietnam.',
  hero_badge: 'New Arrival',
  hero_image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&q=80',
  hero_cta_text: 'Request a Quote',
  content_blocks: [
    { type: 'text', content: '<p>Our latest shipment of Vietnam-origin Black Pepper has arrived. This is 500g/l, thoroughly machine-cleaned, and suitable for premium food processing or retail packaging.</p>' },
    { type: 'specs_table', rows: [
      { key: 'Product', value: 'Black Pepper' },
      { key: 'Grade', value: '500g/l FAQ / Cleaned' },
      { key: 'Origin', value: 'Vietnam' },
      { key: 'MOQ', value: '1 FCL (14 MT)' },
      { key: 'Incoterm', value: 'CIF / FOB / Ex-Works' }
    ]},
    { type: 'highlight_box', icon: '⚡', text: 'Limited availability. Special pricing for early contract signups.', color: 'sage' },
    { type: 'bullet_list', title: 'Why Choose This Lot?', items: [
      'Guaranteed high piperine content.',
      'Aflatoxin within EU limits.',
      'Ready for immediate dispatch.'
    ]}
  ],
  show_chatbot: true,
  show_inquiry_form: true,
}

export default function LandingPage() {
  const { slug } = useParams()
  // Mock fetch logic
  const pageData = mockLandingPage
  
  if (!pageData) {
    return <div className="min-h-screen flex items-center justify-center font-display text-2xl text-forest">Page Not Found</div>
  }

  const renderBlock = (block: any, i: number) => {
    switch (block.type) {
      case 'text':
        return <div key={i} className="prose prose-forest text-text-muted font-light mb-8 max-w-none" dangerouslySetInnerHTML={{ __html: block.content }} />
      case 'specs_table':
        return (
          <div key={i} className="mb-8 rounded-2xl border border-cream-dark overflow-hidden bg-white">
            {block.rows.map((row: any, idx: number) => (
              <div key={idx} className="flex flex-col sm:flex-row border-b border-cream-dark last:border-b-0 p-4 hover:bg-cream/50 transition-colors">
                <div className="w-full sm:w-1/3 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-text-muted mb-1 sm:mb-0 pt-1">{row.key}</div>
                <div className="w-full sm:w-2/3 font-medium text-text-dark">{row.value}</div>
              </div>
            ))}
          </div>
        )
      case 'highlight_box':
        // Determine coloring
        const bgColors: any = { sage: 'bg-sage/15 border-sage/30 text-forest-deep', terracotta: 'bg-terracotta/10 border-terracotta/30 text-terracotta' }
        const applyCol = bgColors[block.color] || bgColors.sage
        return (
          <div key={i} className={`flex items-start gap-4 p-6 rounded-2xl border mb-8 ${applyCol}`}>
            <div className="text-2xl mt-[-2px]">{block.icon}</div>
            <div className="font-medium text-sm">{block.text}</div>
          </div>
        )
      case 'bullet_list':
        return (
          <div key={i} className="mb-8 p-8 bg-cream rounded-2xl">
            <h4 className="font-display text-xl font-semibold text-forest-darker mb-4">{block.title}</h4>
            <ul className="list-none flex flex-col gap-3 p-0 m-0">
              {block.items.map((it: string, idx: number) => (
                <li key={idx} className="flex gap-3 text-text-mid text-sm font-light">
                  <span className="text-terracotta">✓</span> {it}
                </li>
              ))}
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <section className="relative pt-36 pb-24 px-8 lg:px-16 min-h-[70vh] flex items-center bg-forest-darker text-white overflow-hidden">
        {pageData.hero_image_url && (
          <div className="absolute inset-0 z-0">
            <img src={pageData.hero_image_url} alt="" className="w-full h-full object-cover opacity-30 saturate-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-darker/90 to-forest-darker/40" />
          </div>
        )}
        <div className="relative z-10 max-w-3xl">
          {pageData.hero_badge && (
            <div className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.15em] uppercase text-white/80 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-terracotta-light animate-pulse" />
              {pageData.hero_badge}
            </div>
          )}
          <h1 className="font-display text-5xl md:text-6xl font-light text-white leading-tight tracking-tight mb-6">{pageData.hero_headline}</h1>
          {pageData.hero_subtext && (
            <p className="text-white/60 text-lg font-light leading-relaxed mb-8 max-w-xl">{pageData.hero_subtext}</p>
          )}
          {pageData.hero_cta_text && (
            <Button variant="primary" onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}>
              {pageData.hero_cta_text}
            </Button>
          )}
        </div>
      </section>

      <section className="py-20 px-8 lg:px-16 bg-white w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-3/5">
            <div className="mb-12">
              <h2 className="font-display text-3xl text-forest-darker mb-2">Product Details</h2>
              <div className="w-16 h-[2px] bg-terracotta rounded-full" />
            </div>
            {pageData.content_blocks.map((b, i) => renderBlock(b, i))}
          </div>
          
          <div className="w-full lg:w-2/5 relative">
            <div className="sticky top-32">
              {pageData.show_inquiry_form && (
                <div id="inquiry-form" className="bg-cream-warm p-8 rounded-[24px] border border-black/5 shadow-xl">
                  <h3 className="font-display text-2xl font-semibold text-text-dark mb-6">Inquire About This Stock</h3>
                  <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Full Name" required className="p-3 bg-white rounded-xl border border-transparent focus:border-sage focus:outline-none" />
                    <input type="text" placeholder="Company" required className="p-3 bg-white rounded-xl border border-transparent focus:border-sage focus:outline-none" />
                    <input type="email" placeholder="Email" required className="p-3 bg-white rounded-xl border border-transparent focus:border-sage focus:outline-none" />
                    <input type="text" placeholder="Quantity Needed" required className="p-3 bg-white rounded-xl border border-transparent focus:border-sage focus:outline-none" />
                    <textarea rows={3} placeholder="Message" className="p-3 bg-white rounded-xl border border-transparent focus:border-sage focus:outline-none" />
                    <Button variant="primary" className="w-full mt-2" type="button" onClick={() => alert("Landing Page Inquiry Mock Submitted")}>
                      Submit Quote Request
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Optional: Add Chatbot button triggering if show_chatbot is true */}
      {pageData.show_chatbot && (
        <div className="fixed bottom-6 right-6 z-[100]">
           <button className="bg-forest text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-forest-deep transition-all hover:scale-105 active:scale-95">
             💬
           </button>
        </div>
      )}
    </>
  )
}
