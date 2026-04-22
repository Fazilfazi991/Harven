"use client";

import React, { useState } from 'react'

export default function SettingsCMS() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;

  return (
    <>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-text-dark">Platform Settings</h1>
        <p className="text-text-muted mt-2">Manage backend integrations and global configurations.</p>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden p-6 md:p-10 mb-8">
        <h3 className="font-display text-xl font-semibold text-forest-darker mb-6 border-b border-cream-dark pb-2">Global Notifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
           <div className="flex flex-col gap-2">
             <label className="text-sm font-medium">Primary Receiving Email</label>
             <input type="email" className="p-3 bg-cream border border-cream-dark rounded-lg focus:outline-forest" defaultValue="harvenllc@gmail.com" />
           </div>
           <div className="flex flex-col gap-2">
             <label className="text-sm font-medium">WhatsApp Business Number</label>
             <input type="text" className="p-3 bg-cream border border-cream-dark rounded-lg focus:outline-forest" defaultValue="+971501234567" />
           </div>
        </div>
        <button className="bg-forest text-white px-6 py-3 rounded-lg text-sm font-medium mt-6 hover:bg-forest-deep transition-colors">Save Integrations</button>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden p-6 md:p-10">
        <h3 className="font-display text-xl font-semibold text-forest-darker mb-6 border-b border-cream-dark pb-2">Admin Account</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
           <div className="flex flex-col gap-2">
             <label className="text-sm font-medium">Update Email</label>
             <input type="email" className="p-3 bg-cream border border-cream-dark rounded-lg focus:outline-forest" placeholder="New Email" />
           </div>
           <div className="flex flex-col gap-2">
             <label className="text-sm font-medium">Update Password</label>
             <input type="password" className="p-3 bg-cream border border-cream-dark rounded-lg focus:outline-forest" placeholder="••••••••" />
           </div>
        </div>
        <button className="px-6 py-3 rounded-lg text-sm font-medium mt-6 border border-terracotta text-terracotta hover:bg-terracotta/5 transition-colors">Update Credentials</button>
      </div>
    </>
  )
}
