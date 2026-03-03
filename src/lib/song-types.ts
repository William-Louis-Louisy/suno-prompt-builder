export type SectionType =
  | 'intro'
  | 'verse'
  | 'prechorus'
  | 'chorus'
  | 'bridge'
  | 'outro'
  | 'custom';

export type VocalGender = 'male' | 'female' | 'unspecified';

export type SongSection = {
  id: string;
  type: SectionType;
  instruction: string;
  customLabel: string;
  lyrics: string;
};

export type SongMeta = {
  styles: string[];
  voiceTags: string[];
  vocalGender: VocalGender;
  excludeStyles: string[];
  constraintsNotes: string;
};

export type SongState = {
  title: string;
  sections: SongSection[];
  activeSectionId: string;
  meta: SongMeta;
};
