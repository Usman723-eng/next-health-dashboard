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
      className={`flex flex-col gap-2 rounded-2xl border px-11.5 py-4 ${v.box} ${className}`}
      role="status"
    >
      <div className="flex items-center gap-2">
        <div className={`flex shrink-0 ${v.icon}`} aria-hidden>
          <Icon name={iconName} size={24} className="block" />
        </div>
        <p className={`text-sm font-bold leading-5 ${v.title}`}>{heading}</p>
      </div>
      <p className={`text-sm leading-5 ${v.body}`}>{body}</p>
    </div>
  );
}
