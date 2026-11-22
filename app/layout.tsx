import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Yamini Lyrics • Devotional Stotrams & Sacred Temple PDFs',
  description: 'Divine Devotional Songs, Stotrams, Phonetic Transliterations, and 1-Click Sacred Temple Border PDF Generator for Swami Ayyappa, Lord Shiva, Lord Krishna, Lord Venkateswara, and all deities.',
  keywords: 'Yamini Lyrics, devotional songs, stotrams, harivarasanam, shiva tandava stotram, hanuman chalisa, madhurashtakam, sacred pdf',
  icons: {
    icon: '/assets/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-obsidian text-gold-champagne min-h-screen flex flex-col selection:bg-gold-radiant/30 selection:text-gold-radiant">
        {/* Subtle Ambient Golden Glow at top */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-gold-radiant/10 via-gold-antique/5 to-transparent blur-[120px] pointer-events-none z-0" />

        <LanguageProvider>
          <Navbar />

          <main className="flex-1 relative z-10 pb-24 sm:pb-16">
            {children}
          </main>

          <Footer />

          <MobileNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
