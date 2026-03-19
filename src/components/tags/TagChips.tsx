'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { XIcon } from '@phosphor-icons/react';

export function TagChips({
  tags,
  onRemove,
  tone = 'default',
}: {
  tags: string[];
  onRemove?: (tag: string) => void;
  tone?: 'default' | 'accent';
}) {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={cn(
            'inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs',
            tone === 'accent'
              ? 'border-accent/30 bg-accent/10 text-foreground/90'
              : 'border-foreground/10 bg-foreground/5 text-foreground/85',
          )}
        >
          <span className="max-w-55 truncate">{tag}</span>

          {onRemove ? (
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
          ) : null}
        </span>
      ))}
    </div>
  );
}
