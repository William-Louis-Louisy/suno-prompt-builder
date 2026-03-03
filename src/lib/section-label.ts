import type { SongSection, SectionType } from './song-types';

export const TYPE_LABEL: Record<Exclude<SectionType, 'custom'>, string> = {
  intro: 'Intro',
  verse: 'Verse',
  prechorus: 'Pre-Chorus',
  chorus: 'Chorus',
  bridge: 'Bridge',
  outro: 'Outro',
};

export function formatSectionTag(section: SongSection, order: SongSection[]): string {
  const base =
    section.type === 'custom' ? section.customLabel.trim() || 'Custom' : TYPE_LABEL[section.type];

  const shouldNumber =
    section.type === 'verse' || section.type === 'prechorus' || section.type === 'chorus';

  let numbered = base;

  if (shouldNumber) {
    let n = 0;
    for (const s of order) {
      if (s.id === section.id) break;
      if (s.type === section.type) n += 1;
    }
    numbered = `${base} ${n + 1}`;
  }

  const inst = section.instruction.trim();
  return inst ? `[${numbered} - ${inst}]` : `[${numbered}]`;
}
