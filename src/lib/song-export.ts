import { SongSection, SongMeta, SectionType } from './song-types';

const TYPE_LABEL: Record<Exclude<SectionType, 'custom'>, string> = {
  intro: 'Intro',
  verse: 'Verse',
  prechorus: 'Pre-Chorus',
  chorus: 'Chorus',
  bridge: 'Bridge',
  outro: 'Outro',
};

function computeSectionLabel(section: SongSection, order: SongSection[]): string {
  const base =
    section.type === 'custom' ? section.customLabel.trim() || 'Custom' : TYPE_LABEL[section.type];

  // Number verses, prechoruses, and choruses based on their order in the song
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

export function buildStructuredLyrics(sections: SongSection[]): string {
  return sections
    .map((s) => {
      const label = computeSectionLabel(s, sections);
      const body = (s.lyrics ?? '').trimEnd();
      return `${label}\n${body}`.trimEnd();
    })
    .join('\n\n')
    .trim();
}

export function buildTagsText(meta: SongMeta): string {
  const styles = meta.styles;
  const voice = meta.voiceTags;

  const lines: string[] = [];

  if (styles.length) lines.push(`Styles: ${styles.join(', ')}`);
  if (voice.length) lines.push(`Voice: ${voice.join(', ')}`);

  if (meta.vocalGender !== 'unspecified') {
    lines.push(`Vocal gender: ${meta.vocalGender}`);
  }

  return lines.join('\n').trim();
}

export function buildExcludeText(meta: SongMeta): string {
  const ex = meta.excludeStyles.join(', ');
  const notes = meta.constraintsNotes.trim();
  return [
    ex ? `Exclude styles: ${ex}` : 'Exclude styles:',
    notes ? `Constraints: ${notes}` : 'Constraints:',
  ].join('\n');
}
