"use client";

import React from 'react'

export default function AdminDashboard() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-text-dark">Overview</h1>
        <p className="text-text-muted mt-2">Welcome back to the HARVEN trading platform administrator panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { title: 'Total Inquiries', val: '124', icon: '📥', color: 'bg-blue-50 text-blue-600' },
          { title: 'New Today', val: '8', icon: '⚡', color: 'bg-green-50 text-green-600' },
          { title: 'Active Landing Pages', val: '3', icon: '📄', color: 'bg-purple-50 text-purple-600' },
          { title: 'Chatbot Interactions', val: '45', icon: '🤖', color: 'bg-orange-50 text-orange-600' },
        ].map(s => (
          <div key={s.title} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-start justify-between">
            <div>
              <div className="text-sm text-text-muted mb-1 font-medium">{s.title}</div>
              <div className="text-3xl font-bold text-text-dark">{s.val}</div>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${s.color}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-black/5 flex justify-between items-center">
          <h3 className="font-medium text-text-dark">Recent Inquiries</h3>
          <button className="text-sm text-forest hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-muted">
            <thead className="bg-cream/50 font-medium text-text-dark border-b border-black/5">
              <tr>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { co: 'Global Foods LLC', name: 'John Smith', prod: 'Black Pepper', source: 'Chatbot', stat: 'New', date: 'Just now' },
                { co: 'EuroSpice Traders', name: 'Anna K.', prod: 'Green Cardamom', source: 'Landing Page', stat: 'Responded', date: '2 hrs ago' },
                { co: 'AgriCorp', name: 'David Lee', prod: 'White Rice', source: 'Contact Form', stat: 'Closed', date: 'Yesterday' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-black/5 hover:bg-cream/30">
                  <td className="px-6 py-4 text-text-dark font-medium">{row.co}</td>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-6 py-4">{row.prod}</td>
                  <td className="px-6 py-4"><span className="bg-cream px-2 py-1 rounded text-xs border border-cream-dark">{row.source}</span></td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.stat === 'New' ? 'bg-orange-100 text-orange-700' : row.stat === 'Responded' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {row.stat}
                    </span>
                  </td>
                  <td className="px-6 py-4">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
