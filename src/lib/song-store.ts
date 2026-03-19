'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { uid } from './id';
import type { SectionType, SongSection, SongState, VocalGender } from './song-types';

type SongActions = {
  setTitle: (title: string) => void;

  setActiveSection: (id: string) => void;

  addSection: (type?: SectionType) => void;
  duplicateSection: (id: string) => void;
  deleteSection: (id: string) => void;
  reorderSections: (activeId: string, overId: string) => void;

  updateSection: (id: string, patch: Partial<Omit<SongSection, 'id'>>) => void;

  setSectionType: (id: string, type: SectionType) => void;

  // MANUAL tags
  addStyleTag: (tag: string) => void;
  removeStyleTag: (tag: string) => void;

  addVoiceTag: (tag: string) => void;
  removeVoiceTag: (tag: string) => void;

  // ARTIST preset
  applyArtistPreset: (artist: { id: string; tags: string[] }) => void;
  clearArtistPreset: () => void;

  // Gender
  setVocalGenderOverride: (value: VocalGender | null) => void;

  // (Optional - currently unused in UI, kept for later)
  addExcludeStyle: (tag: string) => void;
  removeExcludeStyle: (tag: string) => void;
  setConstraintsNotes: (notes: string) => void;

  reset: () => void;
};

const initialSections = (): SongSection[] => [
  { id: uid(), type: 'intro', instruction: '', customLabel: '', lyrics: '' },
  { id: uid(), type: 'chorus', instruction: '', customLabel: '', lyrics: '' },
  { id: uid(), type: 'verse', instruction: '', customLabel: '', lyrics: '' },
];

function buildInitialState(): SongState {
  const secs = initialSections();
  return {
    title: '',
    sections: secs,
    activeSectionId: secs[0]!.id,
    meta: {
      manualStyles: [],
      manualVoiceTags: [],
      vocalGenderOverride: null,

      selectedArtistId: null,
      artistStyles: [],
      artistVoiceTags: [],
      artistVocalGender: null,

      excludeStyles: [],
      constraintsNotes: '',
    },
  };
}

function normalizeTag(raw: string) {
  return raw.trim().replace(/\s+/g, ' ');
}

function isVoiceTag(tag: string) {
  return /\bvocals?\b/i.test(tag);
}

function detectGender(tag: string): 'male' | 'female' | null {
  if (/\bfemale vocals\b/i.test(tag)) return 'female';
  if (/\bmale vocals\b/i.test(tag)) return 'male';
  return null;
}

function uniquePush(list: string[], tag: string) {
  const t = normalizeTag(tag);
  if (!t) return list;
  const exists = list.some((x) => x.toLowerCase() === t.toLowerCase());
  return exists ? list : [...list, t];
}

function uniqueRemove(list: string[], tag: string) {
  const t = normalizeTag(tag).toLowerCase();
  return list.filter((x) => x.toLowerCase() !== t);
}

