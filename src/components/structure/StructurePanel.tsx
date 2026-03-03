'use client';

import {
  useSensor,
  useSensors,
  DndContext,
  PointerSensor,
  closestCenter,
  KeyboardSensor,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableRow from './SortableRow';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSongStore } from '@/lib/song-store';
import type { SectionType } from '@/lib/song-types';
import { formatSectionTag } from '@/lib/section-label';
import { AddSectionTypePicker } from './AddSectionTypePicker';

export default function StructurePanel() {
  const t = useTranslations('StructurePanel');
  const [nextType, setNextType] = useState<SectionType>('verse');
  const sections = useSongStore((s) => s.sections);
  const activeSectionId = useSongStore((s) => s.activeSectionId);
  const setActiveSection = useSongStore((s) => s.setActiveSection);
  const addSection = useSongStore((s) => s.addSection);
  const duplicateSection = useSongStore((s) => s.duplicateSection);
  const deleteSection = useSongStore((s) => s.deleteSection);
  const reorderSections = useSongStore((s) => s.reorderSections);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const labels = useMemo(() => {
    const m = new Map<string, string>();
    for (const sec of sections) m.set(sec.id, formatSectionTag(sec, sections));
    return m;
  }, [sections]);

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over) return;
    if (active.id === over.id) return;
    reorderSections(String(active.id), String(over.id));
  }

  return (
    <section className="section">
      <header className="mb-3">
        <h2 className="text-foreground/95 text-sm font-semibold">{t('title')}</h2>
        <p className="text-foreground/55 mt-1 text-xs">{t('description')}</p>
      </header>

      <div className="border-foreground/10 bg-element rounded-2xl border p-3">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {sections.map((sec) => (
                <SortableRow
                  key={sec.id}
                  section={sec}
                  label={labels.get(sec.id) ?? '[Section]'}
                  isActive={sec.id === activeSectionId}
                  onSelect={() => setActiveSection(sec.id)}
                  onDuplicate={() => duplicateSection(sec.id)}
                  onDelete={() => deleteSection(sec.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => addSection('verse')}
          className="border-foreground/10 bg-element text-foreground/90 hover:bg-element/90 focus:ring-accent/50 col-span-2 flex-1 rounded-xl border px-3 py-2 text-xs focus:ring-2 focus:outline-none"
        >
          {t('addSection')}
        </button>

        <AddSectionTypePicker value={nextType} onChange={setNextType} />
      </div>
    </section>
  );
}
