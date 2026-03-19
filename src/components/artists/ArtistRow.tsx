// ArtistRow.tsx
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ArtistSuggestionWithImage } from '@/lib/suggestions/artists';

export default function ArtistRow({
  artist,
  isSelected,
  onApply,
}: {
  artist: ArtistSuggestionWithImage;
  isSelected: boolean;
  onApply: () => void;
}) {
  const preview = artist.tags.slice(0, 4).join(', ');

  return (
    <div
      className={cn(
        'border-foreground/10 bg-background flex items-center gap-3 rounded-xl border px-3 py-2',
        isSelected && 'border-accent/60',
      )}
    >
      <div className="border-foreground/10 bg-foreground/5 relative h-10 w-10 overflow-hidden rounded-lg border">
        <Image src={artist.image} alt={artist.artist} fill sizes="40px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-foreground/90 truncate text-xs font-semibold">{artist.artist}</p>
        <p className="text-foreground/55 line-clamp-2 text-xs">{preview}</p>
      </div>

      <button
        type="button"
        onClick={onApply}
        disabled={isSelected}
        className={cn(
          'rounded-xl border px-3 py-2 text-xs focus:ring-2 focus:outline-none',
          isSelected
            ? 'border-accent/40 bg-accent/10 text-accent cursor-default'
            : 'border-foreground/10 bg-foreground/5 text-foreground/85 hover:bg-foreground/10 focus:ring-accent/40',
        )}
      >
        {isSelected ? 'Selected' : 'Apply'}
      </button>
    </div>
  );
}
