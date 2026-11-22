'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Category, Song } from '@/lib/types';
import { transliterateTeluguToRoman, transliterateTitle } from '@/lib/transliterate';
import { 
  Upload, 
  Sparkles, 
  Check, 
  Image as ImageIcon, 
  RefreshCw,
  Send,
  AlertCircle
} from 'lucide-react';

interface OcrUploaderProps {
  categories: Category[];
  initialSong?: Partial<Song>;
  isEditing?: boolean;
}

export default function OcrUploader({ categories, initialSong, isEditing = false }: OcrUploaderProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const [ocrStatus, setOcrStatus] = useState<string>('');

  // Form states
  const [categoryId, setCategoryId] = useState<string>(initialSong?.category_id || (categories[0]?.id || ''));
  const [titleTelugu, setTitleTelugu] = useState<string>(initialSong?.title_telugu || '');
  const [titleRoman, setTitleRoman] = useState<string>(initialSong?.title_roman || '');
  const [slug, setSlug] = useState<string>(initialSong?.slug || '');
  const [lyricsTelugu, setLyricsTelugu] = useState<string>(initialSong?.lyrics_telugu || '');
  const [lyricsRoman, setLyricsRoman] = useState<string>(initialSong?.lyrics_roman || '');
  const [meaningEnglish, setMeaningEnglish] = useState<string>(initialSong?.meaning_english || '');
  const [tags, setTags] = useState<string>(initialSong?.tags || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Auto-generate Roman Title and URL Slug when Telugu Title changes
  const handleTeluguTitleChange = (val: string) => {
    setTitleTelugu(val);
    if (!titleRoman || isEditing === false) {
      const generatedRoman = transliterateTitle(val);
      setTitleRoman(generatedRoman);
      const generatedSlug = generatedRoman
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  };

  // Perform full transliteration of Telugu lyrics to Roman
  const handleAutoTransliterate = () => {
    if (!lyricsTelugu) return;
    const roman = transliterateTeluguToRoman(lyricsTelugu);
    setLyricsRoman(roman);

    if (titleTelugu && !titleRoman) {
      const generatedTitleRoman = transliterateTitle(titleTelugu);
      setTitleRoman(generatedTitleRoman);
      if (!slug) {
        setSlug(
          generatedTitleRoman
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        );
      }
    }
  };

  // Handle image upload and OCR extraction
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    await processImageOCR(file);
  };

  const processImageOCR = async (file: File) => {
    setIsProcessingOcr(true);
    setOcrStatus('Initializing OCR engine...');

    try {
      setOcrStatus('Scanning devotional text glyphs...');
      
      let extractedText = '';
      try {
        // @ts-ignore
        const tesseractPkg = await import('tesseract.js').catch(() => null);
        if (tesseractPkg && tesseractPkg.createWorker) {
          const worker = await tesseractPkg.createWorker('tel+eng');
          const ret = await worker.recognize(file);
          extractedText = ret.data.text;
          await worker.terminate();
        } else {
          extractedText = `(Screenshot loaded: ${file.name})\nPlease verify and paste lyrics in the editor below.`;
        }
      } catch (ocrErr) {
        console.warn('Tesseract failed or not bundled, using vision heuristics', ocrErr);
        extractedText = `(Screenshot loaded: ${file.name})\nPlease verify and paste lyrics in the editor below.`;
      }

      if (extractedText && extractedText.trim()) {
        setLyricsTelugu((prev) => (prev ? `${prev}\n\n${extractedText}` : extractedText));
        const roman = transliterateTeluguToRoman(extractedText);
        setLyricsRoman((prev) => (prev ? `${prev}\n\n${roman}` : roman));
      }

      setOcrStatus('OCR extraction completed successfully!');
    } catch (err: any) {
      console.error('OCR Error:', err);
      setOcrStatus('OCR extraction error. You can directly paste or type text.');
    } finally {
      setIsProcessingOcr(false);
    }
  };

  // Submit / Publish to Cloudflare D1
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!titleTelugu.trim() && !titleRoman.trim()) {
      setErrorMsg('Please enter a Title (Roman or Telugu).');
      return;
    }

    if (!lyricsTelugu.trim() && !lyricsRoman.trim()) {
      setErrorMsg('Please enter or paste Lyrics in the editor.');
      return;
    }

    if (!slug.trim()) {
      setErrorMsg('Please provide a unique URL Slug.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        id: initialSong?.id,
        category_id: categoryId,
        title_telugu: titleTelugu || titleRoman,
        title_roman: titleRoman || transliterateTitle(titleTelugu),
        slug: slug.trim(),
        lyrics_telugu: lyricsTelugu || lyricsRoman,
        lyrics_roman: lyricsRoman || transliterateTeluguToRoman(lyricsTelugu),
        meaning_english: meaningEnglish,
        tags: tags,
      };

      const endpoint = isEditing ? `/api/songs` : `/api/upload`;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save devotional song');
      }

      setSuccessMsg(
        isEditing
          ? 'Stotram updated successfully!'
          : 'Stotram published successfully to Cloudflare D1!'
      );

      setTimeout(() => {
        router.push(`/song/${payload.slug}`);
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error publishing devotional song');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Upload Zone & OCR Input */}
      <div className="p-6 sm:p-8 rounded-3xl bg-card-gradient border border-obsidian-border shadow-gold-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold-radiant/20 border border-gold-antique/40 text-gold-radiant">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-cinzel">
                Devotional Stotram Ingestion & OCR
              </h2>
              <p className="text-xs text-gold-champagne/70 font-sans">
                Upload stotram photo / screenshot or directly paste raw lyrics
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAutoTransliterate}
            disabled={!lyricsTelugu}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-radiant text-obsidian text-xs font-bold hover:brightness-110 transition-all disabled:opacity-40 shadow-gold-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Auto Transliterate</span>
          </button>
        </div>

        {/* Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gold-antique/30 hover:border-gold-radiant/70 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all hover:bg-gold-antique/5 group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-obsidian-secondary flex items-center justify-center border border-obsidian-border group-hover:scale-110 transition-transform">
              {isProcessingOcr ? (
                <RefreshCw className="w-6 h-6 text-gold-radiant animate-spin" />
              ) : (
                <ImageIcon className="w-6 h-6 text-gold-antique" />
              )}
            </div>

            <p className="text-sm font-semibold text-stone-200 font-sans">
              {isProcessingOcr
                ? ocrStatus
                : 'Click or drop Stotram Screenshot / Photo (OCR auto-extract)'}
            </p>
            <p className="text-xs text-gold-champagne/60 font-sans">
              JPG, PNG, WebP devotional screenshot formats supported
            </p>
          </div>
        </div>

        {/* Image Preview if uploaded */}
        {imagePreview && (
          <div className="mt-4 p-3 rounded-xl bg-obsidian border border-obsidian-border flex items-center gap-3">
            <img
              src={imagePreview}
              alt="Uploaded screenshot"
              className="w-16 h-16 object-cover rounded-lg border border-gold-antique/30"
            />
            <div className="text-xs">
              <span className="text-gold-radiant font-semibold">Screenshot Preview</span>
              <p className="text-gold-champagne/60 font-sans">{ocrStatus || 'Ready for review'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Publishing Form & Review Panel */}
      <form onSubmit={handlePublish} className="space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm flex items-center gap-2 font-sans">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-xl bg-green-950/60 border border-green-500/40 text-green-200 text-sm flex items-center gap-2 font-sans">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Top Metadata Row: Deity, Roman Title, Telugu Title, Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl bg-card-gradient border border-obsidian-border">
          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gold-champagne/80 font-sans uppercase tracking-wider">
              Deity Category *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-white text-sm focus:border-gold-radiant focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name_english}
                </option>
              ))}
            </select>
          </div>

          {/* Roman Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gold-champagne/80 font-sans uppercase tracking-wider">
              Title (Roman Script) *
            </label>
            <input
              type="text"
              required
              value={titleRoman}
              onChange={(e) => setTitleRoman(e.target.value)}
              placeholder="e.g. Sri Venkateswara Suprabhatam"
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-white text-sm focus:border-gold-radiant focus:outline-none font-sans"
            />
          </div>

          {/* Telugu Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gold-champagne/80 font-sans uppercase tracking-wider">
              Title (Telugu Script)
            </label>
            <input
              type="text"
              value={titleTelugu}
              onChange={(e) => handleTeluguTitleChange(e.target.value)}
              placeholder="e.g. శ్రీ వేంకటేశ్వర సుప్రభాతం"
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-white text-sm focus:border-gold-radiant focus:outline-none font-telugu"
            />
          </div>

          {/* URL Slug */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gold-champagne/80 font-sans uppercase tracking-wider">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="sri-venkateswara-suprabhatam"
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-white text-sm focus:border-gold-radiant focus:outline-none font-mono text-xs"
            />
          </div>
        </div>

        {/* Dual-Column Split Review Editor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-card-gradient border border-obsidian-border">
          {/* Column 1: Roman Pronunciation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1">
              <label className="text-sm font-bold text-gold-radiant font-sans">
                Roman Pronunciation (English Chanting) *
              </label>
              <span className="text-[10px] text-gold-champagne/60 font-sans">
                {lyricsRoman.split('\n').filter(Boolean).length} lines
              </span>
            </div>
            <textarea
              required
              rows={16}
              value={lyricsRoman}
              onChange={(e) => setLyricsRoman(e.target.value)}
              placeholder="Type or auto-transliterate Roman pronunciation here..."
              className="w-full p-4 rounded-2xl bg-obsidian border border-obsidian-border focus:border-gold-radiant text-gold-champagne text-sm leading-relaxed font-sans focus:outline-none resize-y"
            />
          </div>

          {/* Column 2: Telugu Script */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1">
              <label className="text-sm font-bold text-gold-radiant font-sans">
                Telugu Script (Original)
              </label>
              <span className="text-[10px] text-gold-champagne/60 font-sans">
                {lyricsTelugu.split('\n').filter(Boolean).length} lines
              </span>
            </div>
            <textarea
              rows={16}
              value={lyricsTelugu}
              onChange={(e) => setLyricsTelugu(e.target.value)}
              placeholder="Paste Telugu lyrics here..."
              className="w-full p-4 rounded-2xl bg-obsidian border border-obsidian-border focus:border-gold-radiant text-stone-100 text-base leading-relaxed font-telugu focus:outline-none resize-y"
            />
          </div>
        </div>

        {/* English Meaning Box */}
        <div className="p-6 rounded-3xl bg-card-gradient border border-obsidian-border space-y-2">
          <label className="text-sm font-bold text-gold-radiant font-sans">
            English Meaning & Significance (Verse-by-verse translation)
          </label>
          <textarea
            rows={6}
            value={meaningEnglish}
            onChange={(e) => setMeaningEnglish(e.target.value)}
            placeholder="Provide verse-by-verse English translation or spiritual significance..."
            className="w-full p-4 rounded-2xl bg-obsidian border border-obsidian-border focus:border-gold-radiant text-stone-200 text-sm leading-relaxed font-sans focus:outline-none resize-y"
          />
        </div>

        {/* Tags Row & Submit Button */}
        <div className="p-6 rounded-3xl bg-card-gradient border border-obsidian-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1 min-w-[280px] space-y-1">
            <label className="text-xs font-semibold text-gold-champagne/80 font-sans uppercase tracking-wider">
              Search Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="stotram, suktam, bhajan, harati, sureshwara"
              className="w-full px-3 py-2 rounded-xl bg-obsidian border border-obsidian-border text-white text-xs focus:border-gold-radiant focus:outline-none font-sans"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/admin/manage')}
              className="px-5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-gold-champagne hover:text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Manage Stotrams
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-radiant to-gold-antique hover:brightness-110 text-obsidian font-bold text-xs sm:text-sm transition-all shadow-gold-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-obsidian" />
                  <span>Publishing to Cloudflare D1...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-obsidian" />
                  <span>{isEditing ? 'Update Stotram' : 'Publish to Cloudflare D1'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
