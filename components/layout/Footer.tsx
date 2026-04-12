import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-forest-darker pt-20 px-8 lg:px-16 pb-8 relative overflow-hidden text-white">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sage via-terracotta via-wheat to-transparent opacity-30" />
      
      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr_1fr_1fr] gap-12 mb-16 relative z-10">
        <div className="flex flex-col gap-5">
          <Link href="/" className="font-display text-[1.6rem] font-semibold text-white no-underline">
            HARV<span className="text-wheat italic">E</span>N
          </Link>
          <p className="text-white/30 text-[0.82rem] leading-[1.8] max-w-[280px] font-light">
            From farms to ports, harvest to wholesale — HARVEN connects the world's finest food producers with markets that demand quality, reliability, and scale.
          </p>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white/45 font-mono text-[0.58rem] tracking-[0.15em] uppercase mb-[1.4rem]">Sourcing</h4>
          <ul className="flex flex-col gap-[0.7rem] list-none p-0 m-0">
            <li><Link href="/products" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">All Products</Link></li>
            <li><Link href="/products?category=spices" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Spices</Link></li>
            <li><Link href="/products?category=grains" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Grains</Link></li>
            <li><Link href="/products?category=fresh" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Fresh Produce</Link></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white/45 font-mono text-[0.58rem] tracking-[0.15em] uppercase mb-[1.4rem]">Company</h4>
          <ul className="flex flex-col gap-[0.7rem] list-none p-0 m-0">
            <li><Link href="/about" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Our Story</Link></li>
            <li><Link href="/about#process" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Trading Process</Link></li>
            <li><Link href="/contact" className="text-white/30 text-[0.82rem] font-light no-underline transition-all hover:text-white hover:translate-x-1 inline-block">Careers</Link></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white/45 font-mono text-[0.58rem] tracking-[0.15em] uppercase mb-[1.4rem]">Contact</h4>
          <ul className="flex flex-col gap-[0.7rem] list-none p-0 m-0">
            <li><a href="mailto:harvenllc@gmail.com" className="text-white/30 text-[0.8rem] font-light no-underline transition-colors hover:text-white">harvenllc@gmail.com</a></li>
            <li><a href="tel:+971561625698" className="text-white/30 text-[0.8rem] font-light no-underline transition-colors hover:text-white">+971 56 162 5698</a></li>
            <li><a href="tel:+971547226003" className="text-white/30 text-[0.8rem] font-light no-underline transition-colors hover:text-white">+971 54 722 6003</a></li>
            <li className="text-white/30 text-[0.8rem] font-light mt-2">Dubai, UAE</li>
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
