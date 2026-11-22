'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.deities': 'Deities',
    'nav.admin': 'Admin Studio',
    'nav.tagline': 'Sacred Vault',
    'nav.subtagline': 'Devotional Stotrams, Phonetic Transliterations & Sacred PDFs',

    // Hero
    'hero.badge': 'Sacred Stotram Vault • High-DPI Temple PDFs',
    'hero.titlePart1': 'Devotional',
    'hero.titleHighlight': 'Stotrams',
    'hero.titlePart2': '& Sacred Hymns',
    'hero.subtitle': 'Authentic devotional stotrams and bhajans for all deities. Read in original script, chant with Phonetic Roman Pronunciation, and understand with English Meaning. Export print-ready A4 PDFs with 1-click.',
    'hero.searchPlaceholder': 'Search stotram, deity, or chant (e.g. Ayyappa, Shiva, Venkateswara)...',
    'hero.popular': 'Popular:',
    'hero.featuredBadge': 'Sacred Emblem • Yamini Lyrics',
    'hero.featuredTitle': 'Yamini Lyrics',
    'hero.featuredDesc': 'Eternal Devotional Stotrams & High-DPI Sacred Temple PDFs',
    'hero.featuredBtn': 'Explore Sacred Deities',

    // Deities Section
    'deities.heading': 'Explore by Sacred Deity',
    'deities.subheading': 'Select a divine folder to access sacred stotrams, ashtottarams, and hymns dedicated to that deity.',
    'deities.allHymns': 'All Hymns',
    'deities.stotramsCount': 'Stotrams',
    'deities.viewHymns': 'View Hymns',

    // Popular Section
    'popular.heading': 'Popular Stotrams',
    'popular.subheading': 'Most chanted sacred hymns, prayers, and stotrams with dual-script transliterations and printable temple PDFs.',
    'popular.views': 'views',
    'popular.readAndChant': 'Read & Chant',

    // Category / Deity Page
    'category.back': 'Back to All Deities',
    'category.hymnsAvailable': 'Sacred Hymns Available',
    'category.searchInFolder': 'Search in this folder...',
    'category.empty': 'No hymns added in this folder yet.',

    // Song Page / Lyrics Viewer
    'song.backTo': 'Back to',
    'song.tabRoman': 'Roman Transliteration',
    'song.tabMeaning': 'English Meaning',
    'song.tabTelugu': 'Telugu Script',
    'song.tabSide': 'Side-by-Side',
    'song.textSize': 'Text Size',
    'song.copy': 'Copy',
    'song.copied': 'Copied!',
    'song.share': 'Share',
    'song.downloadPdf': 'Download Sacred PDF',
    'song.scriptNotice': 'Chant aloud with devotion. Use the tabs above to switch between English Phonetic script and Telugu script.',

    // PDF Generator
    'pdf.title': 'Sacred Print-Ready PDF',
    'pdf.subtitle': 'Generate high-resolution A4 devotional sheet with temple borders and sacred motifs.',
    'pdf.chooseScript': 'Choose PDF Script',
    'pdf.downloadNow': 'Download PDF',
    'pdf.generating': 'Generating PDF...',
    'pdf.romanOption': 'Roman Transliteration (English)',
    'pdf.teluguOption': 'Authentic Telugu Script',
    'pdf.sideOption': 'Dual Script (Side-by-Side)',
    'pdf.includeMeaning': 'Include English Meaning in PDF',

    // Footer
    'footer.line1': 'Yamini Lyrics • Sacred Devotional Stotram Vault',
    'footer.line2': 'High-DPI Temple Border PDFs & Phonetic Transliterations • Edge Hosted on Cloudflare',
    'footer.line3': 'Free Public Access • Dedicated to Devotional Practice',

    // Mobile Nav
    'mob.home': 'Home',
    'mob.deities': 'Deities',
    'mob.stotrams': 'Stotrams',
    'mob.admin': 'Admin',
  },
  te: {
    // Navbar
    'nav.home': 'హోమ్',
    'nav.deities': 'దైవ దర్శనం',
    'nav.admin': 'అడ్మిన్ స్టూడియో',
    'nav.tagline': 'పవిత్ర నిలయం',
    'nav.subtagline': 'దివ్య స్తోత్రాలు, రోమన్ ఉచ్ఛారణ & పవిత్ర టెంపుల్ PDFలు',

    // Hero
    'hero.badge': 'పవిత్ర స్తోత్ర నిలయం • హై-క్వాలిటీ టెంపుల్ PDFలు',
    'hero.titlePart1': 'దివ్య',
    'hero.titleHighlight': 'స్తోత్రాలు',
    'hero.titlePart2': '& భక్తి గేయాలు',
    'hero.subtitle': 'సకల దేవతల పవిత్ర స్తోత్రాలు, అష్టోత్తరాలు మరియు భక్తి గేయాలు. మూల లిపిలో చదవండి, రోమన్ ఉచ్ఛారణతో పారాయణం చేయండి, సమగ్ర భావార్థం గ్రహించండి. 1-క్లిక్‌తో అందమైన A4 టెంపుల్ బోర్డర్ PDFలను పొందండి.',
    'hero.searchPlaceholder': 'స్తోత్రం లేదా దేవుని పేరుతో వెతకండి (ఉదా: అయ్యప్ప, శివ, వెంకటేశ్వర)...',
    'hero.popular': 'ప్రసిద్ధమైనవి:',
    'hero.featuredBadge': 'దివ్య చిహ్నం • యామిని లిరిక్స్',
    'hero.featuredTitle': 'యామిని లిరిక్స్',
    'hero.featuredDesc': 'నిత్య పారాయణ దివ్య స్తోత్రాలు & పవిత్ర టెంపుల్ బోర్డర్ PDFలు',
    'hero.featuredBtn': 'పవిత్ర దైవ దర్శనం',

    // Deities Section
    'deities.heading': 'పవిత్ర దైవ దర్శనం',
    'deities.subheading': 'దేవుళ్ల వారీగా పవిత్ర స్తోత్రాలు, అష్టోత్తర శతనామావళి మరియు భజనలను వీక్షించండి.',
    'deities.allHymns': 'అన్ని స్తోత్రాలు',
    'deities.stotramsCount': 'స్తోత్రాలు',
    'deities.viewHymns': 'స్తోత్రాలు చూడండి',

    // Popular Section
    'popular.heading': 'ప్రముఖ స్తోత్రాలు',
    'popular.subheading': 'నిత్య పారాయణ దివ్య స్తోత్రాలు, శ్లోకాలు మరియు ప్రింటబుల్ పవిత్ర PDFలు.',
    'popular.views': 'వీక్షణలు',
    'popular.readAndChant': 'పారాయణం చేయండి',

    // Category / Deity Page
    'category.back': 'అన్ని దేవుళ్ల జాబితా',
    'category.hymnsAvailable': 'అందుబాటులో ఉన్న స్తోత్రాలు',
    'category.searchInFolder': 'ఈ ఫోల్డర్‌లో వెతకండి...',
    'category.empty': 'ఈ ఫోల్డర్‌లో ఇంకా స్తోత్రాలు జోడించబడలేదు.',

    // Song Page / Lyrics Viewer
    'song.backTo': 'తిరిగి వెళ్ళండి:',
    'song.tabRoman': 'రోమన్ లిపి',
    'song.tabMeaning': 'ఆంగ్ల భావార్థం',
    'song.tabTelugu': 'తెలుగు లిపి',
    'song.tabSide': 'ద్విభాషా వీక్షణ',
    'song.textSize': 'అక్షర పరిమాణం',
    'song.copy': 'కాపీ',
    'song.copied': 'కాపీ అయ్యింది!',
    'song.share': 'షేర్',
    'song.downloadPdf': 'పవిత్ర PDF డౌన్‌లోడ్',
    'song.scriptNotice': 'భక్తిశ్రద్ధలతో పారాయణం చేయండి. పై ట్యాబ్‌లను ఉపయోగించి రోమన్ మరియు తెలుగు లిపిల మధ్య మారవచ్చు.',

    // PDF Generator
    'pdf.title': 'పవిత్ర ప్రింట్-రెడీ PDF',
    'pdf.subtitle': 'టెంపుల్ బోర్డర్లు మరియు పవిత్ర చిహ్నాలతో హై-క్వాలిటీ A4 భక్తి పత్రాన్ని డౌన్‌లోడ్ చేసుకోండి.',
    'pdf.chooseScript': 'PDF లిపిని ఎంచుకోండి',
    'pdf.downloadNow': 'ఇప్పుడే డౌన్‌లోడ్ చేయండి',
    'pdf.generating': 'PDF సిద్ధమవుతోంది...',
    'pdf.romanOption': 'రోమన్ లిపి (ఆంగ్ల ఉచ్ఛారణ)',
    'pdf.teluguOption': 'స్వచ్ఛమైన తెలుగు లిపి',
    'pdf.sideOption': 'ద్విభాషా లిపి (పక్కపక్కన)',
    'pdf.includeMeaning': 'PDFలో ఆంగ్ల భావార్థం చేర్చండి',

    // Footer
    'footer.line1': 'యామిని లిరిక్స్ • పవిత్ర భక్తి స్తోత్ర నిలయం',
    'footer.line2': 'హై-క్వాలిటీ టెంపుల్ బోర్డర్ PDFలు & రోమన్ ఉచ్ఛారణ • క్లౌడ్‌ఫ్లేర్ ఎడ్జ్ హోస్టింగ్',
    'footer.line3': 'అందరికీ ఉచిత ప్రవేశం • భక్తి సాధనకై సమర్పితం',

    // Mobile Nav
    'mob.home': 'హోమ్',
    'mob.deities': 'దైవ దర్శనం',
    'mob.stotrams': 'స్తోత్రాలు',
    'mob.admin': 'అడ్మిన్',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load persisted language from localStorage, fallback to 'en' by default
  useEffect(() => {
    try {
      const saved = localStorage.getItem('yamini_lyrics_lang') as Language;
      if (saved === 'en' || saved === 'te') {
        setLanguageState(saved);
      }
    } catch {
      // ignore SSR or storage disabled
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('yamini_lyrics_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'te' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
