"use client";

import React, { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return
    
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
           messages: [...messages, { role: 'user', content: userMsg }],
           pageContext: window.location.pathname
        })
      })
      const data = await res.json()
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else if (data.error) {
         setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I am currently offline." }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error occurred." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl overflow-hidden z-[100] border border-black/5 flex flex-col"
          >
            <div className="bg-forest p-4 flex justify-between items-center text-white">
               <div>
                  <div className="font-semibold font-display tracking-wide">Harven Support</div>
                  <div className="text-[0.65rem] opacity-70 font-mono uppercase tracking-[0.1em] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 block animate-pulse" /> AI Trading Assistant
                  </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100 transition-opacity"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-cream-warm">
               {messages.length === 0 && (
                 <div className="text-center opacity-50 text-sm mt-4 font-light">
                   Hello! I can answer questions regarding HARVEN commodities, verify standard specs, or assist with wholesale contracts.
                 </div>
               )}
               {messages.map((m, i) => (
                 <div key={i} className={`max-w-[85%] p-3 rounded-xl text-[0.85rem] ${m.role === 'user' ? 'bg-sage-light text-forest-deep self-end rounded-tr-sm' : 'bg-white border border-black/5 self-start rounded-tl-sm'}`}>
                   {m.content}
                 </div>
               ))}
               {isLoading && (
                 <div className="self-start max-w-[85%] p-3 rounded-xl text-[0.85rem] bg-white border border-black/5 rounded-tl-sm font-light text-text-muted">
                    Typing...
                 </div>
               )}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-cream-dark bg-white flex gap-2">
               <input 
                 type="text" 
                 value={input} 
                 onChange={e => setInput(e.target.value)} 
                 placeholder="Ask about bulk pricing..." 
                 className="flex-1 bg-cream-warm border border-transparent focus:border-sage focus:outline-none rounded-lg px-3 text-[0.85rem]"
               />
               <button type="submit" className="bg-forest text-white p-2.5 rounded-lg hover:bg-forest-deep transition-colors" disabled={isLoading}>
                 <Send size={16} />
               </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-[60px] h-[60px] bg-forest text-white rounded-full shadow-[0_4px_20px_rgba(45,90,61,0.3)] flex items-center justify-center z-[100] transition-transform hover:scale-110 active:scale-95"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </>
  )
}
