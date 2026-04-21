import React from 'react'
import { ArrowRight } from 'lucide-react'

interface DownloadButtonProps {
  href: string
  label?: string
  className?: string
}

export function DownloadButton({ href, label = 'Download Brand Profile', className = '' }: DownloadButtonProps) {
  return (
    <a 
      href={href} 
      download
      className={`inline-flex items-center gap-2 text-sm font-medium transition-all group/link ${className}`}
    >
      {label} <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
    </a>
  )
}