export const useSongStore = create<SongState & SongActions>()(
  persist(
    (set) => {
      const initialState = buildInitialState();

      return {
        ...initialState,

        setActiveSection: (id) => set({ activeSectionId: id }),

        setTitle: (title) => set({ title }),

        addSection: (type = 'verse') =>
          set((s) => {
            const newSection: SongSection = {
              id: uid(),
              type,
              instruction: '',
              customLabel: '',
              lyrics: '',
            };
            return {
              sections: [...s.sections, newSection],
              activeSectionId: newSection.id,
            };
          }),

        duplicateSection: (id) =>
          set((s) => {
            const idx = s.sections.findIndex((x) => x.id === id);
            if (idx === -1) return s;
            const src = s.sections[idx];
            const copy: SongSection = { ...src, id: uid() };
            const next = [...s.sections.slice(0, idx + 1), copy, ...s.sections.slice(idx + 1)];
            return { sections: next, activeSectionId: copy.id };
          }),

        deleteSection: (id) =>
          set((s) => {
            if (s.sections.length <= 1) return s;
            const idx = s.sections.findIndex((x) => x.id === id);
            if (idx === -1) return s;
            const next = s.sections.filter((x) => x.id !== id);
            const nextActive =
              s.activeSectionId === id
                ? (next[Math.max(0, idx - 1)]?.id ?? next[0]!.id)
                : s.activeSectionId;
            return { sections: next, activeSectionId: nextActive };
          }),

        reorderSections: (activeId, overId) =>
          set((s) => {
            if (activeId === overId) return s;
            const from = s.sections.findIndex((x) => x.id === activeId);
            const to = s.sections.findIndex((x) => x.id === overId);
            if (from === -1 || to === -1) return s;

            const next = [...s.sections];
            const [moved] = next.splice(from, 1);
            next.splice(to, 0, moved);
            return { sections: next };
          }),

        updateSection: (id, patch) =>
          set((s) => ({
            sections: s.sections.map((sec) => (sec.id === id ? { ...sec, ...patch } : sec)),
          })),

        setSectionType: (id, type) =>
          set((s) => ({
            sections: s.sections.map((sec) => {
              if (sec.id !== id) return sec;

              if (type === 'custom') {
                const nextLabel = sec.customLabel.trim() ? sec.customLabel : 'Custom';
                return { ...sec, type, customLabel: nextLabel };
              }

              return { ...sec, type };
            }),
          })),

        // MANUAL styles
        addStyleTag: (tag) =>
          set((s) => ({
            meta: { ...s.meta, manualStyles: uniquePush(s.meta.manualStyles, tag) },
          })),
        removeStyleTag: (tag) =>
          set((s) => ({
            meta: { ...s.meta, manualStyles: uniqueRemove(s.meta.manualStyles, tag) },
          })),

        // MANUAL voice tags
        addVoiceTag: (tag) =>
          set((s) => ({
            meta: { ...s.meta, manualVoiceTags: uniquePush(s.meta.manualVoiceTags, tag) },
          })),
        removeVoiceTag: (tag) =>
          set((s) => ({
            meta: { ...s.meta, manualVoiceTags: uniqueRemove(s.meta.manualVoiceTags, tag) },
          })),

        // ARTIST preset (replaces only artist* fields, preserves manual* fields)
        applyArtistPreset: (artist) =>
          set((s) => {
            const artistStyles: string[] = [];
            const artistVoiceTags: string[] = [];
            let artistVocalGender: VocalGender | null = null;

            for (const raw of artist.tags) {
              const tag = normalizeTag(raw);
              if (!tag) continue;

              const g = detectGender(tag);
              if (g) artistVocalGender = g;

              if (isVoiceTag(tag)) {
                if (!artistVoiceTags.some((x) => x.toLowerCase() === tag.toLowerCase())) {
                  artistVoiceTags.push(tag);
                }
              } else {
                if (!artistStyles.some((x) => x.toLowerCase() === tag.toLowerCase())) {
                  artistStyles.push(tag);
                }
              }
            }

            return {
              meta: {
                ...s.meta,
                selectedArtistId: artist.id,
                artistStyles,
                artistVoiceTags,
                artistVocalGender,
              },
            };
          }),

        clearArtistPreset: () =>
          set((s) => ({
            meta: {
              ...s.meta,
              selectedArtistId: null,
              artistStyles: [],
              artistVoiceTags: [],
              artistVocalGender: null,
            },
          })),

        // Gender override (null = auto)
        setVocalGenderOverride: (value) =>
          set((s) => ({ meta: { ...s.meta, vocalGenderOverride: value } })),

        // Optional fields for later
        addExcludeStyle: (tag) =>
          set((s) => ({
            meta: {
              ...s.meta,
              excludeStyles: uniquePush(s.meta.excludeStyles, tag),
            },
          })),
        removeExcludeStyle: (tag) =>
          set((s) => ({
            meta: {
              ...s.meta,
              excludeStyles: uniqueRemove(s.meta.excludeStyles, tag),
            },
          })),
        setConstraintsNotes: (notes) =>
          set((s) => ({ meta: { ...s.meta, constraintsNotes: notes } })),

        reset: () => set(() => buildInitialState()),
      };
    },
    {
      name: 'suno-prompt-builder.current',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        title: s.title,
        sections: s.sections,
        activeSectionId: s.activeSectionId,
        meta: s.meta,
      }),
      migrate: (persisted: any, fromVersion: number) => {
        if (fromVersion === 1 && persisted?.meta) {
          const old = persisted.meta;

          return {
            ...persisted,
            meta: {
              manualStyles: old.styles ?? [],
              manualVoiceTags: old.voiceTags ?? [],
              vocalGenderOverride: null,

              selectedArtistId: null,
              artistStyles: [],
              artistVoiceTags: [],
              artistVocalGender: null,

              excludeStyles: old.excludeStyles ?? [],
              constraintsNotes: old.constraintsNotes ?? '',
            },
          };
        }

        return persisted;
      },
    },
  ),
);
