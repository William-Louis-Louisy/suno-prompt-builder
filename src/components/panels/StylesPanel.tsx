'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useSongStore } from '@/lib/song-store';
import { ShuffleIcon } from '@phosphor-icons/react';
import TagInputCombobox from '../tags/TagInputCombobox';
import { STYLE_SUGGESTIONS } from '@/lib/suggestions/styles';

export default function StylesPanel() {
  const t = useTranslations('StylesPanel');
  const styles = useSongStore((s) => s.meta.styles);
  const addStyleTag = useSongStore((s) => s.addStyleTag);
  const removeStyleTag = useSongStore((s) => s.removeStyleTag);

  function shuffleFill() {
    const picks = [...STYLE_SUGGESTIONS].sort(() => Math.random() - 0.5).slice(0, 4);

    picks.forEach((t) => addStyleTag(t));
  }
  return (
    <section className="section">
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-foreground/95 text-sm font-semibold">{t('title')}</h2>
          <p className="text-foreground/55 mt-1 text-xs">
            {t.rich('description', {
              enter: (chunks) => <span className="font-mono">{chunks}</span>,
              comma: (chunks) => <span className="font-mono">{chunks}</span>,
            })}
          </p>
        </div>

        <button
          type="button"
          onClick={shuffleFill}
          className={cn(
            'border-foreground/10 bg-foreground/5 inline-flex items-center gap-2 rounded-xl border px-3 py-2',
            'text-foreground/80 hover:bg-foreground/10 text-xs',
            'focus:ring-accent/40 focus:ring-2 focus:outline-none',
          )}
          aria-label="Random style suggestions"
          title="Random suggestions"
        >
          <ShuffleIcon size={16} />
          <span className="hidden md:block">{t('shuffle')}</span>
        </button>
      </header>

      <TagInputCombobox
        value={styles}
        suggestions={[...STYLE_SUGGESTIONS]}
        onAdd={addStyleTag}
        onRemove={removeStyleTag}
        placeholder="interesting, bass guitars, swedish rock, captivating…"
        noTags={t('noTags')}
      />
    </section>
  );
}
