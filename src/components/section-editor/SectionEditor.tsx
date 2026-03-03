'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useSongStore } from '@/lib/song-store';
import SectionTypePicker from './SectionTypePicker';
import { formatSectionTag } from '@/lib/section-label';
import { useTranslations } from 'next-intl';

export default function SectionEditor() {
  const t = useTranslations('SectionEditor');
  const sections = useSongStore((s) => s.sections);
  const activeSectionId = useSongStore((s) => s.activeSectionId);
  const updateSection = useSongStore((s) => s.updateSection);
  const setSectionType = useSongStore((s) => s.setSectionType);

  const section = React.useMemo(
    () => sections.find((x) => x.id === activeSectionId),
    [sections, activeSectionId],
  );

  if (!section) return null;

  const previewTag = formatSectionTag(section, sections);

  const lines = React.useMemo(() => {
    const t = section.lyrics.trimEnd();
    if (!t) return 0;
    return t.split('\n').length;
  }, [section.lyrics]);

  const words = React.useMemo(() => {
    const t = section.lyrics.trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(Boolean).length;
  }, [section.lyrics]);

  return (
    <section className="section">
      <header className="mb-3">
        <h2 className="text-foreground/95 text-sm font-semibold">{t('title')}</h2>
        <p className="text-foreground/55 mt-1 text-xs">
          {t('preview')}: <span className="text-foreground/80 font-mono">{previewTag}</span>
        </p>
      </header>

      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[220px_1fr]">
          <div className="space-y-1">
            <label className="text-foreground/60 text-xs">{t('type')}</label>
            <SectionTypePicker
              value={section.type}
              onChange={(type) => setSectionType(section.id, type)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-foreground/60 text-xs">{t('instruction')}</label>
            <input
              value={section.instruction}
              onChange={(e) => updateSection(section.id, { instruction: e.target.value })}
              placeholder="Violin solo / Whispered / No drums…"
              className={cn(
                'border-foreground/10 bg-element text-foreground/90 w-full rounded-xl border px-3 py-2 text-xs',
                'placeholder:text-foreground/40 focus:ring-accent/50 focus:ring-2 focus:outline-none',
              )}
            />
          </div>
        </div>

        {section.type === 'custom' && (
          <div className="space-y-1">
            <label className="text-foreground/60 text-xs">{t('customLabel')}</label>
            <input
              value={section.customLabel}
              onChange={(e) => updateSection(section.id, { customLabel: e.target.value })}
              placeholder={t('customPlaceholder')}
              className={cn(
                'border-foreground/10 bg-element text-foreground/90 w-full rounded-xl border px-3 py-2 text-xs',
                'placeholder:text-foreground/40 focus:ring-accent/50 focus:ring-2 focus:outline-none',
              )}
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-foreground/60 text-xs">{t('lyrics')}</label>
          <textarea
            value={section.lyrics}
            onChange={(e) => updateSection(section.id, { lyrics: e.target.value })}
            placeholder={t('lyricsPlaceholder')}
            className={cn(
              'border-foreground/10 bg-element min-h-90 w-full resize-y rounded-2xl border px-3 py-3',
              'text-foreground/90 font-mono text-[13px] leading-5',
              'placeholder:text-foreground/40 focus:ring-accent/50 focus:ring-2 focus:outline-none',
            )}
          />
          <div className="text-foreground/50 flex items-center justify-between text-xs">
            <span>
              {lines} {t('lines')} • {words} {t('words')}
            </span>
            <button
              type="button"
              onClick={() => updateSection(section.id, { lyrics: '' })}
              className="text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80 focus:ring-accent/40 rounded-lg px-2 py-1 focus:ring-2 focus:outline-none"
            >
              {t('clearLyrics')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
