"use client";

import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LayoutDashboard, FileText, Image as ImageIcon, Box, Bot, Inbox, Settings, Terminal } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    newToday: 0,
    activeLandingPages: 0,
    chatbotInteractions: 45 // Keeping this as a placeholder or could fetch if table exists
  })
  const [recentInquiries, setRecentInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      
      // 1. Fetch Total Inquiries
      const { count: totalCount, error: totalErr } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
      
      // 2. Fetch New Today
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const { count: newCount, error: newErr } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString())

      // 3. Fetch Active Landing Pages
      const { count: lpCount, error: lpErr } = await supabase
        .from('landing_pages')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true)

      // 4. Fetch Recent Inquiries
      const { data: inquiries, error: inqErr } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (totalErr || newErr || lpErr || inqErr) {
        console.error("Supabase Error:", { totalErr, newErr, lpErr, inqErr })
        // If the URL is mock, it will fail here.
        if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('mock')) {
           setError("Connected to Mock Database. Please configure Supabase environment variables.")
        } else {
           setError("Failed to fetch dashboard data. Check database connection.")
        }
      }

      setStats({
        totalInquiries: totalCount || 0,
        newToday: newCount || 0,
        activeLandingPages: lpCount || 0,
        chatbotInteractions: 0 // Placeholder
      })

      if (inquiries) setRecentInquiries(inquiries)

    } catch (err) {
      console.error(err)
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const statConfig = [
    { title: 'Total Inquiries', val: stats.totalInquiries.toString(), icon: '📥', color: 'bg-blue-50 text-blue-600' },
    { title: 'New Today', val: stats.newToday.toString(), icon: '⚡', color: 'bg-green-50 text-green-600' },
    { title: 'Active Landing Pages', val: stats.activeLandingPages.toString(), icon: '📄', color: 'bg-purple-50 text-purple-600' },
    { title: 'Chatbot Interactions', val: stats.chatbotInteractions.toString(), icon: '🤖', color: 'bg-orange-50 text-orange-600' },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-text-dark">Overview</h1>
        <p className="text-text-muted mt-2">Welcome back to the HARVEN trading platform administrator panel.</p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-terracotta/10 border border-terracotta/20 rounded-xl text-terracotta flex items-center gap-3">
          <Terminal size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statConfig.map(s => (
          <div key={s.title} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-start justify-between">
            <div>
              <div className="text-sm text-text-muted mb-1 font-medium">{s.title}</div>
              <div className="text-3xl font-bold text-text-dark">
                {loading ? <span className="opacity-20 animate-pulse">...</span> : s.val}
              </div>
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
          <a href="/admin/inquiries" className="text-sm text-forest hover:underline">View All</a>
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
              {loading ? (
                <tr><td colSpan={6} className="text-center py-10 opacity-40">Fetching recent inquiries...</td></tr>
              ) : recentInquiries.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10">No recent inquiries found.</td></tr>
              ) : recentInquiries.map((row, i) => (
                <tr key={i} className="border-b border-black/5 hover:bg-cream/30">
                  <td className="px-6 py-4 text-text-dark font-medium">{row.company || 'N/A'}</td>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-6 py-4">{row.product_interest}</td>
                  <td className="px-6 py-4">
                    <span className="bg-cream px-2 py-1 rounded text-xs border border-cream-dark uppercase text-[10px]">
                      {row.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === 'new' ? 'bg-orange-100 text-orange-700' : 
                      row.status === 'responded' ? 'bg-blue-100 text-blue-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(row.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
