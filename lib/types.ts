export interface Category {
  id: string;
  name_telugu: string;
  name_english: string;
  slug: string;
  icon: string;
  subtitle_english?: string;
  gradient?: string;
  display_order: number;
  song_count?: number;
  created_at?: string;
}

export interface Song {
  id: string;
  category_id: string;
  category_name_english?: string;
  category_name_telugu?: string;
  category_slug?: string;
  category_icon?: string;
  title_telugu: string;
  title_roman: string;
  title_english?: string;
  slug: string;
  lyrics_telugu: string;
  lyrics_roman: string;
  meaning_english?: string;
  tags?: string;
  view_count: number;
  download_count: number;
  created_at?: string;
}

export interface AdminAuthResponse {
  authenticated: boolean;
  message?: string;
}

export interface TransliterateOptions {
  capitalizeVerses?: boolean;
  phoneticVariant?: 'standard' | 'phonetic';
}
