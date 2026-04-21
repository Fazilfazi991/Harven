import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ChatbotWidget } from '@/components/ui/ChatbotWidget'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ChatbotWidget />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  )
}
