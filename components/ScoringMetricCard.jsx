'use client';

import CircularProgressRing from '@/components/CircularProgressRing';
import ScoreStatusBadge from '@/components/ScoreStatusBadge';

export default function ScoringMetricCard({
  title,
  description,
  value,
  variant = 'optimal',
  statusText,
  factorsLabel = '28 Factors',
  date = 'Apr 9',
  ringSize = 60,
  strokeWidth = 5,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col justify-between gap-3 rounded-3xl border border-border2 bg-surface p-4 ${className}`}
    >
      <div className='flex flex-col gap-2'>
        <h3 className="text-card-header-size font-semibold leading-[100%] text-primary">
          {title}
        </h3>
        <p className="text-xs leading-[100%] text-secondary">
          {description}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressRing
          value={value}
          variant={variant}
          size={ringSize}
          strokeWidth={strokeWidth}
        />
        <ScoreStatusBadge variant={variant}>
          {statusText}
        </ScoreStatusBadge>
      </div>
      <div className="flex items-center justify-between gap-3 text-secondary-size">
        <span className="font-medium text-primary">{factorsLabel}</span>
        <span className="font-medium text-secondary">{date}</span>
      </div>
    </div>
  );
}
