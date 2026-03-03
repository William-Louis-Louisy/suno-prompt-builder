'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import type { SectionType } from '@/lib/song-types';

const sectionsList: Array<{ name: string; type: SectionType }> = [
  { name: 'Intro', type: 'intro' },
  { name: 'Verse', type: 'verse' },
  { name: 'Pre-Chorus', type: 'prechorus' },
  { name: 'Chorus', type: 'chorus' },
  { name: 'Bridge', type: 'bridge' },
  { name: 'Outro', type: 'outro' },
  { name: 'Custom', type: 'custom' },
];

export function AddSectionTypePicker({
  value,
  onChange,
}: {
  value: SectionType;
  onChange: (v: SectionType) => void;
}) {
  const selected = sectionsList.find((x) => x.type === value) ?? sectionsList[1];

  return (
    <Listbox value={selected} onChange={(opt) => onChange(opt.type)}>
      <div className="relative">
        <ListboxButton
          className={cn(
            'border-foreground/10 bg-element hover:bg-element/90 flex w-full items-center justify-between gap-2 rounded-xl border',
            'text-foreground/80 px-3 py-2 text-xs',
            'focus:ring-accent/50 focus:ring-2 focus:outline-none',
          )}
        >
          <span className="truncate">{selected.name}</span>
          <CaretDownIcon size={16} className="text-foreground/60" />
        </ListboxButton>

        <ListboxOptions
          anchor="bottom end"
          className={cn(
            'border-foreground/10 bg-background absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border shadow-lg',
            'focus:outline-none',
          )}
        >
          {sectionsList.map((opt) => (
            <ListboxOption
              key={opt.type}
              value={opt}
              className={cn(
                'flex cursor-pointer items-center justify-between px-3 py-2 text-xs',
                'text-foreground/85 data-focus:bg-foreground/5',
              )}
            >
              <span className="truncate">{opt.name}</span>
              <span className="text-accent hidden data-selected:inline">
                <CheckIcon size={14} weight="bold" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
