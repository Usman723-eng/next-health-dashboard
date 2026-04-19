'use client';

import { useMemo, useState } from 'react';
import HealthRecommendationModal from '@/components/HealthRecommendationModal';

const DEFAULT_MODAL_CONTENT = [
  'At 29, your metabolic health score of 77/100 reflects a foundation that many people your age would envy. That said, a handful of biomarkers are signaling that your body is under some real physiological pressure, and given your stated goals of improving metabolic health and reducing cardiovascular risk, these are exactly the signals we want to act on now, before they compound.',
  'Let’s start with the good news: your core glycemic markers remain strong and your lipid profile has several positive signals. The priority now is to reduce the contributors that are dragging your broader metabolic resilience, especially thyroid stress pattern and micronutrient strain.',
  'Over the next 6-8 weeks, focus on sleep regularity, consistent resistance training, reducing alcohol, and targeted nutrition support. These actions can materially improve energy, body composition, and long-term cardiometabolic stability.',
];

export default function HealthRecommendationCard({
  title = 'Health Recommendation',
  paragraphs = [],
  showMoreLabel = 'Show More',
  onShowMore,
  modalTitle = 'Health Recommendation',
  modalBadgeText = 'AI Generated · Not Reviewed',
  modalSubtitle = 'Your Metabolic Health: A Genuinely Strong Core With a Few Signals Worth Addressing',
  modalContent,
  className = '',
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedContent = useMemo(
    () => (Array.isArray(modalContent) && modalContent.length ? modalContent : DEFAULT_MODAL_CONTENT),
    [modalContent]
  );

  const handleShowMore = () => {
    onShowMore?.();
    setIsExpanded(true);
  };

  return (
    <>
      <div
        className={`flex flex-col gap-3 rounded-3xl border border-border2 bg-surface py-4 px-6 ${className}`}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[22px] font-semibold leading-6.5 text-primary">{title}</h2>
          <button
            type="button"
            onClick={handleShowMore}
            className="shrink-0 text-sm leading-[100%] font-medium text-[#0772EB] cursor-pointer transition-opacity hover:opacity-80"
          >
            {showMoreLabel}
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-[100%] text-[#1C1917]">
              {p}
            </p>
          ))}
        </div>
      </div>
      <HealthRecommendationModal
        open={isExpanded}
        onClose={() => setIsExpanded(false)}
        title={modalTitle}
        badgeText={modalBadgeText}
        subtitle={modalSubtitle}
        content={expandedContent}
      />
    </>
  );
}