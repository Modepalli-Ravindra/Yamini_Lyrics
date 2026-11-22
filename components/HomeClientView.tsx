'use client';

import React from 'react';
import Link from 'next/link';
import { Category, Song } from '@/lib/types';
import DeityCard from './DeityCard';
import HomeSearch from './HomeSearch';
import { BookOpen, FileDown, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HomeClientViewProps {
  categories: Category[];
  songs: Song[];
}

export default function HomeClientView({ categories, songs }: HomeClientViewProps) {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-12 sm:space-y-20">
      
      {/* Hero Section: Highlight Yamini Lyrics Sacred Logo (NO Lord Image) */}
      <section className="relative pt-6 sm:pt-14 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Pure Celestial Obsidian & Radiant Golden Nebula Background - Zero Deity Images */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Radiant Golden Glow Nebulas */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[450px] bg-gradient-to-br from-gold-radiant/20 via-gold-antique/10 to-transparent rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute -bottom-10 left-1/4 w-[500px] h-[350px] bg-gold-radiant/12 rounded-full blur-[130px] pointer-events-none" />
          
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/40 to-obsidian" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Regal Typography & Search */}
          <div className="lg:col-span-7 text-left space-y-4 sm:space-y-6">
            
            {/* Sacred Gold Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gold-radiant/15 border border-gold-radiant/40 text-gold-radiant text-[11px] sm:text-xs font-semibold tracking-wider uppercase shadow-gold-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-radiant" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Regal Heading - Mobile Friendly */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] font-cinzel">
              {t('hero.titlePart1')}{' '}
              <span className="text-transparent bg-clip-text bg-gold-gradient drop-shadow-sm">
                {t('hero.titleHighlight')}
              </span>{' '}
              {t('hero.titlePart2')}
            </h1>

            <p className="text-xs sm:text-sm text-gold-champagne/80 font-sans leading-relaxed max-w-xl">
              {t('hero.subtitle')}
            </p>

            {/* Live Instant Search Bar */}
            <div className="pt-1">
              <HomeSearch initialSongs={songs} />
            </div>

            {/* Quick Deity Filter Pills - Horizontal Scroll on Mobile */}
            <div className="pt-1">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
                <span className="text-gold-champagne/70 font-semibold uppercase tracking-wider shrink-0 text-[11px]">
                  {t('hero.popular')}
                </span>
                {categories.slice(0, 6).map((c) => (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full bg-obsidian-secondary/90 border border-obsidian-border hover:border-gold-radiant/60 hover:text-white transition-all duration-200 text-[11px] sm:text-xs font-medium text-gold-champagne/85 hover:shadow-gold-sm"
                  >
                    <span>{language === 'te' ? (c.name_telugu || c.name_english) : c.name_english}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Highlight Yamini Lyrics Sacred Emblem Logo (NO Lord Image) */}
          <div className="lg:col-span-5 flex justify-center pt-2 lg:pt-0">
            <div className="relative group w-full max-w-xs sm:max-w-sm flex flex-col items-center">
              
              {/* Multi-Layer Divine Golden Light Halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold-radiant/35 via-gold-antique/20 to-gold-radiant/35 blur-3xl opacity-85 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Luminous Brand Emblem Presentation */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-3.5 sm:space-y-4">
                
                {/* Glowing Golden Medallion with Yamini Lyrics Emblem */}
                <div className="relative w-44 h-44 sm:w-60 sm:h-60 rounded-full p-2 bg-gradient-to-tr from-gold-radiant via-gold-antique/50 to-gold-radiant/80 shadow-gold-lg group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-obsidian border-2 border-gold-antique/60 relative p-2 flex items-center justify-center">
                    <img
                      src="/assets/logo.png"
                      alt="Yamini Lyrics Sacred Emblem"
                      className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(245,158,11,0.5)] transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Captions & Brand Information */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-gold-radiant tracking-widest uppercase font-cinzel block px-3 py-0.5 rounded-full bg-gold-radiant/10 border border-gold-radiant/30 mx-auto w-fit">
                    {t('hero.featuredBadge')}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-cinzel tracking-wide">
                    Yamini <span className="text-gold-radiant">Lyrics</span>
                  </h3>
                  
                  <p className="text-xs text-gold-champagne/80 font-sans max-w-xs leading-relaxed">
                    {t('hero.featuredDesc')}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/#categories"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-radiant to-gold-antique text-obsidian text-xs sm:text-sm font-bold hover:brightness-110 transition-all shadow-gold-sm hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4 text-obsidian" />
                      <span>{t('hero.featuredBtn')}</span>
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Deity Collections Grid - 2 COLUMNS ON MOBILE for Great UX */}
      <section id="categories" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-obsidian-border">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-gold-radiant uppercase tracking-wider block mb-0.5 font-cinzel">
              {t('deities.heading')}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-cinzel">
              {language === 'en' ? 'Browse Stotram Collections' : 'దైవ స్తోత్ర సేకరణలు'}
            </h2>
          </div>
          <span className="text-xs text-gold-champagne/70 hidden sm:inline font-sans">
            {categories.length} {language === 'en' ? 'Holy Folders' : 'పవిత్ర ఫోల్డర్లు'}
          </span>
        </div>

        {/* 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {categories.map((cat) => (
            <DeityCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Trending & Popular Sacred Songs */}
      <section id="trending" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-obsidian-border">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-gold-radiant uppercase tracking-wider block mb-0.5 font-cinzel">
              {language === 'en' ? 'Daily Practice' : 'నిత్య పారాయణ'}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-cinzel">
              {t('popular.heading')}
            </h2>
          </div>
          <Link
            href="/#categories"
            className="flex items-center gap-1 text-xs text-gold-radiant hover:text-white transition-colors font-semibold group uppercase tracking-wider"
          >
            <span>{language === 'en' ? 'All Deities' : 'సకల దేవుళ్లు'}</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {songs.map((song) => (
            <div
              key={song.id}
              className="flex flex-col justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-card-gradient border border-obsidian-border hover:border-gold-radiant/60 transition-all duration-300 hover:shadow-gold-md hover:-translate-y-1 group overflow-hidden relative backdrop-blur-md"
            >
              <div>
                {/* Deity Tag & View Stats */}
                <div className="flex items-center justify-between text-xs mb-2.5 sm:mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-radiant/10 border border-gold-radiant/30 text-gold-radiant text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
                    <img
                      src={`/assets/deities/${song.category_slug}.png`}
                      alt={song.category_name_english || ''}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full object-cover border border-gold-radiant/50"
                    />
                    <span>{language === 'te' ? (song.category_name_telugu || song.category_name_english) : song.category_name_english}</span>
                  </span>
                  
                  <div className="flex items-center gap-1 text-gold-champagne/60 text-[10px] sm:text-[11px] font-sans">
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-antique" />
                    <span>{song.view_count || 0}</span>
                  </div>
                </div>

                {/* Song Titles */}
                <Link href={`/song/${song.slug}`} className="block group-hover:text-gold-radiant transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-gold-radiant transition-colors font-cinzel line-clamp-1 mb-1">
                    {language === 'te' ? song.title_telugu : song.title_roman}
                  </h3>
                  {song.title_english && (
                    <p className="text-[11px] sm:text-xs text-gold-champagne/70 font-sans line-clamp-1 mb-2.5">
                      {song.title_english}
                    </p>
                  )}
                </Link>

                {/* Excerpt in Roman Telugu Chanting */}
                <div className="p-3 rounded-xl bg-obsidian/75 border border-obsidian-border text-xs text-stone-300 font-sans line-clamp-2 sm:line-clamp-3 leading-relaxed mb-3.5 group-hover:border-gold-antique/25 transition-colors">
                  {song.lyrics_roman.split('\n').slice(0, 3).join('\n')}
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <Link
                  href={`/song/${song.slug}`}
                  className="flex items-center gap-1 text-xs text-gold-radiant hover:text-white font-semibold transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Read Lyrics' : 'సాహిత్యం'}</span>
                </Link>

                <Link
                  href={`/song/${song.slug}`}
                  className="flex items-center gap-1 text-[11px] px-2.5 sm:px-3 py-1 rounded-xl bg-gradient-to-r from-gold-antique/15 to-gold-radiant/15 hover:from-gold-antique/30 hover:to-gold-radiant/30 border border-gold-antique/40 text-gold-champagne hover:text-white transition-all"
                >
                  <FileDown className="w-3 h-3 text-gold-radiant" />
                  <span>{language === 'en' ? 'Sacred PDF' : 'పవిత్ర PDF'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
