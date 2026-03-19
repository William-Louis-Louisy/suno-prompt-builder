'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import ArtistRow from './ArtistRow';
import { useTranslations } from 'next-intl';
import { useSongStore } from '@/lib/song-store';
import {
  ARTIST_SUGGESTIONS_WITH_IMAGES,
  type ArtistSuggestionWithImage,
} from '@/lib/suggestions/artists';
import { TrashIcon } from '@phosphor-icons/react';

export default function ArtistsPanel() {
  const t = useTranslations('ArtistsPanel');
  const [query, setQuery] = React.useState('');

  const selectedArtistId = useSongStore((s) => s.meta.selectedArtistId);
  const applyArtistPreset = useSongStore((s) => s.applyArtistPreset);
  const clearArtistPreset = useSongStore((s) => s.clearArtistPreset);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ARTIST_SUGGESTIONS_WITH_IMAGES;
    return ARTIST_SUGGESTIONS_WITH_IMAGES.filter((a) => a.artist.toLowerCase().includes(q));
  }, [query]);

  function applyArtist(a: ArtistSuggestionWithImage) {
    applyArtistPreset({ id: a.id, tags: a.tags });
  }

  return (
    <section className="section">
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-foreground/95 text-sm font-semibold">{t('title')}</h2>
          <p className="text-foreground/55 mt-1 text-xs">{t('description')}</p>
        </div>

        {selectedArtistId ? (
          <button
            type="button"
            onClick={clearArtistPreset}
            className={cn(
              'border-foreground/10 bg-foreground/5 inline-flex items-center gap-2 rounded-xl border px-3 py-2',
              'text-foreground/80 hover:bg-foreground/10 text-xs',
              'focus:ring-accent/40 focus:ring-2 focus:outline-none',
            )}
          >
            <TrashIcon size={16} />
          </button>
        ) : null}
      </header>

      <div className="space-y-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className={cn(
            'border-foreground/10 bg-element text-foreground/90 w-full rounded-xl border px-3 py-2 text-xs',
            'placeholder:text-foreground/40 focus:ring-accent/50 focus:ring-2 focus:outline-none',
          )}
        />

        <div className="border-foreground/10 bg-element custom-scrollbar rounded-2xl border">
          <div className="custom-scrollbar max-h-65 overflow-auto p-2">
            <ul className="flex flex-col gap-2">
              {filtered.map((a) => (
                <li key={a.id}>
                  <ArtistRow
                    artist={a}
                    isSelected={a.id === selectedArtistId}
                    onApply={() => applyArtist(a)}
                  />
                </li>
              ))}

              {filtered.length === 0 ? (
                <li className="text-foreground/50 px-3 py-3 text-xs">{t('noResults')}</li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
