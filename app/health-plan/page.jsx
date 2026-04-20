'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import AIChatModal from '@/components/AIChatModal';
import SortableInsightCard from '@/components/health-plan/SortableInsightCard';
import { HEALTH_PLAN_INSIGHTS, rebuildSectionOrder } from '@/app/lib/healthPlanInsights';

export default function HealthPlanPage() {
  const [items, setItems] = useState(() => [...HEALTH_PLAN_INSIGHTS]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInsight, setChatInsight] = useState(
    /** @type {{ title: string; paragraphs: string[] } | null} */ (null),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const pinnedItems = useMemo(() => items.filter((i) => i.section === 'pinned'), [items]);
  const recommendedItems = useMemo(() => items.filter((i) => i.section === 'recommended'), [items]);

  const pinnedIds = useMemo(() => pinnedItems.map((i) => i.id), [pinnedItems]);
  const recommendedIds = useMemo(() => recommendedItems.map((i) => i.id), [recommendedItems]);

  const handlePinnedDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = pinnedIds.indexOf(active.id);
      const newIndex = pinnedIds.indexOf(over.id);
      if (oldIndex < 0 || newIndex < 0) return;
      const newOrder = arrayMove(pinnedIds, oldIndex, newIndex);
      setItems((prev) => rebuildSectionOrder(prev, 'pinned', newOrder));
    },
    [pinnedIds],
  );

  const handleRecommendedDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = recommendedIds.indexOf(active.id);
      const newIndex = recommendedIds.indexOf(over.id);
      if (oldIndex < 0 || newIndex < 0) return;
      const newOrder = arrayMove(recommendedIds, oldIndex, newIndex);
      setItems((prev) => rebuildSectionOrder(prev, 'recommended', newOrder));
    },
    [recommendedIds],
  );

  const openChatForInsight = useCallback((item) => {
    setChatInsight({ title: item.title, paragraphs: item.paragraphs });
    setChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setChatOpen(false);
  }, []);

  return (
    <>
      <main className="flex flex-col gap-4 px-6 py-5">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold leading-9.5 text-primary">All Pinned</h2>
          <DndContext
            id="dnd-health-plan-pinned"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handlePinnedDragEnd}
          >
            <SortableContext
              id="sortable-health-plan-pinned"
              items={pinnedIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-4">
                {pinnedItems.map((item) => (
                  <SortableInsightCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    paragraphs={item.paragraphs}
                    tags={item.tags}
                    onAiClick={() => openChatForInsight(item)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold leading-9.5 text-primary">All Recommendation</h2>
          <DndContext
            id="dnd-health-plan-recommended"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleRecommendedDragEnd}
          >
            <SortableContext
              id="sortable-health-plan-recommended"
              items={recommendedIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-4">
                {recommendedItems.map((item) => (
                  <SortableInsightCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    paragraphs={item.paragraphs}
                    tags={item.tags}
                    onAiClick={() => openChatForInsight(item)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </main>
      <AIChatModal
        open={chatOpen}
        onClose={closeChat}
        recommendationTitle={chatInsight?.title ?? 'Health insight'}
        recommendationParagraphs={chatInsight?.paragraphs ?? []}
        inputPlaceholder={chatInsight ? `Ask about “${chatInsight.title.slice(0, 48)}…”` : 'Ask about...'}
      />
    </>
  );
}
