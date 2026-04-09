"use client";

import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function HomepageCMS() {
  const [activeTab, setActiveTab] = useState('slider')
  const [slides, setSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data } = await supabase.from('slides').select('*').order('sort_order')
      if (data) setSlides(data)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this slide?")) return
    try {
       const supabase = createClient()
       await supabase.from('slides').delete().eq('id', id)
       fetchSlides()
    } catch (err) {
       console.error(err)
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-text-dark">Homepage Configuration</h1>
        <p className="text-text-muted mt-2">Manage the hero slider and site-wide content blocks.</p>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="flex border-b border-black/5 px-6 pt-4 gap-6">
           <button onClick={() => setActiveTab('slider')} className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'slider' ? 'border-forest text-forest' : 'border-transparent text-text-muted hover:text-text-dark'}`}>Hero Slider</button>
           <button onClick={() => setActiveTab('content')} className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'content' ? 'border-forest text-forest' : 'border-transparent text-text-muted hover:text-text-dark'}`}>Content Blocks</button>
        </div>

        <div className="p-6 md:p-10 min-h-[50vh]">
          {activeTab === 'slider' && (
             <div className="flex flex-col gap-6">
                <button className="self-end bg-forest text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-deep transition-colors">Add New Slide</button>
                
                {loading ? (
                   <p className="text-center font-light mt-10">Loading slides...</p>
                ) : slides.length === 0 ? (
                   <p className="text-center font-light mt-10">No live slides found.</p>
                ) : slides.map(slide => (
                   <div key={slide.id} className="border border-cream-dark rounded-xl p-4 flex flex-col md:flex-row gap-6 items-start hover:bg-cream-warm transition-colors group relative">
                      <img src={slide.image_url} alt="" className="w-full md:w-48 h-32 object-cover rounded-lg bg-cream" />
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-text-muted bg-cream px-2 py-1 rounded">Slide {slide.sort_order}</span>
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${slide.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{slide.is_active ? 'Active' : 'Draft'}</span>
                        </div>
                        <h3 className="font-display text-xl leading-tight" dangerouslySetInnerHTML={{__html: slide.title}} />
                        <p className="text-text-muted text-sm line-clamp-2">{slide.subtitle}</p>
                      </div>
                      <div className="flex flex-col gap-2 self-start md:self-stretch justify-center pl-4 md:border-l border-cream-dark">
                         <button className="text-xs font-medium text-forest hover:underline p-1">Edit</button>
                         <button onClick={() => handleDelete(slide.id)} className="text-xs font-medium text-terracotta hover:underline p-1">Delete</button>
                      </div>
                   </div>
                ))}
             </div>
          )}

          {activeTab === 'content' && (
             <div className="flex flex-col gap-6 max-w-3xl">
                <div>
                   <label className="text-sm font-medium mb-2 block">CTA Headline</label>
                   <input type="text" className="w-full p-3 bg-cream border border-cream-dark rounded-lg focus:outline-forest" defaultValue="Ready to trade with **confidence**?" />
                </div>
                <div>
                   <label className="text-sm font-medium mb-2 block">About Purpose Text</label>
                   <textarea rows={4} className="w-full p-3 bg-cream border border-cream-dark rounded-lg focus:outline-forest" defaultValue="Born in the UAE — a global crossroads of trade — HARVEN exists to connect the world's finest producers with markets that demand quality, reliability, and scale." />
                </div>
                <div>
                   <label className="text-sm font-medium mb-2 block">Vision Quote</label>
                   <textarea rows={3} className="w-full p-3 bg-cream border border-cream-dark rounded-lg focus:outline-forest" defaultValue='"A supply chain is only as strong as its **integrity**. At Harven, we guarantee ours."' />
                </div>
                <button className="bg-forest text-white px-6 py-3 rounded-lg text-sm font-medium w-full sm:w-auto self-start mt-4">Save Content Blocks</button>
             </div>
          )}
        </div>
      </div>
    </>
  )
}
