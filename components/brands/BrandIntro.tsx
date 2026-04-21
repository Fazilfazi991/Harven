import React from 'react'
import { Leaf, Zap, Shield, Award, CheckCircle2 } from 'lucide-react'
import { Brand } from '@/config/brands.config'
import { DownloadButton } from './DownloadButton'

interface BrandIntroProps {
  brand: Brand
}

export function BrandIntro({ brand }: BrandIntroProps) {
  const isImageLeft = brand.imagePosition === 'left'

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center mb-20 ${isImageLeft ? 'lg:grid-cols-[1.2fr_1fr]' : ''}`}>
      <div className={`${isImageLeft ? 'lg:order-2' : ''}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${brand.id === 'fiori' ? 'bg-terracotta/10 text-terracotta' : 'bg-sage/10 text-forest'}`}>
            {brand.id === 'fiori' ? <Zap size={24} /> : <Leaf size={24} />}
          </div>
          <span className={`font-mono text-sm tracking-widest uppercase font-bold ${brand.id === 'fiori' ? 'text-terracotta' : 'text-forest'}`}>
            {brand.category}
          </span>
        </div>
        <h2 className="font-display text-4xl lg:text-6xl font-semibold text-text-dark mb-6">
          {brand.name} – <br />
          <span className={brand.id === 'fiori' ? 'text-terracotta' : 'text-forest'}>{brand.tagline}</span>
        </h2>
        <p className="text-text-muted text-lg leading-relaxed mb-8 font-light">
          {brand.description}
        </p>
        
        <div className="grid grid-cols-2 gap-6 mb-8">
          {brand.features.map((feature, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              {idx === 0 ? <Shield className={brand.id === 'fiori' ? 'text-terracotta' : 'text-forest'} size={20} /> : <Award className={brand.id === 'fiori' ? 'text-terracotta' : 'text-forest'} size={20} />}
              <h4 className="font-medium text-text-dark">{feature}</h4>
            </div>
          ))}
        </div>

        <DownloadButton 
          href={brand.brandProfilePdf} 
          className={brand.id === 'fiori' ? 'text-terracotta' : 'text-forest'}
        />
      </div>
      
      {brand.additionalSections && brand.additionalSections.length > 0 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 h-auto lg:h-[600px] ${isImageLeft ? 'lg:order-1' : ''}`}>
          <div className="bg-cream rounded-[32px] overflow-hidden relative group shadow-sm border border-cream-dark h-[300px] lg:h-full">
            <img src={brand.introImage} alt={brand.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            {brand.additionalSections?.[0] && (
              <div className={`absolute inset-0 bg-gradient-to-t ${brand.id === 'fiori' ? 'from-terracotta/60' : 'from-forest/60'} to-transparent flex flex-col justify-end p-8`}>
                <span className="text-white/80 font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-2">{brand.additionalSections[0].title}</span>
                <h3 className="text-white font-display text-2xl lg:text-3xl leading-tight">{brand.additionalSections[0].items[0]}</h3>
              </div>
            )}
          </div>
          <div className="grid grid-rows-2 gap-4 lg:gap-6">
            <div className="bg-cream rounded-[32px] overflow-hidden relative group shadow-sm border border-cream-dark h-[200px] lg:h-full">
              <img src={brand.secondaryImage || brand.introImage} alt="Feature" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              {brand.additionalSections?.[1] && (
                <div className="absolute inset-0 bg-gradient-to-t from-terracotta/50 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-display text-xl">{brand.additionalSections[1].title}</h3>
                </div>
              )}
            </div>
            <div className={`${brand.id === 'fiori' ? 'bg-terracotta' : 'bg-forest'} rounded-[32px] p-8 flex flex-col justify-center text-white relative overflow-hidden group h-[200px] lg:h-full`}>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150" />
              <h3 className="font-display text-2xl mb-4 relative z-10">Premium Supply</h3>
              <p className="text-sm text-white/70 leading-relaxed relative z-10">Bulk allocations secured directly from farm cooperatives.</p>
              <DownloadButton href={brand.brandProfilePdf} className="mt-6 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className={`relative h-[400px] lg:h-[600px] w-full max-w-lg mx-auto lg:mx-0 ${isImageLeft ? 'lg:order-1' : ''}`}>
          <div className="relative rounded-[40px] overflow-hidden h-full shadow-2xl border border-cream-dark group">
            <img src={brand.introImage} alt={brand.name} className="w-full h-full object-cover saturate-[1.1] transition-transform duration-700 group-hover:scale-105" />
            <div className={`absolute inset-0 bg-gradient-to-t ${brand.id === 'fiori' ? 'from-terracotta/40' : 'from-forest/40'} to-transparent`} />
          </div>
          {/* Floating Premium Supply Card */}
          <div className={`absolute -left-6 lg:-left-12 bottom-12 ${brand.id === 'fiori' ? 'bg-terracotta' : 'bg-forest'} rounded-[32px] p-6 lg:p-8 flex flex-col justify-center text-white shadow-xl border-4 border-white hidden md:flex max-w-[280px]`}>
            <h3 className="font-display text-xl mb-2">Premium Supply</h3>
            <p className="text-xs text-white/80 leading-relaxed mb-4">Bulk allocations secured directly from farm cooperatives.</p>
            <DownloadButton href={brand.brandProfilePdf} className="text-white text-xs" />
          </div>
        </div>
      )}
    </div>
  )
}
