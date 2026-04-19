'use client';

import { SCORE_VARIANTS } from './scoreStatusVariants';

const SIZE_STYLES = {
  md: 'min-h-7 px-4 py-1 text-secondary-size font-semibold leading-5',
  sm: 'min-h-6 px-2 py-0.5 text-secondary-size font-semibold leading-5',
};

export default function ScoreStatusBadge({
  variant = 'optimal',
  size = 'sm',
  children,
  className = '',
}) {
  const v = SCORE_VARIANTS[variant] ?? SCORE_VARIANTS.moderate;
  const text = children ?? v.label;
  const sizeClass = SIZE_STYLES[size] ?? SIZE_STYLES.sm;

  return (
    <span
      className={`inline-flex max-w-full items-center justify-center rounded-[10px] text-center ${sizeClass} ${className}`}
      style={{
        backgroundColor: v.pillBg,
        color: v.pillText,
      }}
    >
      {text}
    </span>
  );
}
