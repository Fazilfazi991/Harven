"use client";

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

export default function PepperLandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    quantity: '',
    message: ''
  });

  const productImages = [
    { src: '/images/pepper/stock_1.png', label: 'Actual Stock: Grade A Black Pepper', type: 'Stock' },
    { src: '/images/pepper/stock_2.png', label: 'Direct Sourcing: Traditional Harvest', type: 'Sourcing' },
    { src: '/images/pepper/mockup_1.png', label: 'Retail Ready: HARVEN Signature Mockup', type: 'Branding' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 px-8 lg:px-16 min-h-[60vh] flex items-center bg-forest-darker text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/pepper/stock_1.png" 
            alt="Black Pepper Hero" 
            className="w-full h-full object-cover opacity-20 saturate-0 scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-darker via-forest-darker/90 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.15em] uppercase text-white/80 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6 group cursor-default">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse shadow-[0_0_8px_rgba(139,175,124,0.6)]" />
            Stock Live & Available
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.1] tracking-tight mb-8">
            Premium <span className="italic font-normal text-sage">Indian</span> <br />
            Black Pepper
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
            High-piperine, machine-cleaned, and steam-sterilized. Sourced directly from the lush Malabar Coast, India, for global distribution.
          </p>
          <div className="flex flex-wrap gap-5">
            <Button variant="primary" onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Request Quotation <ArrowRight size={18} className="ml-2" />
            </Button>
            <div className="flex items-center gap-4 text-white/40 font-mono text-[0.6rem] uppercase tracking-widest border-l border-white/10 pl-6">
              <span>Tellicherry Grade</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Moisture 12.5%</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT IMAGE GALLERY */}
      <section className="py-20 lg:py-32 px-8 lg:px-16 bg-cream/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-terracotta font-bold mb-4 block">Visual Inspection</span>
              <h2 className="font-display text-4xl lg:text-5xl text-forest-darker mb-6 leading-tight">Current Stock & <br /><span className="italic">Packaging Standards</span></h2>
              <p className="text-text-muted font-light leading-relaxed">
                Take a closer look at our latest arrival. We provide both bulk raw commodities and premium retail-ready packaging solutions.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-cream-dark shadow-sm">
              <ShieldCheck className="text-forest" size={24} />
              <div className="text-[0.7rem] uppercase tracking-wider font-bold text-text-dark">
                Quality Certified<br />
                <span className="text-text-muted font-normal normal-case">HACCP & ISO Standards</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productImages.map((image, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-[32px] border border-cream-dark bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={image.src} 
                    alt={image.label} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-darker/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 right-6">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest text-text-dark shadow-sm">
                      {image.type}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-text-dark font-medium text-sm leading-relaxed">{image.label}</p>
                  <div className="mt-4 w-8 h-[2px] bg-terracotta group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS & INQUIRY SECTION */}
      <section className="py-20 lg:py-32 px-8 lg:px-16 bg-white w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="w-full lg:w-3/5">
            <div className="mb-12">
              <h2 className="font-display text-4xl text-forest-darker mb-4">Detailed Specifications</h2>
              <p className="text-text-muted font-light">Comprehensive data for industrial and gourmet buyers.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-12">
              {[
                { label: 'Density', value: '550 - 600 G/L' },
                { label: 'Moisture', value: '12.5% Max' },
                { label: 'Admixture', value: '0.2% Max' },
                { label: 'Piperine', value: '4.5% - 6.5%' },
                { label: 'Origin', value: 'Malabar Coast, India' },
                { label: 'Packing', value: '25kg / 50kg PP Bags or Jute Bags' }
              ].map((spec, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-cream hover:bg-cream/20 transition-colors">
                  <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-text-muted">{spec.label}</span>
                  <span className="font-semibold text-text-dark">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5 p-8 bg-forest rounded-[32px] text-white overflow-hidden relative group">
              <Zap className="absolute -right-10 -bottom-10 text-white/5 group-hover:scale-150 transition-transform duration-1000" size={200} />
              <div className="relative z-10">
                <h4 className="font-display text-2xl font-semibold mb-4 flex items-center gap-3">
                  <Zap className="text-sage" size={24} /> 
                  Premium Export Logistics
                </h4>
                <p className="text-white/70 text-sm font-light leading-relaxed max-w-md">
                  Operating from our Dubai hub, we provide end-to-end logistics from Cochin Port to your warehouse. We specialize in bulk tea and spice shipments with full phytosanitary certification.
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/5">
            <div className="sticky top-32">
              <div id="inquiry-form" className="bg-cream-warm p-10 rounded-[40px] border border-black/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-full -mr-16 -mt-16" />
                <h3 className="font-display text-3xl font-semibold text-text-dark mb-8 relative z-10">Secure Your Quote</h3>
                <form className="flex flex-col gap-5 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Inquiry submitted successfully!"); }}>
                  <div className="space-y-1.5">
                    <label className="text-[0.65rem] uppercase tracking-widest font-bold text-text-muted ml-1">Full Name</label>
                    <input type="text" placeholder="John Doe" required className="w-full p-4 bg-white rounded-2xl border border-transparent focus:border-sage focus:outline-none transition-all shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[0.65rem] uppercase tracking-widest font-bold text-text-muted ml-1">Company</label>
                    <input type="text" placeholder="Global Spices Ltd" required className="w-full p-4 bg-white rounded-2xl border border-transparent focus:border-sage focus:outline-none transition-all shadow-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] uppercase tracking-widest font-bold text-text-muted ml-1">Email</label>
                      <input type="email" placeholder="john@company.com" required className="w-full p-4 bg-white rounded-2xl border border-transparent focus:border-sage focus:outline-none transition-all shadow-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] uppercase tracking-widest font-bold text-text-muted ml-1">Target Qty</label>
                      <input type="text" placeholder="e.g. 14 MT" required className="w-full p-4 bg-white rounded-2xl border border-transparent focus:border-sage focus:outline-none transition-all shadow-sm" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[0.65rem] uppercase tracking-widest font-bold text-text-muted ml-1">Inquiry Details</label>
                    <textarea rows={4} placeholder="Tell us about your requirements..." className="w-full p-4 bg-white rounded-2xl border border-transparent focus:border-sage focus:outline-none transition-all shadow-sm" />
                  </div>
                  <Button variant="primary" className="w-full py-5 rounded-2xl text-[0.9rem] shadow-xl shadow-forest/20 mt-2" type="submit">
                    Send Quote Request
                  </Button>
                  <p className="text-center text-[0.65rem] text-text-muted mt-2">
                    Typical response time: <span className="text-forest font-bold">Under 4 hours</span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST FOOTER CTA */}
      <section className="bg-forest-deep py-20 px-8 lg:px-16 text-center border-t border-white/5">
        <h3 className="font-display text-4xl text-white mb-8">Looking for large-scale supply contracts?</h3>
        <p className="text-white/50 text-lg mb-12 max-w-2xl mx-auto font-light">
          We offer multi-container annual contracts with fixed pricing schedules for major processors and retailers.
        </p>
        <div className="flex justify-center gap-12 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="text-sage" size={32} />
            <span className="text-white font-mono text-[0.7rem] uppercase">SGS Inspected</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="text-sage" size={32} />
            <span className="text-white font-mono text-[0.7rem] uppercase">FOB/CIF Terms</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="text-sage" size={32} />
            <span className="text-white font-mono text-[0.7rem] uppercase">Dubai HQ Support</span>
          </div>
        </div>
      </section>
    </div>
  )
}
