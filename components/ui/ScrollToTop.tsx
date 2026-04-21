"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setIsVisible(scrollPercent >= 75);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-[190px] right-6 z-[997] group flex items-center justify-center w-14 h-14 rounded-full bg-white border border-cream-dark shadow-[0_8px_30px_rgba(45,90,61,0.12)] hover:bg-forest hover:border-forest hover:shadow-[0_12px_40px_rgba(45,90,61,0.25)] transition-all duration-300"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-forest/10 opacity-0 group-hover:opacity-100 scale-110 transition-all duration-300" />

          <ArrowUp
            size={18}
            className="relative z-10 text-forest group-hover:text-white transition-colors duration-300"
            strokeWidth={2.5}
          />

          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-2.5 py-1 bg-forest-darker text-white text-[0.65rem] font-mono uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
