"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'

export default function LandingPagesList() {
  const [pages, setPages] = useState<any[]>([])

  useEffect(() => {
    // Mock Fetch
    setPages([
      { id: '1', title: 'Premium Black Pepper Offer', slug: 'premium-black-pepper', status: 'Published', date: '2024-05-15' },
      { id: '2', title: 'Q3 White Rice Bulk Run', slug: 'white-rice-bulk', status: 'Draft', date: '2024-05-16' },
    ])
  }, [])

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text-dark">Landing Pages</h1>
          <p className="text-text-muted mt-2">Create customizable marketing pages for specific stock or offers.</p>
        </div>
        <Link href="/admin/landing-pages/new">
          <Button variant="primary" className="py-2.5 px-6"><Plus size={16} /> Create Page</Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-muted">
            <thead className="bg-cream/50 font-medium text-text-dark border-b border-black/5">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">URL Slug</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((row) => (
                <tr key={row.id} className="border-b border-black/5 hover:bg-cream/30 transition-colors">
                  <td className="px-6 py-4 text-text-dark font-medium">{row.title}</td>
                  <td className="px-6 py-4 font-mono text-xs">/{row.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{row.date}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2 px-6">
                     <Link href={`/admin/landing-pages/${row.id}`} className="p-2 text-text-muted hover:text-forest transition-colors rounded-lg hover:bg-cream"><Edit size={16} /></Link>
                     {row.status === 'Published' && (
                       <Link href={`/${row.slug}`} target="_blank" className="p-2 text-text-muted hover:text-forest transition-colors rounded-lg hover:bg-cream"><ExternalLink size={16} /></Link>
                     )}
                     <button className="p-2 text-text-muted hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages.length === 0 && (
          <div className="p-12 text-center text-text-muted">No landing pages found.</div>
        )}
      </div>
    </>
  )
}
