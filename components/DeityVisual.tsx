'use client';

import React, { useState } from 'react';

interface DeityVisualProps {
  slug: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
}

export default function DeityVisual({ slug, size = 'md', className = '', alt }: DeityVisualProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  const getDeityFallback = (s: string) => {
    switch (s) {
      case 'lord-shiva':
        return { name: 'Lord Shiva', border: 'border-blue-400/40' };
      case 'ayyappa-swamy':
        return { name: 'Swami Ayyappa', border: 'border-amber-400/50' };
      case 'lord-venkateswara':
        return { name: 'Lord Venkateswara', border: 'border-gold-radiant/60' };
      case 'lord-hanuman':
        return { name: 'Lord Hanuman', border: 'border-orange-500/50' };
      case 'sri-rama':
        return { name: 'Sri Rama', border: 'border-emerald-400/50' };
      case 'durga-devi':
        return { name: 'Durga Devi', border: 'border-rose-400/50' };
      case 'lord-krishna':
        return { name: 'Lord Krishna', border: 'border-cyan-400/50' };
      case 'lord-ganesha':
      default:
        return { name: 'Lord Ganesha', border: 'border-yellow-400/50' };
    }
  };

  const info = getDeityFallback(slug);
  const imagePath = `/assets/deities/${slug}.png`;

  return (
    <div
      className={`relative flex items-center justify-center ${sizeClasses[size]} rounded-2xl overflow-hidden border ${info.border} bg-obsidian-secondary shadow-gold-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-gold-md ${className}`}
    >
      {/* Outer subtle gold accent ring */}
      <div className="absolute inset-0 rounded-2xl border border-gold-antique/30 pointer-events-none z-10" />

      {/* Radiant Glow on hover */}
      <div className="absolute inset-0 bg-gold-radiant/15 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

      {/* Real Deity Sacred Image */}
      <img
        src={imagePath}
        alt={alt || info.name}
        className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
