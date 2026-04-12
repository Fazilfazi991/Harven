"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Brands', href: '/signature-brands' },
    { name: 'Contact', href: '/contact', isCta: true }
  ]

  return (
    <>
      <nav className={twMerge(
        "fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isHome && !scrolled ? "py-4 lg:py-[1.4rem] bg-transparent border-b border-transparent" : "",
        !isHome && !scrolled ? "py-4 lg:py-[1.4rem] bg-cream/80 backdrop-blur-[24px] backdrop-saturate-[1.2] border-b border-black/5" : "",
        scrolled && isHome ? "py-3 lg:py-[0.8rem] bg-cream/95 backdrop-blur-[24px] border-b border-black/5 shadow-[0_2px_30px_rgba(0,0,0,0.04)]" : "",
        scrolled && !isHome ? "py-3 lg:py-[0.8rem] bg-cream/95 backdrop-blur-[24px] border-b border-black/5 shadow-[0_2px_30px_rgba(0,0,0,0.04)]" : ""
      )}>
        <Link href="/" className="group flex flex-col no-underline z-50">
          <div className={twMerge(
            "font-display text-2xl lg:text-[1.9rem] font-semibold tracking-[0.02em]",
            isHome && !scrolled && !mobileMenuOpen ? "text-white" : "text-forest-deep"
          )}>
            HARV<span className="text-terracotta italic">E</span>N
          </div>
          <small className={twMerge(
            "font-mono text-[0.4rem] lg:text-[0.48rem] font-normal tracking-[0.22em] uppercase",
            isHome && !scrolled && !mobileMenuOpen ? "text-white/50" : "text-text-muted"
          )}>
            SOURCING THE WORLD'S BEST
          </small>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-8 list-none items-center m-0 p-0">
          {links.map((item) => (
            <li key={item.name}>
              {item.isCta ? (
                <Link
                  href={item.href}
                  className={twMerge(
                    "px-[1.6rem] py-[0.6rem] rounded-full font-medium text-[0.78rem] tracking-[0.03em] transition-all duration-300 no-underline",
                    isHome && !scrolled 
                      ? "bg-white/15 border border-white/25 text-white backdrop-blur-md hover:bg-white/25 hover:-translate-y-[1px]" 
                      : "bg-forest text-white border-transparent hover:bg-forest-deep hover:-translate-y-[1px]"
                  )}
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className={twMerge(
                    "relative text-[0.82rem] font-normal tracking-[0.02em] py-[0.3rem] transition-colors no-underline",
                    isHome && !scrolled ? "text-white/80 hover:text-white" : "text-text-mid hover:text-forest-deep",
                    "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-terracotta after:transition-all after:duration-400 after:ease-[cubic-bezier(0.16,1,0.3,1)] after:rounded-sm hover:after:w-full"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        
        {/* Mobile Toggle Button */}
        <div 
          className="flex lg:hidden flex-col gap-[5px] cursor-pointer p-2 z-50 transition-transform active:scale-95"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
             <X size={28} className="text-forest-deep" />
          ) : (
            <>
              <span className={twMerge("w-6 h-[2px] rounded-sm transition-all duration-300", isHome && !scrolled ? "bg-white" : "bg-text-dark")} />
              <span className={twMerge("w-6 h-[2px] rounded-sm transition-all duration-300", isHome && !scrolled ? "bg-white" : "bg-text-dark")} />
              <span className={twMerge("w-6 h-[2px] rounded-sm transition-all duration-300", isHome && !scrolled ? "bg-white" : "bg-text-dark")} />
            </>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream flex flex-col pt-24 px-6 pb-8 lg:hidden overflow-y-auto"
          >
            <ul className="list-none p-0 flex flex-col gap-6 mt-8">
              {links.map((item) => (
                <li key={item.name} className="border-b border-cream-dark pb-4">
                  <Link 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={twMerge(
                      "font-display text-3xl transition-colors no-underline block",
                      item.isCta ? "text-terracotta font-semibold" : "text-forest-darker hover:text-forest"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8 border-t border-cream-dark">
               <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-text-muted mb-4">Contact HQ</div>
               <a href="tel:+971561625698" className="block text-forest font-medium text-[1.05rem] mb-1.5">+971 56 162 5698</a>
               <a href="tel:+971547226003" className="block text-forest font-medium text-[1.05rem] mb-3">+971 54 722 6003</a>
               <a href="mailto:harvenllc@gmail.com" className="block text-text-mid text-sm hover:text-terracotta transition-colors">harvenllc@gmail.com</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
