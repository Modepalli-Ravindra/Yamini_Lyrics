'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-obsidian/95 border-b border-obsidian-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20">
          
          {/* Logo & Luxury Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-gold-radiant/25 via-gold-antique/15 to-transparent border border-gold-antique/50 group-hover:border-gold-radiant transition-all duration-300 shadow-gold-sm overflow-hidden p-0.5">
              <img
                src="/assets/logo.png"
                alt="Yamini Lyrics Emblem Logo"
                className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-2xl font-bold tracking-tight text-white font-cinzel">
                  Yamini <span className="text-gold-radiant">Lyrics</span>
                </span>
                <span className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-gold-radiant/15 text-gold-radiant border border-gold-radiant/30 font-medium tracking-wider uppercase hidden xs:inline">
                  {t('nav.tagline')}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-gold-champagne/70 font-sans hidden md:inline tracking-wide">
                {t('nav.subtagline')}
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Clean English / Telugu toggled) */}
          <nav className="hidden md:flex items-center gap-1 bg-obsidian-secondary/80 p-1.5 rounded-full border border-obsidian-border shadow-inner">
            <Link
              href="/"
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                pathname === '/'
                  ? 'bg-gradient-to-r from-gold-radiant to-gold-antique text-obsidian shadow-gold-sm font-bold'
                  : 'text-gold-champagne/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/#categories"
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-gold-champagne/80 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {t('nav.deities')}
            </Link>
          </nav>

          {/* Right Action: Language Toggle & Admin Access */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Toggle: English (default) <-> Telugu */}
            <button
              onClick={toggleLanguage}
              title={language === 'en' ? 'Switch to Telugu (తెలుగు)' : 'Switch to English'}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-obsidian-secondary border border-gold-antique/40 hover:border-gold-radiant text-xs font-semibold text-gold-champagne hover:text-gold-radiant transition-all duration-200 shadow-gold-sm cursor-pointer select-none"
            >
              <Languages className="w-3.5 h-3.5 text-gold-radiant shrink-0" />
              <span className="font-mono text-xs">
                {language === 'en' ? (
                  <>
                    <strong className="text-gold-radiant">EN</strong>
                    <span className="text-gold-champagne/40 mx-0.5 sm:mx-1">|</span>
                    <span className="text-gold-champagne/70">తె</span>
                  </>
                ) : (
                  <>
                    <span className="text-gold-champagne/70">EN</span>
                    <span className="text-gold-champagne/40 mx-0.5 sm:mx-1">|</span>
                    <strong className="text-gold-radiant">తె</strong>
                  </>
                )}
              </span>
            </button>

            {/* Admin Studio Protected Access */}
            <Link
              href="/admin/login"
              className="group flex items-center gap-1.5 sm:gap-2 p-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gold-antique/10 hover:bg-gold-antique/20 border border-gold-antique/30 hover:border-gold-radiant text-gold-champagne hover:text-gold-radiant text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-gold-sm"
              title="Admin Studio (PIN Protected)"
            >
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-radiant group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">{t('nav.admin')}</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
