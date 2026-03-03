'use client';

import * as React from 'react';
import ExportBlock from './ExportBloc';
import { useTranslations } from 'next-intl';
import { useSongStore } from '@/lib/song-store';
import { cn, downloadTextFile } from '@/lib/utils';
import { CheckIcon, CopyIcon, DownloadSimpleIcon } from '@phosphor-icons/react';
import { buildTagsText, buildExcludeText, buildStructuredLyrics } from '@/lib/song-export';

type BlockKey = 'lyrics' | 'tags' | 'advanced' | 'all';

export default function ExportPanel() {
  const t = useTranslations('ExportPanel');
  const title = useSongStore((s) => s.title);
  const [manualCopy, setManualCopy] = React.useState<{
    title: string;
    text: string;
  } | null>(null);
  const sections = useSongStore((s) => s.sections);
  const meta = useSongStore((s) => s.meta);

  const lyricsText = React.useMemo(() => buildStructuredLyrics(sections), [sections]);
  const tagsText = React.useMemo(() => buildTagsText(meta), [meta]);
  const advancedText = React.useMemo(() => buildExcludeText(meta), [meta]);

  const allText = React.useMemo(() => {
    return [
      '=== LYRICS ===',
      lyricsText,
      '',
      '=== TAGS ===',
      tagsText,
      '',
      '=== ADVANCED ===',
      advancedText,
    ]
      .join('\n')
      .trim();
  }, [lyricsText, tagsText, advancedText]);

  const [copied, setCopied] = React.useState<Record<BlockKey, boolean>>({
    lyrics: false,
    tags: false,
    advanced: false,
    all: false,
  });

  function flash(key: BlockKey) {
    setCopied((s) => ({ ...s, [key]: true }));
    window.setTimeout(() => setCopied((s) => ({ ...s, [key]: false })), 1200);
  }

  async function handleCopy(key: BlockKey) {
    const payload =
      key === 'lyrics'
        ? lyricsText
        : key === 'tags'
          ? tagsText
          : key === 'advanced'
            ? advancedText
            : allText;

    try {
      await navigator.clipboard.writeText(payload);
      flash(key);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      setManualCopy({
        title:
          key === 'lyrics'
            ? 'Structured Lyrics'
            : key === 'tags'
              ? 'Tags'
              : key === 'advanced'
                ? 'Advanced'
                : 'Copy all',
        text: payload,
      });
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
    <section className="section md:divide-foreground/10 md:divide-y">
      <header className="mb-3 flex items-start justify-between gap-3 pb-3">
        <div>
          <h2 className="text-foreground/95 text-sm font-semibold">{t('title')}</h2>
          <p className="text-foreground/55 mt-1 text-xs">{t('description')}</p>
        </div>

        <div className="flex flex-row gap-4">
          <button
            type="button"
            onClick={() => handleCopy('all')}
            className={cn(
              'border-foreground/10 bg-foreground/5 inline-flex items-center gap-2 rounded-xl border px-3 py-2',
              'text-foreground/80 hover:bg-foreground/10 text-xs',
              'focus:ring-accent/40 focus:ring-2 focus:outline-none',
            )}
          >
            {copied.all ? (
              <>
                <CheckIcon size={16} weight="bold" className="text-accent" />
                <span className="hidden md:block">{t('copiedAll')}</span>
              </>
            ) : (
              <>
                <CopyIcon size={16} />
                <span className="hidden md:block">{t('copyAll')}</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className={cn(
              'border-foreground/10 bg-foreground/5 inline-flex items-center gap-2 rounded-xl border px-3 py-2',
              'text-foreground/80 hover:bg-foreground/10 text-xs',
              'focus:ring-accent/40 focus:ring-2 focus:outline-none',
            )}
          >
            <DownloadSimpleIcon size={16} />{' '}
            <span className="hidden md:block">{t('downloadTxt')}</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ExportBlock
          title={t('structuredLyrics')}
          text={lyricsText}
          onCopy={() => handleCopy('lyrics')}
          copied={copied.lyrics}
        />
        <ExportBlock
          title={t('tags')}
          text={tagsText}
          onCopy={() => handleCopy('tags')}
          copied={copied.tags}
        />
        {/* <ExportBlock
          title={t('advanced')}
          text={advancedText}
          onCopy={() => handleCopy("advanced")}
          copied={copied.advanced}
        /> */}
      </div>

      {manualCopy ? (
        <div className="border-foreground/10 bg-element mt-4 rounded-2xl border p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-foreground/90 text-xs font-semibold">
                {t('clipboardBlocked', { title: manualCopy.title })}
              </p>
              <p className="text-foreground/50 mt-1 text-[11px]">{t('ctrlC')}</p>
            </div>
            <button
              type="button"
              onClick={() => setManualCopy(null)}
              className="border-foreground/10 bg-foreground/5 text-foreground/80 hover:bg-foreground/10 focus:ring-accent/40 rounded-xl border px-3 py-2 text-xs focus:ring-2 focus:outline-none"
            >
              {t('close')}
            </button>
          </div>

          <textarea
            readOnly
            value={manualCopy.text}
            onFocus={(e) => e.currentTarget.select()}
            className={cn(
              'border-foreground/10 bg-background/40 mt-3 min-h-35 w-full resize-y rounded-xl border p-3',
              'text-foreground/85 font-mono text-[12px] leading-5',
              'focus:ring-accent/40 focus:ring-2 focus:outline-none',
            )}
          />
        </div>
      ) : null}
    </section>
  );
}
