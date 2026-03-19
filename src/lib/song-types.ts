export type SectionType =
  | 'intro'
  | 'verse'
  | 'prechorus'
  | 'chorus'
  | 'bridge'
  | 'outro'
  | 'custom';

export type VocalGender = 'male' | 'female' | 'unspecified';

export type SongMeta = {
  manualStyles: string[];
  manualVoiceTags: string[];
  vocalGenderOverride: VocalGender | null;

  selectedArtistId: string | null;
  artistStyles: string[];
  artistVoiceTags: string[];
  artistVocalGender: VocalGender | null;

  excludeStyles: string[];
  constraintsNotes: string;
};

export type SongSection = {
  id: string;
  type: SectionType;
  instruction: string;
  customLabel: string;
  lyrics: string;
};

export type SongState = {
  title: string;
  sections: SongSection[];
  activeSectionId: string;
  meta: SongMeta;
};
