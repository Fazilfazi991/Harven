"use client";

import React, { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { ArrowRight } from 'lucide-react'

import { createClient } from '@/lib/supabase/client'

const MOCK_CATEGORIES = [
  { id: '1', name: 'Cardamom', img: 'https://images.unsplash.com/photo-1615486511484-92e17244f77c?w=400&q=80', description: 'Premium Jumbo green cardamom pods sourced from high altitude farms.', category: 'Spices', tags: ['Guatemala', 'India', 'Jumbo Size'] },
  { id: '2', name: 'Black Pepper', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80', description: 'High-quality Black Pepper, heavily sorted and cleaned with high ASTA values.', category: 'Spices', tags: ['Vietnam', 'High ASTA'] },
  { id: '3', name: 'Coffee Beans', img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&q=80', description: 'Premium globally sourced coffee beans ready for industrial roasting.', category: 'Spices', tags: ['Raw Beans', 'Vietnam', 'Origins'] },
  { id: '4', name: 'Cloves', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80', description: 'Long Cloves selected precisely to meet international consistency standards.', category: 'Spices', tags: ['Long', 'Cambodia'] },
  { id: '5', name: 'Cinnamon', img: 'https://images.unsplash.com/photo-1532054245999-6e3e57fbd6c6?w=400&q=80', description: 'Authentic Cinnamon bark sourced from trusted South Asian partners.', category: 'Spices', tags: ['Bark', 'Premium'] },
  
  { id: '6', name: 'White Rice', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', description: 'Multiple varieties of rice including Basmati and White broken rice.', category: 'Grains', tags: ['5% Broken', 'Long Grain'] },
  { id: '7', name: 'Wheat', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', description: 'High protein milling wheat suitable for continuous industrial processing.', category: 'Grains', tags: ['Hard Red', 'High Protein'] },
  
  { id: '8', name: 'Coconuts', img: 'https://images.unsplash.com/photo-1526346282855-f5b244d2dccd?w=400&q=80', description: 'Raw and tender coconuts shipped globally with stringent freshness controls.', category: 'Fresh Produce', tags: ['Raw', 'Tender'] },
  { id: '9', name: 'Mangoes & Avocados', img: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&q=80', description: 'Fresh fruit assortments including avocados, apples, and passion fruit.', category: 'Fresh Produce', tags: ['Seasonal', 'Global Origin'] },

  { id: '10', name: 'Almonds', img: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80', description: 'Nonpareil Californian almonds, packed for extended shelf life logistics.', category: 'Dry Fruits', tags: ['California', 'Nonpareil'] },
  { id: '11', name: 'Cashews', img: 'https://images.unsplash.com/photo-1599905295058-29e3760492cb?w=400&q=80', description: 'W320 and W240 grade cashews ensuring consistent size and maximum crunch.', category: 'Dry Fruits', tags: ['W320', 'Vietnam'] },
  { id: '12', name: 'Pistachios & Pecans', img: 'https://images.unsplash.com/photo-1562206898-1e42b2ab6213?w=400&q=80', description: 'Assortment including Brazil Nuts, Pine Nuts, Hazelnuts and Macadamia.', category: 'Dry Fruits', tags: ['Bulk Deals', 'Premium Quality'] },

  { id: '13', name: 'Frozen Meats', img: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=400&q=80', description: 'Carefully handled frozen meats and food items meeting strict controls.', category: 'Frozen', tags: ['Regulated', 'Cold Chain'] }
]

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [productsData, setProductsData] = useState<any[]>(MOCK_CATEGORIES)

  React.useEffect(() => {
    const fetchDB = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase.from('products').select('*').eq('is_active', true).order('sort_order')
        if (data && data.length > 0) {
          // Map DB columns to our UI schema
          const mapped = data.map(d => ({
            id: d.id,
            name: d.name,
            img: d.image_url,
            description: d.description,
            category: d.category,
            tags: d.tags || []
          }))
          setProductsData(mapped)
        }
      } catch (e) {
        console.log("Supabase fetch failed or not connected, utilizing PDF extracted mockup.")
      }
    }
    fetchDB()
  }, [])

  const tabs = ['All', 'Spices', 'Grains', 'Fresh Produce', 'Dry Fruits', 'Frozen']

  const filteredProducts = activeTab === 'All' 
    ? productsData 
    : productsData.filter(p => p.category === activeTab)

  return (
    <>
      <section className="bg-forest-deep pt-40 pb-28 px-8 lg:px-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,112,75,0.15)_0%,transparent_60%)] pointer-events-none" />
        <h1 className="font-display text-5xl md:text-6xl text-white font-light tracking-tight mb-6 relative z-10">Premium Food <strong className="font-semibold italic text-wheat-light">Commodities.</strong></h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed relative z-10">Explore our extensive range of high-quality products sourced directly from trusted global farms, rigorously tested, and ready for global delivery.</p>
      </section>

      <div className="bg-white py-6 px-8 lg:px-16 border-b border-cream-dark flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide sticky top-[80px] z-40">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors ${
              activeTab === tab 
                ? 'bg-forest text-white border border-forest shadow-md' 
                : 'bg-cream text-text-muted border border-transparent hover:border-cream-dark hover:text-forest-darker'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="bg-cream-warm py-20 px-8 lg:px-16 min-h-[50vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((p: any) => (
            <div key={p.id} className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/5 hover:-translate-y-[6px] hover:shadow-[0_20px_60px_rgba(45,90,61,0.08)] transition-all duration-500 group flex flex-col">
              <div className="w-full h-56 overflow-hidden relative">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover saturate-[0.8] transition-all duration-700 group-hover:scale-[1.08] group-hover:saturate-100" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 font-mono text-[0.55rem] uppercase tracking-widest text-forest rounded-full">
                  {p.category}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="font-display text-2xl font-semibold text-text-dark mb-3">{p.name}</h3>
                <p className="text-text-muted text-[0.85rem] font-light leading-relaxed mb-6 flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {p.tags.map((t: string) => (
                    <span key={t} className="font-mono text-[0.55rem] px-2.5 py-1 rounded bg-cream text-text-mid border border-cream-dark">
                      {t}
                    </span>
                  ))}
                </div>
                <Button variant="outline-dark" className="w-full justify-center group-hover:bg-forest group-hover:text-white" onClick={() => setSelectedProduct(p)}>
                  Inquire Now <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title={`Inquire about ${selectedProduct?.name}`}>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center bg-cream-warm p-4 rounded-xl border border-cream-dark">
             <img src={selectedProduct?.img} alt="" className="w-16 h-16 rounded-lg object-cover" />
             <div>
               <div className="font-display text-lg font-semibold">{selectedProduct?.name}</div>
               <div className="text-xs text-text-muted font-mono">{selectedProduct?.category}</div>
             </div>
          </div>
          <form className="flex flex-col gap-5">
            <p className="text-[0.85rem] text-text-muted font-light">Please fill out this quick form to request wholesale pricing, technical specifications, and shipping availability.</p>
            <div className="grid grid-cols-2 gap-5">
              <input type="text" placeholder="Your Name" className="p-4 border border-transparent rounded-xl bg-cream focus:outline-forest focus:ring-1 focus:ring-forest" required />
              <input type="text" placeholder="Company Name" className="p-4 border border-transparent rounded-xl bg-cream focus:outline-forest focus:ring-1 focus:ring-forest" required />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <input type="email" placeholder="Email Address" className="p-4 border border-transparent rounded-xl bg-cream focus:outline-forest focus:ring-1 focus:ring-forest" required />
              <input type="text" placeholder="Quantity Required" className="p-4 border border-transparent rounded-xl bg-cream focus:outline-forest focus:ring-1 focus:ring-forest" required />
            </div>
            <textarea placeholder="Additional Details (e.g. Origin preference, packing, delivery port)" rows={4} className="p-4 border border-transparent rounded-xl bg-cream focus:outline-forest focus:ring-1 focus:ring-forest resize-none" />
            <Button variant="primary" className="mt-2" type="submit" onClick={(e) => { e.preventDefault(); alert("Inquiry Sent successfully!") }}>
              Submit Inquiry
            </Button>
          </form>
        </div>
      </Modal>
    </>
  )
}
