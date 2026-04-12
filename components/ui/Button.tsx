import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'white' | 'outline-dark'
  children: React.ReactNode
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full font-medium text-[0.88rem] tracking-[0.02em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
  
  const variants = {
    primary: "bg-terracotta text-white px-9 py-4 shadow-[0_4px_20px_rgba(214,74,26,0.25)] hover:bg-[#b53c15] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(214,74,26,0.35)]",
    ghost: "border-[1.5px] border-white/30 text-white px-9 py-4 backdrop-blur-sm font-normal hover:border-white/60 hover:bg-white/10",
    white: "bg-white text-terracotta px-10 py-4 font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-cream hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
    'outline-dark': "border-[1.5px] border-forest text-forest px-11 py-[0.9rem] hover:bg-forest hover:text-white hover:-translate-y-0.5"
  }

  return (
    <button className={twMerge(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
