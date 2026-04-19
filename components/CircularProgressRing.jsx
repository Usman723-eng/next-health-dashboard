'use client';

import { SCORE_VARIANTS } from './scoreStatusVariants';

export default function CircularProgressRing({
  value,
  max = 100,
  variant = 'optimal',
  size = 60,
  strokeWidth = 6,
  className = '',
}) {
  const v = SCORE_VARIANTS[variant] ?? SCORE_VARIANTS.moderate;
  const pct = Math.min(100, Math.max(0, (Number(value) / Number(max)) * 100));
  const r = (size - strokeWidth) / 2 - 0.5;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  const cx = size / 2;
  const cy = size / 2;

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${Math.round(pct)} percent`}
    >
      <svg width={size} height={size} className="block -rotate-90">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={v.track}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={v.progress}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center text-center font-bold tabular-nums text-primary ${
          size >= 72 ? 'text-[22px] leading-[100%]' : size >= 60 ? 'text-xl leading-[100%]' : 'text-base leading-[100%]'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
