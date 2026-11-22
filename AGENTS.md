# AGENTS.md — Devotional Songs & Auto-PDF Cloudflare Platform

## 1. Project Overview & Vision
A production-grade, full-stack devotional song lyric platform with folder/deity-wise categorization (Ayyappa Swamy, Lord Shiva, Lord Venkateswara, Sri Rama, Hanuman, Durga Devi, etc.). 
- **User Side**: Public access (zero auth), responsive mobile-first UI, deity exploration, instant search, dual-tab lyrics viewer (Telugu script & Roman Telugu), and 1-click sacred PDF download.
- **Admin Side**: Protected authentication, screenshot/image OCR and text paste upload, auto-extraction, intelligent Telugu-to-Roman transliteration, preview editor, and 1-click publish to Cloudflare D1.

---

## 2. Technical Stack
- **Framework**: Next.js 14/15 (App Router, React 18/19, TypeScript)
- **Deployment & Hosting**: Cloudflare Pages (via `@cloudflare/next-on-pages` or OpenNext)
- **Database**: Cloudflare D1 (Serverless SQLite at the Edge)
- **Authentication**: Admin Session Auth (HMAC/JWT with Edge cookie or Cloudflare Access)
- **DNS & CDN**: Cloudflare DNS with universal SSL & DDoS mitigation
- **Styling**: Tailwind CSS + Lucide Icons + Custom Premium Dark Gold Design Tokens
- **PDF Generation**: Client-side `jspdf` & `html2canvas` / `html2pdf.js` with divine temple border styling

---

## 3. UI/UX Design System ("Unslop" Premium Dark Gold Aesthetic)
Strict avoidance of generic AI "vibe-coded" clutter. Focused, purposeful, high-contrast typography and spiritual aesthetics:
- **Background**: Deep Obsidian `#07090e`, Secondary `#0c101a`
- **Surfaces**: Frosted glass cards `rgba(17, 24, 39, 0.75)` with 1px border `rgba(212, 175, 55, 0.2)`
- **Gold Accent Palette**:
  - Antique Gold: `#d4af37` (Primary icons, active states, borders)
  - Radiant Gold: `#f59e0b` (Primary buttons, glowing accents)
  - Muted Champagne: `#e2d5b5` (Readable text on dark surfaces)
  - Sacred Saffron: `#ea580c` (Deity badges, live indicators)
- **Typography Hierarchy**:
  - Headings: `Cinzel` / `Montserrat` (sacred, regal, structured)
  - Telugu Lyrics: `Noto Sans Telugu` (crisp, elegant, readable in low light)
  - Roman Telugu: `Plus Jakarta Sans` / `JetBrains Mono`
- **Responsiveness**: Mobile-first design optimized for Instagram in-app browsers.

---

## 4. Database Schema (Cloudflare D1)

```sql
-- schema.sql

-- 1. Deities / Categories (Folders)
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_telugu TEXT NOT NULL,
  name_english TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT DEFAULT '🪔',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Devotional Songs
CREATE TABLE IF NOT EXISTS songs (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL,
  title_telugu TEXT NOT NULL,
  title_roman TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  lyrics_telugu TEXT NOT NULL,
  lyrics_roman TEXT NOT NULL,
  tags TEXT,
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 3. Admin Credentials & Settings
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Indexes for lightning fast Edge search
CREATE INDEX IF NOT EXISTS idx_songs_category ON songs(category_id);
CREATE INDEX IF NOT EXISTS idx_songs_slug ON songs(slug);
```

---

## 5. System Workflows & Agent Roles

### Agent 1: Frontend Architect (User Experience)
- **Routes**:
  - `/` (Home: Hero search, deity folder grid, trending songs)
  - `/category/[slug]` (Deity folder view: e.g. `/category/ayyappa-swamy`, list of stotrams/bhajans)
  - `/song/[slug]` (Song viewer: Telugu & Roman tabs, side-by-side mode, download PDF modal)
- **Features**:
  - Live fuzzy search across both Telugu and English titles
  - Two-way tab view with synchronized verse scrolling
  - Mobile bottom navigation bar

### Agent 2: Admin & Ingestion Engineer (Auto OCR & Transliteration)
- **Routes**:
  - `/admin/login` (Secure password / PIN entry)
  - `/admin/upload` (Image upload dropzone + raw text paste box)
  - `/admin/manage` (Edit, delete, and organize songs into deity folders)
- **Pipeline**:
  1. Input: Screenshot / photo upload OR text paste.
  2. OCR Engine: Client-side `tesseract.js` (Telugu trained data) OR Cloudflare Workers AI Vision model.
  3. Transliteration Engine: Rule-based phonetic transliterator mapping Telugu Unicode to phonetic Roman Telugu (e.g., `అ` -> `a`, `ఆ` -> `aa`, `శ్రీ` -> `sri`).
  4. Review Panel: Dual-column split editor to correct any OCR typos before publishing.
  5. Persistence: Direct API commit to Cloudflare D1.

### Agent 3: Sacred PDF Engine
- Generates high-resolution, print-ready A4 PDFs:
  - Header: Sacred Om (`ॐ`) / Trishul icon + Song Title in Telugu & Roman script.
  - Borders: Traditional antique gold temple geometric borders.
  - Body: 2-column or single-column devotional lyrics with clean verse numbering.
  - Footer: Instagram Page Watermark & QR Code (e.g. `Follow @yourpage for daily stotrams`).

---

## 6. Directory Structure

```text
├── app/
│   ├── layout.tsx                # Root layout with Dark Gold theme & font imports
│   ├── page.tsx                  # Home: Search + Deity Folder Grid
│   ├── category/
│   │   └── [slug]/page.tsx       # Specific Deity Folder view
│   ├── song/
│   │   └── [slug]/page.tsx       # Song lyric reader & PDF trigger
│   ├── admin/
│   │   ├── login/page.tsx        # Admin authentication
│   │   └── upload/page.tsx       # OCR / Transliteration & Publishing dashboard
│   └── api/
│       ├── songs/route.ts        # D1 API to fetch & search songs
│       ├── upload/route.ts       # Secure endpoint to ingest & save songs
│       └── auth/route.ts         # Admin session validation
├── components/
│   ├── Navbar.tsx                # Divine brand header
│   ├── DeityCard.tsx             # Folder card with gold borders & deity icon
│   ├── LyricsViewer.tsx          # Dual tab (Telugu / Roman) viewer
│   ├── PdfGenerator.tsx          # Client-side styled sacred PDF export
│   └── OcrUploader.tsx           # Drag & drop image to text engine
├── lib/
│   ├── d1.ts                     # Cloudflare D1 client helper
│   ├── transliterate.ts          # Telugu -> Roman Telugu phonetic engine
│   └── pdfStyles.ts              # Print layout templates
├── public/                       # Favicons, deity icons, sacred motifs
├── schema.sql                    # Database definitions
├── wrangler.toml                 # Cloudflare Pages / D1 binding configuration
├── package.json
└── tailwind.config.js
```

---

## 7. Deployment Instructions (Cloudflare Pages)

1. **Install Cloudflare Wrangler**:
   ```bash
   npm install -g wrangler
   ```
2. **Create Cloudflare D1 Database**:
   ```bash
   wrangler d1 create devotional-lyrics-db
   ```
3. **Initialize Database Schema**:
   ```bash
   wrangler d1 execute devotional-lyrics-db --file=schema.sql
   ```
4. **Deploy to Cloudflare Pages**:
   ```bash
   npm run build
   npx wrangler pages deploy .next
   ```
