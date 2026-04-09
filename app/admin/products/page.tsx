"use client";

import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ProductsCMS() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from('products').select('*').order('sort_order')
      if (data) setProducts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
       const supabase = createClient()
       await supabase.from('products').delete().eq('id', id)
       fetchProducts()
    } catch (err) {
       console.error(err)
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text-dark">Products Manager</h1>
          <p className="text-text-muted mt-2">Add or edit product categories shown on the main products grid.</p>
        </div>
        <button className="bg-forest text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-forest-deep transition-colors">
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-muted">
            <thead className="bg-cream/50 font-medium text-text-dark border-b border-black/5">
              <tr>
                <th className="px-6 py-4 w-12">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-10">Loading products from database...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10">No products found. Run seed.sql to populate!</td></tr>
              ) : products.map((row, i) => (
                <tr key={i} className="border-b border-black/5 hover:bg-cream/30 transition-colors">
                  <td className="px-6 py-4">
                     {row.image_url ? <img src={row.image_url} alt="" className="w-10 h-10 rounded-full object-cover shadow-sm bg-white" /> : <div className="w-10 h-10 rounded-full bg-cream" />}
                  </td>
                  <td className="px-6 py-4 text-text-dark font-medium">{row.name}</td>
                  <td className="px-6 py-4">{row.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {(row.tags || []).map((t: string) => <span key={t} className="bg-cream px-2 py-0.5 border border-cream-dark rounded text-xs text-text-mid">{t}</span>)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {row.is_active ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3 px-6">
                     <button className="text-forest hover:opacity-70 font-medium py-2 transition-opacity">Edit</button>
                     <button onClick={() => handleDelete(row.id)} className="text-terracotta hover:opacity-70 font-medium py-2 transition-opacity">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
