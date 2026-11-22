// Sacred PDF Styling, Temple Borders & Print Constants

export interface SacredPdfOptions {
  titleTelugu: string;
  titleRoman: string;
  categoryName: string;
  lyricsTelugu: string;
  lyricsRoman: string;
  mode: 'dual' | 'telugu' | 'roman';
  fontSize?: 'small' | 'medium' | 'large';
  instagramWatermark?: string;
}

export const SACRED_THEME = {
  colors: {
    goldDark: '#b8860b',
    goldAntique: '#d4af37',
    goldRadiant: '#f59e0b',
    deepObsidian: '#07090e',
    paperLight: '#fdfbf7',
    inkDark: '#1a1816',
    saffron: '#ea580c',
    borderMuted: '#e2d5b5',
  },
  motifs: {
    om: 'ॐ',
    swastik: '卐',
    trishul: '🔱',
    diya: '🪔',
    bell: '🔔',
  },
};
