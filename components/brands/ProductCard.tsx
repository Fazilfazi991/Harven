import React from 'react'
import Link from 'next/link'
import { MapPin, Shield, Package, CheckCircle2, Clock, Thermometer, Droplets } from 'lucide-react'
import { Product } from '@/config/brands.config'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const getSpecIcon = (key: string) => {
    switch (key.toLowerCase()) {
      case 'origin': return <MapPin size={12} />
      case 'grade': return <Shield size={12} />
      case 'packaging': return <Package size={12} />
      case 'certificate': return <CheckCircle2 size={12} />
      case 'shelflife': return <Clock size={12} />
      case 'storage': return <Thermometer size={12} />
      case 'acidity': return <Droplets size={12} />
      default: return <CheckCircle2 size={12} />
    }
  }

  return (
    <div className="bg-white border border-cream-dark rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-[0_24px_80px_rgba(45,90,61,0.08)] hover:-translate-y-2 group flex flex-col">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={product.image || '/placeholder.jpg'} 
          alt={product.name} 
          className="w-full h-full object-cover saturate-[0.8] group-hover:saturate-100 transition-all duration-700 group-hover:scale-105" 
        />
        {product.badge && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest text-text-dark shadow-sm">
            {product.badge}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-8 flex-grow flex flex-col">
        <div className="mb-6">
          <h3 className="font-display text-2xl font-semibold text-text-dark mb-2">{product.name}</h3>
          <p className={`text-sm font-medium italic mb-4 ${
            product.accent === 'amber' ? 'text-amber-700' : 
            product.accent === 'emerald' ? 'text-emerald-700' : 
            product.accent === 'terracotta' ? 'text-terracotta' :
            'text-forest'
          }`}>{product.tagline}</p>
          <p className="text-text-muted text-[0.85rem] leading-relaxed line-clamp-2">{product.description}</p>
        </div>

        {/* Specs Table */}
        <div className="space-y-3 mb-8 pt-6 border-t border-cream-dark/50">
          {Object.entries(product.specs).map(([key, value]) => {
            if (!value) return null
            return (
              <div key={key} className="flex justify-between items-center text-[0.7rem] uppercase tracking-wider font-mono">
                <span className="text-text-muted flex items-center gap-1.5">
                  {getSpecIcon(key)} {key}
                </span>
                <span className="text-text-dark font-semibold text-right max-w-[150px]">{value}</span>
              </div>
            )
          })}
        </div>

        <Link 
          href={product.ctaLink || "/contact"} 
          className={`mt-auto w-full py-4 rounded-full text-center text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
            product.accent === 'amber' ? 'bg-amber-600/10 text-amber-900 hover:bg-amber-600 hover:text-white' : 
            product.accent === 'emerald' ? 'bg-emerald-600/10 text-emerald-900 hover:bg-emerald-600 hover:text-white' : 
            product.accent === 'terracotta' ? 'bg-terracotta/10 text-terracotta hover:bg-terracotta hover:text-white' :
            'bg-forest/10 text-forest hover:bg-forest hover:text-white'
          }`}
        >
          {product.ctaText}
        </Link>
      </div>
    </div>
  )
}
