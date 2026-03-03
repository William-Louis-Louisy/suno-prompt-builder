'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useSongStore } from '@/lib/song-store';
import TagInputCombobox from '../tags/TagInputCombobox';
import { VOICE_SUGGESTIONS } from '@/lib/suggestions/voice';

import type { VocalGender } from '@/lib/song-types';

function GenderToggle({
  value,
  onChange,
}: {
  value: VocalGender;
  onChange: (v: VocalGender) => void;
}) {
  const opts: Array<{ label: string; value: VocalGender }> = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  return (
    <div
      className={cn(
        'border-foreground/10 bg-element grid grid-cols-2 rounded-xl border p-1',
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
                ? 'bg-foreground/10 text-foreground'
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
  const vocalGender = useSongStore((s) => s.meta.vocalGender);
  const voiceTags = useSongStore((s) => s.meta.voiceTags);

  const setVocalGender = useSongStore((s) => s.setVocalGender);
  const addVoiceTag = useSongStore((s) => s.addVoiceTag);
  const removeVoiceTag = useSongStore((s) => s.removeVoiceTag);

  return (
    <section className="section">
      <header className="mb-3">
        <h2 className="text-foreground/95 text-sm font-semibold">{t('title')}</h2>
        <p className="text-foreground/55 mt-1 text-xs">{t('description')}</p>
      </header>

      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-foreground/60 text-xs">{t('gender')}</p>
          <GenderToggle value={vocalGender} onChange={setVocalGender} />
        </div>

        <TagInputCombobox
          label={t('comboLabel')}
          value={voiceTags}
          suggestions={[...VOICE_SUGGESTIONS]}
          onAdd={addVoiceTag}
          onRemove={removeVoiceTag}
          placeholder="interesting, bass guitars, swedish rock, captivating…"
          noTags={t('noTags')}
        />
      </div>
    </section>
  );
}
