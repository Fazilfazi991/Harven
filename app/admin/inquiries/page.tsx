"use client";

import React, { useState } from 'react'

export default function InquiriesCMS() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text-dark">Inquiries Inbox</h1>
          <p className="text-text-muted mt-2">Manage wholesale requests from the chatbot, contact form, and landing pages.</p>
        </div>
        <button className="px-6 py-2.5 rounded-lg border border-cream-dark bg-white text-sm font-medium hover:bg-cream transition-colors text-text-dark">
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[60vh]">
         {/* List View */}
         <div className="w-full md:w-1/2 lg:w-2/5 border-r border-cream-dark flex flex-col">
           <div className="p-4 border-b border-cream-dark bg-cream-warm flex gap-2">
             <input type="text" placeholder="Search inquiries..." className="p-2 text-sm w-full bg-white border border-black/10 rounded focus:outline-forest" />
           </div>
           <div className="overflow-y-auto flex-1 h-[600px] bg-white">
             {/* Inquiry Card List Mock */}
             {[1,2,3,4,5].map((i) => (
               <div key={i} className={`p-4 border-b border-cream-dark cursor-pointer transition-colors ${i === 1 ? 'bg-forest/5 border-l-4 border-l-forest' : 'hover:bg-cream/50'}`}>
                 <div className="flex justify-between items-start mb-1">
                   <h4 className="font-semibold text-text-dark text-sm">John Smith Trading LLC</h4>
                   <span className="text-xs text-text-muted">Just now</span>
                 </div>
                 <div className="text-xs text-text-muted mb-2 line-clamp-1">Need 1 FCL Black Pepper...</div>
                 <div className="flex justify-between items-center mt-2">
                   <span className="bg-cream px-2 py-0.5 rounded text-[10px] font-mono uppercase text-text-muted border border-cream-dark/50">Chatbot</span>
                   {i === 1 && <span className="bg-orange-100 text-orange-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded">New</span>}
                 </div>
               </div>
             ))}
           </div>
         </div>

         {/* Detail View */}
         <div className="w-full md:w-1/2 lg:w-3/5 p-8 bg-cream-warm">
           <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm h-full">
              <div className="flex justify-between items-start border-b border-cream-dark pb-4 mb-6">
                 <div>
                   <h2 className="font-display text-2xl font-semibold text-text-dark">John Smith Trading LLC</h2>
                   <div className="text-sm text-text-muted mt-1">john@smithtrading.com • +971 50 111 2222</div>
                 </div>
                 <select className="p-2 text-sm bg-orange-100 text-orange-800 font-semibold border-none rounded outline-none cursor-pointer">
                    <option value="new">Status: New</option>
                    <option value="responded">Status: Responded</option>
                    <option value="closed">Status: Closed</option>
                 </select>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                 <div>
                   <div className="text-xs font-mono uppercase text-text-muted tracking-wide mb-1">Product Interest</div>
                   <div className="font-medium text-text-dark">Black Pepper</div>
                 </div>
                 <div>
                   <div className="text-xs font-mono uppercase text-text-muted tracking-wide mb-1">Quantity</div>
                   <div className="font-medium text-text-dark">1 FCL</div>
                 </div>
                 <div>
                   <div className="text-xs font-mono uppercase text-text-muted tracking-wide mb-1">Country / Region</div>
                   <div className="font-medium text-text-dark">United Arab Emirates</div>
                 </div>
                 <div>
                   <div className="text-xs font-mono uppercase text-text-muted tracking-wide mb-1">Source Path</div>
                   <div className="font-medium text-text-dark">/premium-black-pepper</div>
                 </div>
              </div>

              <div className="bg-cream p-4 rounded-xl border border-cream-dark">
                <div className="text-xs font-mono uppercase text-text-muted tracking-wide mb-2">Message Content</div>
                <p className="text-sm text-text-dark leading-relaxed font-light">
                  Hi, we are looking for 1 FCL of Premium Black Pepper. Please share exact specs including ASTA color value and moisture content. We can sign a long term contract if quality is good. Thanks.
                </p>
              </div>
           </div>
         </div>
      </div>
    </>
  )
}
