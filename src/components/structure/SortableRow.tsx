'use client';
import { cn } from '@/lib/utils';
import { CSS } from '@dnd-kit/utilities';
import { useTranslations } from 'next-intl';
import { SongSection } from '@/lib/song-types';
import { useSortable } from '@dnd-kit/sortable';
import { ListIcon, RadioButtonIcon, TrashIcon } from '@phosphor-icons/react';

export default function SortableRow({
  section,
  label,
  isActive,
  onSelect,
  onDuplicate,
  onDelete,
}: {
  section: SongSection;
  label: string;
  isActive: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const t = useTranslations('StructurePanel');
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group flex items-center gap-2 rounded-xl border px-3 py-2',
        isActive ? 'border-accent/70 bg-alternative' : 'bg-element border-foreground/10',
        isDragging && 'opacity-70',
      )}
    >
      <button
        type="button"
        className={cn(
          'text-foreground/60 hover:text-foreground/85 cursor-grab touch-none rounded-lg select-none',
          'focus:ring-accent/50 focus:ring-2 focus:outline-none active:cursor-grabbing',
        )}
        aria-label="Drag handle"
        {...attributes}
        {...listeners}
      >
        <ListIcon size={20} />
      </button>

      <button
        type="button"
        onClick={onSelect}
        className={cn(
          'text-foreground/90 flex-1 text-left font-mono text-[13px] leading-5',
          'rounded-lg',
        )}
        aria-label="Select section"
      >
        {label}
      </button>

      <div
        className={cn(
          'flex items-center gap-1 transition-opacity',
          isActive ? 'opacity-100' : 'hidden md:flex md:opacity-0 md:group-hover:opacity-100',
        )}
      >
        <button
          type="button"
          onClick={onDuplicate}
          className="border-foreground/10 bg-element text-foreground/80 hover:bg-foreground/10 focus:ring-accent/50 cursor-pointer rounded-lg border px-2 py-1 text-xs focus:ring-2 focus:outline-none"
          aria-label="Duplicate section"
        >
          {t('duplicate')}
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="border-foreground/10 bg-element hover:bg-foreground/10 focus:ring-accent/50 cursor-pointer rounded-lg border px-2 py-1 text-xs text-red-500 focus:ring-2 focus:outline-none"
          aria-label="Delete section"
          title={t('delete')}
        >
          <TrashIcon size={16} />
        </button>
      </div>

      {isActive ? (
        <span className="text-accent ml-1">
          <RadioButtonIcon size={16} weight="fill" />
        </span>
      ) : null}
    </div>
  );
}
