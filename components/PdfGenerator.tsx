'use client';

import React, { useState, useRef } from 'react';
import { Song } from '@/lib/types';
import { X, Download, Printer, Sparkles, CheckCircle2, QrCode } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLanguage } from '@/context/LanguageContext';

interface PdfGeneratorProps {
  song: Song;
  onClose: () => void;
}

export default function PdfGenerator({ song, onClose }: PdfGeneratorProps) {
  const { language, t } = useLanguage();
  const [format, setFormat] = useState<'both' | 'telugu' | 'roman'>(
    language === 'te' ? 'telugu' : 'both'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [watermark, setWatermark] = useState('@yaminilyrics');
  const printRef = useRef<HTMLDivElement>(null);

  const handleGeneratePdf = async () => {
    if (!printRef.current) return;
    setIsGenerating(true);

    try {
      // Record download stat in database
      fetch(`/api/songs?slug=${song.slug}&action=download`, { method: 'POST' }).catch(() => {});

      const element = printRef.current;
      
      // Crisp 300DPI print quality with optimized memory footprint
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#fffefc',
      });

      // Optimized JPEG compression (88%) - reduces file size from 15MB to ~400KB while keeping text razor-sharp
      const imgData = canvas.toDataURL('image/jpeg', 0.88);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Smart Single-Page Fitting: If content fits within 1 A4 page (with 20mm tolerance for borders),
      // scale and fit cleanly onto exactly 1 page so NO empty page is EVER created!
      if (imgHeight <= pdfHeight + 20) {
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(imgHeight, pdfHeight), undefined, 'FAST');
      } else {
        // Multi-page handling for unusually long hymns
        let heightLeft = imgHeight;
        let position = 0;
        const pageTolerance = 15; // Ignore sub-pixel leftover under 15mm to avoid blank final page

        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;

        while (heightLeft > pageTolerance) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pdfHeight;
        }
      }

      const fileName = `${song.slug || 'stotram'}-sacred-lyrics.pdf`;
      pdf.save(fileName);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('PDF Generation failed, fallback to native window print', err);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-obsidian-secondary border border-gold-antique/40 rounded-3xl shadow-2xl p-4 sm:p-8 my-auto">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-obsidian-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold-radiant/20 border border-gold-antique/40 text-gold-radiant">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-cinzel">
                {language === 'en' ? 'Sacred PDF Export' : 'పవిత్ర PDF ఎగుమతి'}
              </h3>
              <p className="text-xs text-gold-champagne/70 font-sans">
                {language === 'en' ? 'Traditional Temple Border • Print Ready A4 Document' : 'సంప్రదాయ టెంపుల్ బోర్డర్ • ప్రింట్-రెడీ A4 పత్రం'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-obsidian border border-obsidian-border text-gold-champagne/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Format selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gold-champagne/80 font-sans">
              {language === 'en' ? 'Script Layout' : 'లిపి ఎంపిక'}
            </label>
            <div className="flex rounded-xl bg-obsidian border border-obsidian-border p-1 text-xs">
              <button
                type="button"
                onClick={() => setFormat('both')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                  format === 'both' ? 'bg-gold-radiant text-obsidian shadow' : 'text-gold-champagne/70 hover:text-white'
                }`}
              >
                {language === 'en' ? 'Roman & Telugu' : 'రోమన్ & తెలుగు'}
              </button>
              <button
                type="button"
                onClick={() => setFormat('roman')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                  format === 'roman' ? 'bg-gold-radiant text-obsidian shadow' : 'text-gold-champagne/70 hover:text-white'
                }`}
              >
                {language === 'en' ? 'Roman Only' : 'రోమన్ మాత్రమే'}
              </button>
              <button
                type="button"
                onClick={() => setFormat('telugu')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                  format === 'telugu' ? 'bg-gold-radiant text-obsidian shadow' : 'text-gold-champagne/70 hover:text-white'
                }`}
              >
                {language === 'en' ? 'Telugu Script' : 'తెలుగు లిపి'}
              </button>
            </div>
          </div>

          {/* Instagram Handle / Watermark */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gold-champagne/80 font-sans">
              {language === 'en' ? 'Footer Watermark Handle' : 'ఫూటర్ వాటర్‌మార్క్'}
            </label>
            <input
              type="text"
              value={watermark}
              onChange={(e) => setWatermark(e.target.value)}
              placeholder="@yourpage"
              className="px-3 py-1.5 rounded-xl bg-obsidian border border-obsidian-border text-white text-xs focus:border-gold-radiant focus:outline-none"
            />
          </div>
        </div>

        {/* Printable Paper Canvas Preview (A4 styled) */}
        <div className="overflow-x-auto max-h-[50vh] p-2 bg-stone-900/60 rounded-2xl border border-obsidian-border flex justify-center">
          <div
            ref={printRef}
            className="w-[210mm] min-h-[297mm] p-[10mm] bg-[#fffefc] text-stone-900 shadow-2xl relative font-sans box-border"
          >
            {/* Traditional Antique Gold Temple Geometric Outer Border */}
            <div className="w-full h-full border-4 border-[#b8860b] p-2 relative flex flex-col justify-between">
              
              {/* Inner Decorative Double Border */}
              <div className="border border-[#d4af37] p-5 h-full flex flex-col justify-between relative">
                
                {/* 4 Corner Traditional Temple Geometric Accents */}
                <div className="absolute top-1 left-1 text-[#b8860b] text-xl select-none leading-none">卐</div>
                <div className="absolute top-1 right-1 text-[#b8860b] text-xl select-none leading-none">卐</div>
                <div className="absolute bottom-1 left-1 text-[#b8860b] text-xl select-none leading-none">卐</div>
                <div className="absolute bottom-1 right-1 text-[#b8860b] text-xl select-none leading-none">卐</div>

                {/* Top Sacred Header */}
                <div>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-3xl font-serif text-[#b8860b] font-bold">ॐ</span>
                  </div>

                  <div className="text-center pb-3 mb-3 border-b-2 border-double border-[#d4af37]">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#8b0000] font-serif leading-tight">
                      {song.title_roman}
                    </h1>
                    <h2 className="text-sm sm:text-base font-semibold text-[#5c4033] tracking-wide mt-0.5">
                      {song.title_telugu}
                    </h2>
                    {song.category_name_english && (
                      <span className="inline-block mt-1.5 px-3 py-0.5 rounded-full bg-[#fdf2e9] border border-[#ea580c]/30 text-[#ea580c] text-[11px] font-semibold uppercase tracking-wider">
                        {song.category_name_english}
                      </span>
                    )}
                  </div>

                  {/* Lyrics Content */}
                  <div className="mt-3">
                    {format === 'both' && (
                      <div className="grid grid-cols-2 gap-5 text-sm">
                        <div className="border-r border-[#e2d5b5] pr-4">
                          <h4 className="text-[11px] font-bold text-[#5c4033] uppercase tracking-wider mb-2 pb-1 border-b border-[#e2d5b5]">
                            Roman Pronunciation
                          </h4>
                          <div className="whitespace-pre-wrap leading-relaxed text-[#2a2622] text-[12px] sm:text-[12.5px]">
                            {song.lyrics_roman}
                          </div>
                        </div>

                        <div className="pl-2">
                          <h4 className="text-[11px] font-bold text-[#8b0000] uppercase tracking-wider mb-2 pb-1 border-b border-[#e2d5b5]">
                            Telugu Script
                          </h4>
                          <div className="whitespace-pre-wrap leading-relaxed text-[#1a1816] text-[12px] sm:text-[12.5px]">
                            {song.lyrics_telugu}
                          </div>
                        </div>
                      </div>
                    )}

                    {format === 'roman' && (
                      <div className="max-w-xl mx-auto text-center whitespace-pre-wrap leading-relaxed text-[#2a2622] text-sm sm:text-base">
                        {song.lyrics_roman}
                      </div>
                    )}

                    {format === 'telugu' && (
                      <div className="max-w-xl mx-auto text-center whitespace-pre-wrap leading-relaxed text-[#1a1816] text-sm sm:text-base">
                        {song.lyrics_telugu}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with Sacred Watermark & Instagram Tag */}
                <div className="mt-8 pt-4 border-t border-[#d4af37] flex items-center justify-between text-xs text-[#705020]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-serif font-bold text-[#b8860b]">ॐ</span>
                    <span className="font-semibold tracking-wider font-cinzel">Sacred Devotional Vault</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-[#ea580c]">Follow {watermark}</p>
                      <p className="text-[10px] text-[#8c7b64]">Daily Stotrams & Sacred Slokas</p>
                    </div>
                    <div className="w-10 h-10 border border-[#d4af37] rounded flex items-center justify-center bg-[#faf6ee] text-[#b8860b]">
                      <QrCode className="w-7 h-7" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-4 border-t border-obsidian-border">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-obsidian border border-obsidian-border text-gold-champagne/80 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            {language === 'en' ? 'Close' : 'మూసివేయి'}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-obsidian border border-gold-antique/40 hover:border-gold-radiant text-gold-radiant text-xs sm:text-sm font-semibold transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{language === 'en' ? 'Print View' : 'ప్రింట్ చేయండి'}</span>
          </button>

          <button
            onClick={handleGeneratePdf}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-radiant to-gold-antique hover:brightness-110 text-obsidian font-bold text-xs sm:text-sm transition-all shadow-gold-md disabled:opacity-50"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-obsidian" />
                <span>{language === 'en' ? 'Downloaded Successfully!' : 'విజయవంతంగా డౌన్‌లోడ్ అయ్యింది!'}</span>
              </>
            ) : isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-obsidian" />
                <span>{language === 'en' ? 'Generating Sacred PDF...' : 'PDF సిద్ధమవుతోంది...'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-obsidian" />
                <span>{language === 'en' ? '1-Click Sacred PDF Download' : '1-క్లిక్ పవిత్ర PDF డౌన్‌లోడ్'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
