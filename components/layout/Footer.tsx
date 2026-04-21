import React from 'react'
import Link from 'next/link'

const InstagramIcon = ({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const FacebookIcon = ({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-forest-darker pt-20 px-8 lg:px-16 pb-8 relative overflow-hidden text-white">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sage via-terracotta via-wheat to-transparent opacity-30" />
      
      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr_1fr_1fr] gap-8 lg:gap-12 mb-12 lg:mb-16 relative z-10">
        <div className="flex flex-col gap-5">
          <Link href="/" className="no-underline">
            <img src="/images/logo-white.svg" alt="HARVEN" className="h-10 lg:h-14 w-auto object-contain transition-all" />
          </Link>
          <p className="text-white/30 text-[0.82rem] leading-[1.8] max-w-[280px] font-light">
            From farms to ports, harvest to wholesale — HARVEN connects the world's finest food producers with markets that demand quality, reliability, and scale.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://www.instagram.com/harven.llc" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
              <InstagramIcon size={20} />
            </a>
            <a href="https://www.facebook.com/harven.llc" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
              <FacebookIcon size={20} />
            </a>
            <a href="https://www.tiktok.com/@harvenllc" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.46-.12-.08-.24-.17-.35-.27V15a7.5 7.5 0 0 1-14.85 1.41A7.501 7.501 0 0 1 12.5 15V0h.025z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white/45 font-mono text-[0.58rem] tracking-[0.15em] uppercase mb-[0.8rem] lg:mb-[1.4rem]">Sourcing</h4>
          <ul className="flex flex-col gap-[0.5rem] lg:gap-[0.7rem] list-none p-0 m-0">
            <li><Link href="/products" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">All Products</Link></li>
            <li><Link href="/products?category=spices" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Spices</Link></li>
            <li><Link href="/products?category=grains" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Grains</Link></li>
            <li><Link href="/products?category=fresh" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Fresh Produce</Link></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white/45 font-mono text-[0.58rem] tracking-[0.15em] uppercase mb-[0.8rem] lg:mb-[1.4rem]">Company</h4>
          <ul className="flex flex-col gap-[0.5rem] lg:gap-[0.7rem] list-none p-0 m-0">
            <li><Link href="/about" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Our Promise</Link></li>
            <li><Link href="/about#process" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Trading Process</Link></li>
            <li><Link href="/contact" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Careers</Link></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white/45 font-mono text-[0.58rem] tracking-[0.15em] uppercase mb-[0.8rem] lg:mb-[1.4rem]">Contact</h4>
          <ul className="flex flex-col gap-[0.5rem] lg:gap-[0.7rem] list-none p-0 m-0">
            <li><a href="mailto:harvenllc@gmail.com" className="text-white/30 text-[0.8rem] font-light no-underline transition-colors hover:text-white">harvenllc@gmail.com</a></li>
            <li><a href="tel:+971561625698" className="text-white/30 text-[0.8rem] font-light no-underline transition-colors hover:text-white">+971 56 162 5698</a></li>
            <li><a href="tel:+971547226003" className="text-white/30 text-[0.8rem] font-light no-underline transition-colors hover:text-white">+971 54 722 6003</a></li>
            <li className="text-white/30 text-[0.8rem] font-light mt-1">Dubai, UAE</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 pt-8 flex justify-between items-center flex-wrap gap-4 relative z-10">
        <p className="text-white/20 text-[0.7rem] font-mono tracking-[0.03em] mb-0">
          © {new Date().getFullYear()} HARVEN LLC. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-white/20 text-[0.7rem] font-mono tracking-[0.03em] no-underline hover:text-white/40 transition-colors">PRIVACY POLICY</Link>
          <Link href="/admin" className="text-white/20 text-[0.7rem] font-mono tracking-[0.03em] no-underline hover:text-white/40 transition-colors">STAFF LOGIN</Link>
        </div>
      </div>
    </footer>
  )
}
