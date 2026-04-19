'use client';

import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/icons';

function ActionButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex h-9 items-center justify-center rounded-2xl px-4 text-base font-medium leading-4 cursor-pointer transition-opacity hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function HealthRecommendationModal({
  open,
  onClose,
  title = 'Health Recommendation',
  badgeText = 'AI Generated · Not Reviewed',
  subtitle = '',
  content = [],
  className = '',
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className={`fixed inset-0 z-[220] flex items-center justify-center p-4 ${className}`}>
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 cursor-pointer bg-black/30"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[92vh] w-full max-w-[1400px] flex-col overflow-hidden rounded-3xl border border-border2 bg-surface"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border2 px-8 py-4">
          <h2 id={titleId} className="text-[22px] font-semibold leading-[26px] text-primary">
            {title}
          </h2>
          <div className="flex items-center gap-3">
            <ActionButton className="bg-[#F5F5F5] text-[#171717]">Download</ActionButton>
            <ActionButton className="gap-1.5 border border-[#4818AF80] bg-[#E2D7FA] text-[#4818AF]">
              <Icon name="wearable-ai" size={16} color="currentColor" fill="none" />
              Ask AI
            </ActionButton>
          </div>
        </div>

        <div className="overflow-y-auto px-8 py-4">
          <div className="inline-flex items-center rounded-md bg-[#FFF4DF] px-2 py-0.5 text-[10.5px] font-medium leading-[100%] text-[#BD6600]">
            ✦ {badgeText}
          </div>
          {subtitle ? (
            <h3 className="mt-4 text-base font-semibold leading-[140%] text-[#181818]">{subtitle}</h3>
          ) : null}
          <div className="mt-3 flex flex-col gap-2.5">
            {content.map((block, idx) => (
              <p key={idx} className="text-[13px] font-normal leading-[155%] text-[#2E2E2E]">
                {block}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 text-sm font-semibold leading-5 text-primary cursor-pointer"
          >
            Show less
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

