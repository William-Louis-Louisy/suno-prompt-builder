'use client';

import {
  CopyIcon,
  CheckIcon,
  DownloadSimpleIcon,
  ArrowCounterClockwiseIcon,
} from '@phosphor-icons/react';
import * as React from 'react';
import ConfirmModal from '../ui/ConfirmModal';
import { useSongStore } from '@/lib/song-store';
import { cn, copyToClipboard, downloadTextFile } from '@/lib/utils';
import { buildStructuredLyrics, buildTagsText } from '@/lib/song-export';
import { useTranslations } from 'next-intl';

type CopyKey = 'lyrics' | 'tags';

export default function PageHeading() {
  const t = useTranslations('PageHeading');
  const [resetOpen, setResetOpen] = React.useState(false);
  const title = useSongStore((s) => s.title);
  const setTitle = useSongStore((s) => s.setTitle);
  const reset = useSongStore((s) => s.reset);

  const sections = useSongStore((s) => s.sections);
  const meta = useSongStore((s) => s.meta);

  const lyricsText = React.useMemo(() => buildStructuredLyrics(sections), [sections]);
  const tagsText = React.useMemo(() => buildTagsText(meta), [meta]);

  const canCopyLyrics = lyricsText.trim().length > 0;
  const canCopyTags = tagsText.trim().length > 0;

  const [copied, setCopied] = React.useState<Record<CopyKey, boolean>>({
    lyrics: false,
    tags: false,
  });

  function flash(k: CopyKey) {
    setCopied((s) => ({ ...s, [k]: true }));
    window.setTimeout(() => setCopied((s) => ({ ...s, [k]: false })), 1200);
  }

  async function handleCopy(k: CopyKey) {
    const payload = k === 'lyrics' ? lyricsText : tagsText;
    if (!payload.trim()) return;

    try {
      await copyToClipboard(payload);
      flash(k);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      alert('Copy failed. Please select the text in Export and press Ctrl/Cmd+C.');
    }
  }

  function handleDownload() {
    const safeTitle = (title.trim() || 'suno-lyrics')
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const content = [
      title.trim() ? `Title: ${title.trim()}` : '',
      '',
      '=== LYRICS ===',
      lyricsText || '',
      '',
      '=== TAGS ===',
      tagsText || '',
      '',
    ]
      .join('\n')
      .trimEnd();

    downloadTextFile(`${safeTitle || 'suno-lyrics'}.txt`, content);
  }

  return (
    <>
      <section className="section">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-2">
            <div className="space-y-1">
              <label className="text-foreground/60 text-xs">{t('titleLabel')}</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('titlePlaceholder')}
                className={cn(
                  'border-foreground/10 bg-element text-foreground/90 w-full rounded-xl border px-3 py-2 text-sm',
                  'placeholder:text-foreground/40 focus:ring-accent/50 focus:ring-2 focus:outline-none',
                )}
              />
            </div>

            <p className="text-foreground/45 text-xs">
              {sections.length} {t('sections')}
              {sections.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCopy('lyrics')}
              disabled={!canCopyLyrics}
              className={cn(
                'border-foreground/10 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs',
                canCopyLyrics
                  ? 'bg-foreground/5 text-foreground/80 hover:bg-foreground/10'
                  : 'bg-foreground/5 text-foreground/35 cursor-not-allowed opacity-60',
                'focus:ring-accent/40 focus:ring-2 focus:outline-none',
              )}
            >
              {copied.lyrics ? (
                <>
                  <CheckIcon size={16} weight="bold" className="text-accent" /> {t('copiedLyrics')}
                </>
              ) : (
                <>
                  <CopyIcon size={16} /> {t('copyLyrics')}
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleCopy('tags')}
              disabled={!canCopyTags}
              className={cn(
                'border-foreground/10 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs',
                canCopyTags
                  ? 'bg-foreground/5 text-foreground/80 hover:bg-foreground/10'
                  : 'bg-foreground/5 text-foreground/35 cursor-not-allowed opacity-60',
                'focus:ring-accent/40 focus:ring-2 focus:outline-none',
              )}
            >
              {copied.tags ? (
                <>
                  <CheckIcon size={16} weight="bold" className="text-accent" /> {t('copiedTags')}
                </>
              ) : (
                <>
                  <CopyIcon size={16} /> {t('copyTags')}
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className={cn(
                'border-foreground/10 bg-foreground/5 text-foreground/80 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs',
                'hover:bg-foreground/10 focus:ring-accent/40 focus:ring-2 focus:outline-none',
              )}
            >
              <DownloadSimpleIcon size={16} />{' '}
              <span className="hidden md:block">{t('download')}</span>
            </button>

            <button
              type="button"
              onClick={() => setResetOpen(true)}
              className={cn(
                'border-foreground/10 bg-foreground/5 text-foreground/80 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs',
                'hover:bg-foreground/10 focus:ring-accent/40 focus:ring-2 focus:outline-none',
              )}
            >
              <ArrowCounterClockwiseIcon size={16} />{' '}
              <span className="hidden md:block">{t('reset')}</span>
            </button>
          </div>
        </div>
      </section>

      <ConfirmModal
        open={resetOpen}
        title={t('modal.title')}
        description={t('modal.description')}
        confirmText={t('modal.confirm')}
        cancelText={t('modal.cancel')}
        onCancel={() => setResetOpen(false)}
        onConfirm={() => {
          reset();
          setResetOpen(false);
        }}
      />
    </>
  );
}
