"use client";

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { LandingPageEditor } from '@/components/admin/LandingPageEditor'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ExternalLink, Save } from 'lucide-react'

export default function EditLandingPage() {
  const { id } = useParams()
  const isNew = id === 'new'

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <Link href="/admin/landing-pages" className="text-text-muted hover:text-forest inline-flex items-center gap-2 text-sm mb-4"><ArrowLeft size={14} /> Back to Pages</Link>
          <h1 className="font-display text-3xl font-semibold text-text-dark">{isNew ? 'Create Landing Page' : 'Edit Landing Page'}</h1>
        </div>
        <div className="flex gap-3">
          {!isNew && (
             <Button variant="ghost" className="py-2.5 px-6 !text-forest border-forest hover:bg-forest/5"><ExternalLink size={16} /> Preview Page</Button>
          )}
          <Button variant="primary" className="py-2.5 px-6" onClick={() => alert("Mock Saving...")}><Save size={16} /> Save Changes</Button>
        </div>
      </div>
      
      <LandingPageEditor initialData={isNew ? null : {
        title: 'Premium Black Pepper Offer',
        slug: 'premium-black-pepper',
        meta_description: 'Top grade ASTA black pepper...',
        hero_headline: 'Premium Black Pepper — Now Available',
        hero_subtext: 'High ASTA, cleaned...',
        hero_badge: 'New Arrival',
        show_chatbot: true,
        show_inquiry_form: true,
        is_published: true,
        content_blocks: [
          { id: '1', type: 'text', content: '<p>Our latest shipment of Vietnam-origin Black Pepper has arrived.</p>' }
        ]
      }} />
    </>
  )
}
