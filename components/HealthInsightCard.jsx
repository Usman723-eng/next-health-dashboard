'use client';

import { useId, useMemo, useState } from 'react';
import Icon from '@/icons';

const LONG_SINGLE_PARA = 200;

export default function HealthInsightCard({
  title,
  paragraphs,
  tags,
  onPinClick,
  onAiClick,
  className = '',
}) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  const safeParas = useMemo(() => (paragraphs ?? []).filter(Boolean), [paragraphs]);

  const needsToggle = useMemo(() => {
    if (safeParas.length > 1) return true;
    if (safeParas.length === 1 && safeParas[0].length > LONG_SINGLE_PARA) return true;
    return false;
  }, [safeParas]);

  const visibleParas = useMemo(() => {
    if (expanded || !needsToggle) return safeParas;
    if (safeParas.length > 1) return [safeParas[0]];
    return safeParas;
  }, [expanded, needsToggle, safeParas]);

  const singleParaClamp = !expanded && needsToggle && safeParas.length === 1;

  return (
    <article
      className={`flex flex-col gap-3 rounded-3xl border border-[#D1D1D1] bg-white px-6 py-4 shadow-xs ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="min-w-0 flex-1 text-[22px] font-semibold leading-[1.18] text-primary">{title}</h2>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-[#888888] transition-colors hover:text-primary"
            aria-label="Pin"
            onClick={onPinClick}
          >
            <Icon name="wearable-pin" size={20} color="#888888" fill="none" />
          </button>
          <button
            type="button"
            className="flex h-6 cursor-pointer items-center justify-center rounded-md border px-2 py-1 transition-colors hover:opacity-90"
            style={{
              backgroundColor: '#E2D7FA',
              borderColor: 'rgba(72, 24, 175, 0.50)',
            }}
            aria-label="AI insights"
            onClick={onAiClick}
          >
            <Icon name="wearable-ai" size={16} color="#4818AF" fill="none" />
          </button>
        </div>
      </div>

      <div
        id={contentId}
        className={`flex flex-col gap-3 text-sm leading-[1.21] text-[#1C1917] ${singleParaClamp ? 'line-clamp-6' : ''}`}
      >
        {visibleParas.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {needsToggle && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="cursor-pointer text-sm font-medium text-[#0772EB] transition-colors hover:opacity-80"
            aria-expanded={expanded}
            aria-controls={contentId}
          >
            {expanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        {(tags ?? []).map((tag) => (
          <span
            key={tag}
            className="inline-flex h-5 items-center rounded-full bg-[#F2F5F9] px-2 text-xs font-medium leading-none text-[#384151]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
