import React from 'react'
import { Brand } from '@/config/brands.config'
import { BrandIntro } from './BrandIntro'
import { ProductGrid } from './ProductGrid'

interface BrandSectionProps {
  brand: Brand
}

export function BrandSection({ brand }: BrandSectionProps) {
  return (
    <section id={brand.id} className="py-20 lg:py-32 px-6 lg:px-16 bg-white border-y border-cream-dark scroll-mt-20 first:border-t-0">
      <div className="max-w-7xl mx-auto">
        <BrandIntro brand={brand} />
        <ProductGrid products={brand.products} />
      </div>
    </section>
  )
}
