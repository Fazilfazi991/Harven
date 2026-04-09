"use client";

import React, { useState } from 'react'

export default function ProductsCMS() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text-dark">Products Manager</h1>
          <p className="text-text-muted mt-2">Add or edit product categories shown on the main products grid.</p>
        </div>
        <button className="bg-forest text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-forest-deep transition-colors">
          Add Product Category
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-muted">
            <thead className="bg-cream/50 font-medium text-text-dark border-b border-black/5">
              <tr>
                <th className="px-6 py-4 w-12"></th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Black Pepper', icon: '🌶️', cat: 'Spices', tags: ['High ASTA', 'Cleaned'], active: true },
                { name: 'White Rice', icon: '🌾', cat: 'Grains', tags: ['5% Broken'], active: true },
                { name: 'Almonds', icon: '🌰', cat: 'Dry Fruits', tags: ['California'], active: true },
              ].map((row, i) => (
                <tr key={i} className="border-b border-black/5 hover:bg-cream/30 transition-colors">
                  <td className="px-6 py-4 text-2xl">{row.icon}</td>
                  <td className="px-6 py-4 text-text-dark font-medium">{row.name}</td>
                  <td className="px-6 py-4">{row.cat}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {row.tags.map(t => <span key={t} className="bg-cream px-2 py-0.5 rounded text-xs">{t}</span>)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {row.active ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2 px-6">
                     <button className="text-forest hover:underline font-medium p-2">Edit</button>
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
