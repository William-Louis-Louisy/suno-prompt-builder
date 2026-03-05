'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { XIcon } from '@phosphor-icons/react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';

type Props = {
  label?: string;
  placeholder?: string;
  value: string[];
  suggestions: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  disabled?: boolean;
  noTags?: string;
};

function normalizeTag(raw: string) {
  return raw.trim().replace(/\s+/g, ' ');
}

function startsWithCI(value: string, query: string) {
  return value.toLowerCase().startsWith(query.toLowerCase());
}

export default function TagInputCombobox({
  label,
  placeholder = 'Add a tag…',
  value,
  suggestions,
  onAdd,
  onRemove,
  disabled,
  noTags = 'No tags yet.',
}: Props) {
  const [query, setQuery] = React.useState('');

  const normalizedValue = React.useMemo(
    () => value.map((v) => normalizeTag(v)).filter(Boolean),
    [value],
  );

  const filteredSuggestions = React.useMemo(() => {
    const q = normalizeTag(query);
    const already = new Set(normalizedValue.map((t) => t.toLowerCase()));

    const base = suggestions
      .map((s) => normalizeTag(s))
      .filter(Boolean)
      .filter((s) => !already.has(s.toLowerCase()));

    if (!q) return base.slice(0, 12);

    return base.filter((s) => startsWithCI(s, q)).slice(0, 12);
  }, [query, suggestions, normalizedValue]);

  function commit(raw: string) {
    const tag = normalizeTag(raw);
    if (!tag) return;

    onAdd(tag);
    setQuery('');
  }

  return (
    <div className="space-y-2">
      {label ? <p className="text-foreground/60 text-xs">{label}</p> : null}

      <Combobox<string | null>
        value={query}
        onChange={(selected) => {
          if (!selected) {
            setQuery('');
            return;
          }

          commit(selected);
        }}
        disabled={disabled}
      >
        <div className="relative">
          <ComboboxInput
            value={query}
            enterKeyHint="done"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                e.stopPropagation();
                commit(query);
                return;
              }

              if (e.key === 'Backspace' && query.length === 0 && normalizedValue.length > 0) {
                onRemove(normalizedValue[normalizedValue.length - 1]!);
              }
            }}
            placeholder={placeholder}
            className={cn(
              'border-foreground/10 bg-element text-foreground/90 w-full rounded-xl border px-3 py-2 text-xs',
              'placeholder:text-foreground/40 focus:ring-accent/50 focus:ring-2 focus:outline-none',
              disabled && 'opacity-60',
            )}
          />

          {filteredSuggestions.length > 0 && query.trim().length > 0 ? (
            <ComboboxOptions
              modal={false}
              portal={false}
              className={cn(
                'border-foreground/10 bg-background absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border shadow-lg',
                'focus:outline-none',
              )}
            >
              {filteredSuggestions.map((suggestion) => (
                <ComboboxOption
                  key={suggestion}
                  value={suggestion}
                  className={cn(
                    'text-foreground/85 cursor-pointer px-3 py-2 text-xs',
                    'data-focus:bg-foreground/5',
                  )}
                >
                  {suggestion}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          ) : null}
        </div>
      </Combobox>

      {normalizedValue.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {normalizedValue.map((tag) => (
            <span
              key={tag}
              className={cn(
                'border-foreground/10 bg-foreground/5 inline-flex items-center gap-1 rounded-full border',
                'text-foreground/85 px-2 py-1 text-xs',
              )}
            >
              <span className="max-w-55 truncate">{tag}</span>

              <button
                type="button"
                onClick={() => onRemove(tag)}
                className={cn(
                  'text-foreground/60 hover:bg-foreground/10 hover:text-foreground/80 rounded-full p-1',
                  'focus:ring-accent/40 focus:ring-2 focus:outline-none',
                )}
                aria-label={`Remove ${tag}`}
              >
                <XIcon size={12} />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-foreground/40 text-xs">{noTags}</p>
      )}
    </div>
  );
}
