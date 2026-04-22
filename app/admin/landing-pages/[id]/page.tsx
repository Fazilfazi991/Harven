"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { LandingPageEditor } from '@/components/admin/LandingPageEditor'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ExternalLink, Save, Loader2, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function EditLandingPage() {
  const { id } = useParams()
  const router = useRouter()
  const isNew = id === 'new'

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [pageData, setPageData] = useState<any>(null)

  useEffect(() => {
    if (isNew) return
    const fetchPage = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('landing_pages')
        .select('*')
        .eq('id', id)
        .single()
      
      if (data) {
        setPageData(data)
      } else {
        console.error("Error fetching landing page", error)
      }
      setLoading(false)
    }
    fetchPage()
  }, [id, isNew])

  const handleSave = async (data: any) => {
    setSaving(true)
    const supabase = createClient()
    
    if (isNew) {
      const { error } = await supabase.from('landing_pages').insert([data])
      if (error) {
        alert("Error creating page: " + error.message)
      } else {
        router.push('/admin/landing-pages')
      }
    } else {
      const { error } = await supabase.from('landing_pages').update(data).eq('id', id)
      if (error) {
        alert("Error updating page: " + error.message)
      } else {
        router.push('/admin/landing-pages')
      }
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this landing page?")) return
    setSaving(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('landing_pages').delete().eq('id', id)
      if (error) {
        alert("Error deleting page: " + error.message)
      } else {
        router.push('/admin/landing-pages')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center text-forest"><Loader2 className="animate-spin" size={32} /></div>
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <Link href="/admin/landing-pages" className="text-text-muted hover:text-forest inline-flex items-center gap-2 text-sm mb-4"><ArrowLeft size={14} /> Back to Pages</Link>
          <h1 className="font-display text-3xl font-semibold text-text-dark">{isNew ? 'Create Landing Page' : 'Edit Landing Page'}</h1>
        </div>
        <div className="flex gap-3">
          {!isNew && (
            <button 
              onClick={handleDelete}
              className="p-2.5 text-terracotta hover:bg-terracotta/5 border border-terracotta/20 rounded-lg transition-all"
              title="Delete Page"
              disabled={saving}
            >
              <Trash2 size={20} />
            </button>
          )}
          {!isNew && pageData?.slug && (
             <Link href={`/${pageData.slug}`} target="_blank">
               <Button variant="ghost" className="py-2.5 px-6 !text-forest border-forest hover:bg-forest/5">
                 <ExternalLink size={16} /> Preview Page
               </Button>
             </Link>
          )}
          <Button 
            variant="primary" 
            className="py-2.5 px-6" 
            type="submit" 
            form="landing-page-form"
            disabled={saving}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
      
      <LandingPageEditor initialData={pageData} onSave={handleSave} />
    </>
  )
}
