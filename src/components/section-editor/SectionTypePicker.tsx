'use client';
import { cn } from '@/lib/utils';
import { SectionType } from '@/lib/song-types';
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

const SECTION_TYPES: Array<{ label: string; value: SectionType }> = [
  { label: 'Intro', value: 'intro' },
  { label: 'Verse', value: 'verse' },
  { label: 'Pre-Chorus', value: 'prechorus' },
  { label: 'Chorus', value: 'chorus' },
  { label: 'Bridge', value: 'bridge' },
  { label: 'Outro', value: 'outro' },
  { label: 'Custom', value: 'custom' },
];

export default function SectionTypePicker({
  value,
  onChange,
}: {
  value: SectionType;
  onChange: (v: SectionType) => void;
}) {
  const selected = SECTION_TYPES.find((x) => x.value === value) ?? SECTION_TYPES[1];

  return (
    <Listbox value={selected} onChange={(opt) => onChange(opt.value)}>
      <div className="relative">
        <ListboxButton
          className={cn(
            'border-foreground/10 bg-element flex w-full items-center justify-between gap-2 rounded-xl border',
            'text-foreground/85 px-3 py-2 text-xs',
            'focus:ring-accent/50 focus:ring-2 focus:outline-none',
          )}
        >
          <span className="truncate">{selected.label}</span>
          <CaretDownIcon size={16} className="text-foreground/60" />
        </ListboxButton>

        <ListboxOptions
          className={cn(
            'border-foreground/10 bg-background absolute z-50 mt-2 w-full overflow-hidden rounded-xl border shadow-lg',
            'focus:outline-none',
          )}
        >
          {SECTION_TYPES.map((opt) => (
            <ListboxOption
              key={opt.value}
              value={opt}
              className={cn(
                'flex cursor-pointer items-center justify-between px-3 py-2 text-xs',
                'text-foreground/85 data-focus:bg-foreground/5',
              )}
            >
              {({ selected }) => (
                <>
                  <span className="truncate">{opt.label}</span>
                  {selected ? (
                    <CheckIcon size={14} weight="bold" className="text-accent" />
                  ) : (
                    <span className="w-3.5" />
                  )}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
