import React from 'react'
import { twMerge } from 'tailwind-merge'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'available' | 'incoming' | 'neutral'
  children: React.ReactNode
}

export function Badge({ variant = 'neutral', className, children, ...props }: BadgeProps) {
  const baseStyles = "font-mono text-[0.52rem] px-3 py-1 rounded-full tracking-[0.08em] uppercase backdrop-blur-md"
  
  const variants = {
    available: "bg-forest/85 text-[#C8E6B8]",
    incoming: "bg-terracotta/85 text-[#FFD4B8]",
    neutral: "bg-black/40 text-white"
  }

  return (
    <span className={twMerge(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  )
}
