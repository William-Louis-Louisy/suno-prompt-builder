'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useSongStore } from '@/lib/song-store';
import TagInputCombobox from '../tags/TagInputCombobox';
import { EXCLUDE_STYLE_SUGGESTIONS } from '@/lib/suggestions/exclude-styles';

export function AdvancedOptionsPanel() {
  const excludeStyles = useSongStore((s) => s.meta.excludeStyles);
  const constraintsNotes = useSongStore((s) => s.meta.constraintsNotes);

  const addExcludeStyle = useSongStore((s) => s.addExcludeStyle);
  const removeExcludeStyle = useSongStore((s) => s.removeExcludeStyle);
  const setConstraintsNotes = useSongStore((s) => s.setConstraintsNotes);

  const maxChars = 240;
  const remaining = maxChars - (constraintsNotes?.length ?? 0);

  return (
    <section className="border-foreground/10 bg-background rounded-2xl border p-4">
      <header className="mb-3">
        <h2 className="text-foreground/95 text-sm font-semibold">Advanced options</h2>
        <p className="text-foreground/55 mt-1 text-xs">
          Exclude styles + optional global constraints (short and clear).
        </p>
      </header>

      <div className="space-y-4">
        <TagInputCombobox
          label="Exclude styles"
          value={excludeStyles}
          suggestions={[...EXCLUDE_STYLE_SUGGESTIONS]}
          onAdd={addExcludeStyle}
          onRemove={removeExcludeStyle}
          placeholder="autotune, trap hats, drill…"
        />

        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <p className="text-foreground/60 text-xs">Constraints notes</p>
            <p className={cn('text-xs', remaining < 0 ? 'text-red-300' : 'text-foreground/40')}>
              {remaining}
            </p>
          </div>

          <textarea
            value={constraintsNotes}
            onChange={(e) => setConstraintsNotes(e.target.value)}
            placeholder="Example: keep lyrics exactly as written • no language switch • minimal instruments…"
            className={cn(
              'border-foreground/10 bg-element min-h-22.5 w-full resize-y rounded-2xl border px-3 py-3',
              'text-foreground/90 text-xs leading-5',
              'placeholder:text-foreground/40 focus:ring-accent/50 focus:ring-2 focus:outline-none',
            )}
          />

          <div className="flex items-center justify-between">
            <p className="text-foreground/40 text-xs">
              Keep it short. Suno responds better to clear constraints.
            </p>
            <button
              type="button"
              onClick={() => setConstraintsNotes('')}
              className="text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80 focus:ring-accent/40 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:outline-none"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
