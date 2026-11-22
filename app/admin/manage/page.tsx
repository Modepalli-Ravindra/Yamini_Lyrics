'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Song, Category } from '@/lib/types';
import { 
  Trash2, ExternalLink, Plus, Eye, Download, Search, RefreshCw, 
  FolderPlus, X, Check, Upload, Image as ImageIcon, LogOut, Shield, ChevronRight
} from 'lucide-react';

export default function AdminManagePage() {
  const router = useRouter();
  const [songs, setSongs] = useState<Song[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  // Modal for creating custom deity folder
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderSubtitle, setNewFolderSubtitle] = useState('');
  const [newFolderSlug, setNewFolderSlug] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmittingFolder, setIsSubmittingFolder] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    setIsLoading(true);
    try {
      // 1. Verify Authentication
      const authRes = await fetch('/api/auth');
      const authData = await authRes.json();
      if (!authData.authenticated) {
        router.replace('/admin/login?redirect=/admin/manage');
        return;
      }

      // 2. Fetch Data
      const [songsRes, catsRes] = await Promise.all([
        fetch('/api/songs'),
        fetch('/api/categories'),
      ]);
      const songsData = await songsRes.json();
      const catsData = await catsRes.json();
      setSongs(songsData.songs || []);
      setCategories(catsData.categories || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.replace('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    setIsSubmittingFolder(true);
    try {
      const finalSlug = (newFolderSlug || newFolderName)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      let iconPath = `/assets/deities/${finalSlug}.png`;

      // If user uploaded an image file, send to image upload endpoint
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('slug', finalSlug);

        const uploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.imageUrl) {
            iconPath = uploadData.imageUrl;
          }
        }
      }

      // Create Category in D1 database
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name_english: newFolderName.trim(),
          slug: finalSlug,
          subtitle_english: newFolderSubtitle.trim() || 'Devotional Stotrams & Sacred Hymns',
          icon: iconPath,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create deity folder');
      }

      setMessage(`Deity folder "${newFolderName}" created with image successfully!`);
      setShowFolderModal(false);
      setNewFolderName('');
      setNewFolderSubtitle('');
      setNewFolderSlug('');
      setImageFile(null);
      setImagePreview(null);
      checkAuthAndFetch();
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Error creating folder');
    } finally {
      setIsSubmittingFolder(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this devotional stotram?')) return;

    try {
      const res = await fetch(`/api/songs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSongs((prev) => prev.filter((s) => s.id !== id));
        setMessage('Devotional stotram deleted successfully.');
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error('Failed to delete song', err);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the "${name}" deity folder? Any stotrams in this folder will also be removed.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/categories?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete folder');
      }

      setMessage(`Deity folder "${name}" deleted successfully.`);
      checkAuthAndFetch();
      setTimeout(() => setMessage(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Error deleting category');
    }
  };

  const filtered = songs.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.title_roman.toLowerCase().includes(q) ||
      s.title_telugu.toLowerCase().includes(q) ||
      (s.category_name_english || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-obsidian-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-radiant/15 border border-gold-radiant/35 flex items-center justify-center text-gold-radiant shadow-gold-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-cinzel">
              Yamini Lyrics Admin Studio
            </h1>
            <p className="text-xs text-gold-champagne/70 font-sans">
              Folders: {categories.length} | Stotrams: {songs.length} • PIN Protected
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowFolderModal(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-obsidian-secondary border border-gold-antique/50 hover:border-gold-radiant text-gold-champagne hover:text-white font-semibold text-xs sm:text-sm transition-all shadow-gold-sm"
          >
            <FolderPlus className="w-4 h-4 text-gold-radiant" />
            <span>+ Create Deity Folder</span>
          </button>

          <Link
            href="/admin/upload"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-radiant to-gold-antique text-obsidian font-bold text-xs sm:text-sm hover:brightness-110 transition-all shadow-gold-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Stotram</span>
          </Link>

          <button
            onClick={handleLogout}
            title="Log Out of Admin"
            className="p-2 rounded-xl bg-obsidian border border-obsidian-border text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs font-sans flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {/* Deity Folders Grid Overview */}
      <div className="p-4 sm:p-5 rounded-3xl bg-obsidian-secondary/70 border border-obsidian-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gold-radiant uppercase tracking-wider font-cinzel">
            Active Deity Folders ({categories.length})
          </span>
          <button
            onClick={() => setShowFolderModal(true)}
            className="text-xs text-gold-radiant hover:underline font-semibold"
          >
            + Add New Deity Folder
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {categories.map((c) => (
            <div
              key={c.id}
              className="p-2.5 rounded-2xl bg-obsidian border border-obsidian-border hover:border-gold-radiant/50 text-xs text-gold-champagne flex items-center justify-between gap-2.5 transition-all group"
            >
              <Link
                href={`/category/${c.slug}`}
                className="flex items-center gap-2.5 min-w-0 flex-1 hover:text-white"
                title={`View ${c.name_english} stotrams`}
              >
                <img
                  src={c.icon || `/assets/deities/${c.slug}.png`}
                  alt={c.name_english}
                  className="w-8 h-8 rounded-full object-cover border border-gold-radiant/40 shrink-0 group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="min-w-0">
                  <div className="font-semibold text-white truncate">{c.name_english}</div>
                  <div className="text-[10px] text-gold-champagne/60 font-sans">
                    {c.song_count || 0} hymns
                  </div>
                </div>
              </Link>

              <button
                onClick={() => handleDeleteCategory(c.id, c.name_english)}
                title={`Delete ${c.name_english} folder`}
                className="p-1.5 rounded-lg bg-obsidian-secondary text-stone-400 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-500/30 transition-colors shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stotrams Management Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-white font-cinzel">
            All Devotional Stotrams ({songs.length})
          </h2>

          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold-champagne/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stotrams or deities..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-obsidian border border-obsidian-border text-white text-xs focus:border-gold-radiant focus:outline-none"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gold-radiant font-cinzel text-sm">
            Loading stotrams and folders...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-obsidian-secondary/40 border border-obsidian-border text-gold-champagne/60 text-sm">
            No stotrams found. Click &quot;Add Stotram&quot; to ingest your first song.
          </div>
        ) : (
          <div className="rounded-3xl bg-card-gradient border border-obsidian-border overflow-hidden">
            <div className="divide-y divide-white/5">
              {filtered.map((song) => (
                <div
                  key={song.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-gold-radiant/10 border border-gold-radiant/30 text-gold-radiant text-[10px] font-semibold">
                        {song.category_name_english}
                      </span>
                      <span className="text-[11px] text-gold-champagne/60 font-sans flex items-center gap-1">
                        <Eye className="w-3 h-3 text-gold-antique" />
                        {song.view_count || 0}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white font-cinzel">
                      {song.title_roman}
                    </h3>
                    <p className="text-xs text-stone-300 font-telugu">
                      {song.title_telugu}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 sm:pt-0 self-end sm:self-auto">
                    <Link
                      href={`/song/${song.slug}`}
                      target="_blank"
                      className="p-2 rounded-xl bg-obsidian border border-obsidian-border hover:border-gold-radiant/40 text-gold-champagne hover:text-white transition-colors"
                      title="View Public Stotram"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDelete(song.id)}
                      className="p-2 rounded-xl bg-obsidian border border-obsidian-border hover:border-red-500/50 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete Stotram"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Create Deity Folder with Image Upload */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-card-gradient border border-gold-antique/40 shadow-2xl space-y-5 my-auto animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-obsidian-border">
              <div className="flex items-center gap-2.5">
                <FolderPlus className="w-5 h-5 text-gold-radiant" />
                <h3 className="text-base sm:text-lg font-bold text-white font-cinzel">
                  Create Deity Folder
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowFolderModal(false);
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className="p-1.5 rounded-xl bg-obsidian text-gold-champagne/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              {/* Deity Image Upload */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gold-champagne/80 font-sans uppercase tracking-wider block">
                  Deity Photo / Image Upload
                </label>
                
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-obsidian border border-obsidian-border">
                  <div className="w-16 h-16 rounded-2xl border-2 border-gold-radiant/40 bg-obsidian-secondary overflow-hidden shrink-0 flex items-center justify-center shadow-gold-sm">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Deity Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gold-champagne/40" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-radiant/15 hover:bg-gold-radiant/25 border border-gold-radiant/40 text-gold-radiant text-xs font-semibold transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{imageFile ? 'Change Photo' : 'Upload Deity Photo'}</span>
                    </button>
                    <p className="text-[11px] text-gold-champagne/50 font-sans">
                      {imageFile ? imageFile.name : 'PNG or JPG (recommended portrait)'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Deity Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gold-champagne/80 font-sans uppercase tracking-wider">
                  Deity Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={newFolderName}
                  onChange={(e) => {
                    setNewFolderName(e.target.value);
                    if (!newFolderSlug) {
                      setNewFolderSlug(
                        e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                      );
                    }
                  }}
                  placeholder="e.g. Lord Surya, Goddess Saraswati"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-white text-xs sm:text-sm focus:border-gold-radiant focus:outline-none"
                />
              </div>

              {/* Folder Slug */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gold-champagne/80 font-sans uppercase tracking-wider">
                  Folder URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={newFolderSlug}
                  onChange={(e) => setNewFolderSlug(e.target.value)}
                  placeholder="e.g. lord-surya"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-white text-xs focus:border-gold-radiant focus:outline-none font-mono"
                />
              </div>

              {/* Subtitle / Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gold-champagne/80 font-sans uppercase tracking-wider">
                  Subtitle / Description
                </label>
                <input
                  type="text"
                  value={newFolderSubtitle}
                  onChange={(e) => setNewFolderSubtitle(e.target.value)}
                  placeholder="e.g. Giver of Light, Health & Divine Radiance"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-obsidian-border text-white text-xs sm:text-sm focus:border-gold-radiant focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowFolderModal(false);
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-obsidian border border-obsidian-border text-gold-champagne text-xs font-semibold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingFolder}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-radiant to-gold-antique hover:brightness-110 text-obsidian font-bold text-xs sm:text-sm shadow-gold-sm disabled:opacity-50 transition-all"
                >
                  {isSubmittingFolder ? 'Uploading & Creating...' : 'Create Folder & Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
