# StotraLipi • Devotional Songs & Sacred PDF Cloudflare Platform

A full-stack, production-grade devotional song and sacred lyric platform with folder/deity-wise categorization, Telugu Unicode transliteration, and 1-click temple border A4 PDF generation.

---

## 🪔 Features

### User Experience
- **Public Access**: Zero-login fast access, optimized for mobile browsers and Instagram in-app browsers.
- **Deity Explorer Folders**: Categorized stotrams for Ayyappa Swamy, Lord Shiva, Lord Venkateswara, Sri Rama, Hanuman, Durga Devi, and Lord Ganesha.
- **Live Instant Fuzzy Search**: Real-time search across Telugu titles, English/Roman titles, categories, and lyric tags.
- **Dual-Tab & Side-by-Side Lyrics Reader**:
  - Tab 1: **తెలుగు లిపి** (Telugu Script)
  - Tab 2: **Roman Pronunciation** (Phonetic English)
  - Desktop Side-by-Side split mode for chanting and learning pronunciation simultaneously
  - Font size controls (`A-`, `A`, `A+`) for comfortable chanting in low-light environments
  - Quick Copy and Share buttons with mobile Web Share API integration
- **Sacred Temple Border PDF Engine**:
  - Generates high-DPI print-ready A4 PDFs
  - Traditional Antique Gold geometric temple borders with Sanskrit sacred motifs (`ॐ`, `卐`, `🔱`)
  - Configurable formats: Dual script, Telugu only, or Roman only
  - Instagram watermark handle (`@stotralipi` or custom) & QR code

### Admin Studio & Ingestion
- **Protected Edge Session Auth**: Access via sacred PIN (Default: `1008`).
- **Screenshot / Photo OCR Ingestion**: Dropzone supporting screenshot upload with `tesseract.js` Telugu & English text recognition, or direct text paste.
- **Intelligent Telugu-to-Roman Phonetic Transliteration**:
  - Rule-based phonetic transliterator converting Telugu Unicode to natural, readable Roman Telugu (handling vowels, consonants, guninthalu, and vothulu conjuncts).
- **Dual-Column Split Review Editor**: Real-time side-by-side editing before 1-click publishing to Cloudflare D1.
- **Song Management**: View counts, download analytics, editing, and deletion.

---

## 🚀 Getting Started

### Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Offline/Local Mode**: The application automatically initializes a local persistent database store in `.data/devotional_db.json` pre-seeded with authentic devotional songs (Harivarasanam, Shiva Tandava Stotram, Lingashtakam, Sri Hanuman Chalisa, Sri Venkateswara Suprabhatam, etc.).

---

## 🔐 Admin Portal
- **URL**: `/admin/login` or click the **Admin** button in the navbar.
- **Sacred Access PIN**: `1008` (configurable via `ADMIN_PIN` environment variable).
- Direct Studio: `/admin/upload`
- Manage List: `/admin/manage`

---

## ☁️ Cloudflare Pages & D1 Deployment

1. **Install Cloudflare Wrangler (if not already installed)**:
   ```bash
   npm install -g wrangler
   ```

2. **Authenticate with Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Create the D1 Database**:
   ```bash
   wrangler d1 create devotional-lyrics-db
   ```
   *Copy the `database_id` output and update `wrangler.toml`.*

4. **Initialize Database Schema on Cloudflare**:
   ```bash
   wrangler d1 execute devotional-lyrics-db --file=schema.sql
   ```

5. **Build and Deploy to Cloudflare Pages**:
   ```bash
   npm run build
   npx wrangler pages deploy .next
   ```
