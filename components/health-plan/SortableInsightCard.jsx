'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import HealthInsightCard from '@/components/HealthInsightCard';
import Icon from '@/icons';

export default function SortableInsightCard({ id, ...cardProps }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.92 : 1,
    zIndex: isDragging ? 20 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative pl-5">
      <button
        type="button"
        className="flex h-10 w-10 absolute top-1/2 -translate-y-1/2 left-0 shrink-0 cursor-grab touch-none items-center justify-center rounded-md border border-transparent text-[#9CA3AF] transition-colors hover:border-border2 hover:bg-gray-50 hover:text-primary active:cursor-grabbing"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        <span className="pointer-events-none text-inherit" aria-hidden>
          <Icon name="sortable" size={32} color="currentColor" fill="currentColor" />
        </span>
      </button>
      <HealthInsightCard {...cardProps} />
    </div>
  );
}
