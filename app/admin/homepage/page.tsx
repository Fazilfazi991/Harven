"use client";

import React, { useState } from 'react'

export default function HomepageCMS() {
  const [activeTab, setActiveTab] = useState('slider')

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
                <div className="border border-cream-dark rounded-xl p-4 flex flex-col md:flex-row gap-6 items-start hover:bg-cream-warm transition-colors cursor-pointer group relative">
                   <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=60" alt="" className="w-full md:w-48 h-32 object-cover rounded-lg" />
                   <div className="flex-1 flex flex-col gap-2">
                     <div className="flex items-center gap-3">
                       <span className="font-mono text-[0.6rem] uppercase tracking-widest text-text-muted bg-cream px-2 py-1 rounded">Slide 1</span>
                       <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-medium">Active</span>
                     </div>
                     <h3 className="font-display text-xl leading-tight"><strong>Sourcing</strong> the <em>World's Best.</em></h3>
                     <p className="text-text-muted text-sm line-clamp-2">It is trust. It is consistency. It is a promise that travels across borders.</p>
                   </div>
                </div>
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
