'use client';

import Icon from '@/icons';

const STATUS_ICON_NAMES = {
  optimal: 'status-optimal',
  fair: 'status-warning',
  poor: 'status-poor',
};

const VARIANT_STYLES = {
  optimal: {
    box: 'border-emerald-200 bg-emerald-50',
    title: 'text-emerald-800',
    body: 'text-emerald-800/90',
    icon: 'text-emerald-600',
  },
  fair: {
    box: 'border-[#E7D5C4] bg-[#FFFBF5]',
    title: 'text-[#92400E]',
    body: 'text-[#92400E]/95',
    icon: 'text-[#B45309]',
  },
  poor: {
    box: 'border-red-200 bg-red-50',
    title: 'text-red-800',
    body: 'text-red-800/90',
    icon: 'text-red-600',
  },
};

const DEFAULT_LABELS = {
  optimal: 'Optimal',
  fair: 'Warning',
  poor: 'Poor',
};
export default function BiomarkerStatusInsight({
  variant = 'fair',
  label,
  body = '',
  className = '',
}) {
  const v = VARIANT_STYLES[variant] ?? VARIANT_STYLES.fair;
  const heading = label ?? DEFAULT_LABELS[variant] ?? DEFAULT_LABELS.fair;
  const iconName = STATUS_ICON_NAMES[variant] ?? STATUS_ICON_NAMES.fair;

  if (!body) return null;

  return (
    <div
      className={`rounded-3xl border px-4 py-4 sm:px-5 sm:py-4 ${v.box} ${className}`}
      role="status"
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 shrink-0 ${v.icon}`} aria-hidden>
          <Icon name={iconName} size={22} className="block" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className={`text-base font-semibold leading-6 ${v.title}`}>{heading}</p>
          <p className={`text-sm font-normal leading-[155%] ${v.body}`}>{body}</p>
        </div>
      </div>
    </div>
  );
}
