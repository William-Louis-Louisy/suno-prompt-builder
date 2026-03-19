'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useSongStore } from '@/lib/song-store';
import TagInputCombobox from '../tags/TagInputCombobox';
import { VOICE_SUGGESTIONS } from '@/lib/suggestions/voice';

import type { VocalGender } from '@/lib/song-types';

function mergeUnique(a: string[], b: string[]) {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const t of [...a, ...b]) {
    const k = t.toLowerCase();
    if (!seen.has(k)) {
      seen.add(k);
      out.push(t);
    }
  }
  return out;
}

function GenderToggle({
  value,
  onChange,
}: {
  value: VocalGender;
  onChange: (v: VocalGender) => void;
}) {
  const opts: Array<{ label: string; value: VocalGender }> = [
    { label: 'Auto', value: 'unspecified' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  return (
    <div
      className={cn(
        'border-foreground/10 bg-element grid grid-cols-3 rounded-xl border',
        'text-xs',
      )}
      role="tablist"
      aria-label="Vocal gender"
    >
      {opts.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              'rounded-lg px-2 py-2 transition-colors',
              'focus:ring-accent/50 focus:ring-2 focus:outline-none',
              active
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'text-foreground/70 hover:bg-foreground/5',
            )}
            aria-pressed={active}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function VoicePanel() {
  const t = useTranslations('VoicePanel');

  const meta = useSongStore((s) => s.meta);

  const addVoiceTag = useSongStore((s) => s.addVoiceTag);
  const removeVoiceTag = useSongStore((s) => s.removeVoiceTag);
  const setVocalGenderOverride = useSongStore((s) => s.setVocalGenderOverride);

  const effectiveGender: VocalGender = (meta.vocalGenderOverride ??
    meta.artistVocalGender ??
    'unspecified') as VocalGender;

  const allVoiceTags = React.useMemo(
    () => mergeUnique(meta.artistVoiceTags, meta.manualVoiceTags),
    [meta.artistVoiceTags, meta.manualVoiceTags],
  );

  return (
    <section className="section">
      <header className="mb-3">
        <h2 className="text-foreground/95 text-sm font-semibold">{t('title')}</h2>
        <p className="text-foreground/55 mt-1 text-xs">{t('description')}</p>
      </header>

      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-foreground/60 text-xs">{t('gender')}</p>

          <GenderToggle
            value={effectiveGender}
            onChange={(v) => setVocalGenderOverride(v === 'unspecified' ? null : v)}
          />

          {meta.artistVocalGender ? (
            <p className="text-foreground/40 text-xs">
              {t('autoHint', { gender: meta.artistVocalGender })}
            </p>
          ) : (
            <p className="text-foreground/40 text-xs">{t('autoHintNone')}</p>
          )}
        </div>

        <TagInputCombobox
          label={t('comboLabel')}
          value={meta.manualVoiceTags}
          taken={allVoiceTags}
          suggestions={[...VOICE_SUGGESTIONS]}
          onAdd={addVoiceTag}
          onRemove={removeVoiceTag}
          placeholder="warm, breathy, intimate, light reverb…"
          noTags={t('noTags')}
        />
      </div>
    </section>
  );
}
