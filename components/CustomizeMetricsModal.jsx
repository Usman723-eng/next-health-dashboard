'use client';

import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/icons';

const METRICS_CONFIG = {
  withings: {
    left: [
      { category: 'Blood pressure', items: [{ id: 'w-bp-dia', label: 'Diastolic BP' }] },
      { category: 'Heart rate alert', items: [{ id: 'w-hr-alert', label: 'Heart Rate Alert' }] },
      { category: 'Hrv', items: [{ id: 'w-hrv', label: 'HRV' }] },
      { category: 'Hypnogram', items: [{ id: 'w-hypno', label: 'Hypnogram', defaultChecked: true }] },
      { category: 'Respiratory rate', items: [{ id: 'w-resp', label: 'Respiratory Rate' }] },
      { category: 'Steps', items: [{ id: 'w-steps', label: 'Steps' }] },
      { category: 'Vo2 max', items: [{ id: 'w-vo2', label: 'VO2 Max' }] },
    ],
    right: [
      {
        category: 'Sleep',
        items: [
          { id: 'w-sl-all', label: 'Select All' },
          { id: 'w-sl-awake-t', label: 'Awake Time' },
          { id: 'w-sl-deep', label: 'Deep Sleep' },
          { id: 'w-sl-rem', label: 'REM' },
          { id: 'w-sl-avg-hr', label: 'Avg HR', defaultChecked: true },
          { id: 'w-sl-awake', label: 'Awake' },
          { id: 'w-sl-deep2', label: 'Deep' },
          { id: 'w-sl-dur', label: 'Duration' },
          { id: 'w-sl-eff', label: 'Efficiency', defaultChecked: true },
          { id: 'w-sl-hrv', label: 'HRV' },
          { id: 'w-sl-light', label: 'Light' },
          { id: 'w-sl-low-hr', label: 'Lowest HR' },
          { id: 'w-sl-resp', label: 'Respiratory Rate' },
          { id: 'w-sl-temp', label: 'Temperature Delta' },
          { id: 'w-sl-total', label: 'Total' },
        ],
      },
      {
        category: 'Workouts',
        items: [
          { id: 'w-wo-all', label: 'Select All', defaultChecked: true },
          { id: 'w-wo-elev', label: 'Elevation Gain', defaultChecked: true },
          { id: 'w-wo-avg-hr', label: 'Avg HR' },
          { id: 'w-wo-cal', label: 'Calories' },
          { id: 'w-wo-avg-hr2', label: 'Avg HR' },
          { id: 'w-wo-dist', label: 'Distance' },
          { id: 'w-wo-dur', label: 'Duration' },
          { id: 'w-wo-max-hr', label: 'Max HR' },
          { id: 'w-wo-other', label: 'Other Workouts' },
        ],
      },
    ],
  },
  apple: {
    left: [
      { category: 'Activity', items: [{ id: 'a-steps', label: 'Steps' }, { id: 'a-move', label: 'Move calories' }] },
      { category: 'Heart', items: [{ id: 'a-hr', label: 'Heart rate' }, { id: 'a-hrv', label: 'HRV' }] },
    ],
    right: [
      {
        category: 'Sleep',
        items: [
          { id: 'a-sl-core', label: 'Sleep duration', defaultChecked: true },
          { id: 'a-sl-deep', label: 'Deep sleep' },
          { id: 'a-sl-rem', label: 'REM' },
        ],
      },
      {
        category: 'Workouts',
        items: [
          { id: 'a-wo-dur', label: 'Workout duration' },
          { id: 'a-wo-cal', label: 'Active energy' },
        ],
      },
    ],
  },
};

function buildInitialState(config) {
  const next = {};
  for (const col of ['left', 'right']) {
    for (const group of config[col]) {
      for (const item of group.items) {
        next[item.id] = Boolean(item.defaultChecked);
      }
    }
  }
  return next;
}

function MetricColumn({ groups, checked, onToggle }) {
  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group.category} className='flex flex-col gap-3'>
          <h3 className="text-lg font-bold leading-5.5 text-primary">{group.category}</h3>
          <ul className="flex flex-col gap-2">
            {group.items.map((item) => (
              <li key={item.id}>
                <label className="flex cursor-pointer items-center gap-2 text-base font-normal leading-5 text-primary">
                  <input
                    type="checkbox"
                    className="h-5 w-5 shrink-0 rounded-md border-border border accent-[#192845]"
                    checked={checked[item.id] ?? false}
                    onChange={() => onToggle(item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function CustomizeMetricsModal({
  open,
  onClose,
  deviceId = 'withings',
  deviceName = 'Withings',
  onApply,
}) {
  const titleId = useId();
  const config = METRICS_CONFIG[deviceId] ?? METRICS_CONFIG.withings;

  const [checked, setChecked] = useState(() => buildInitialState(config));

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

  const handleToggle = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApply = () => {
    onApply?.(checked);
    onClose?.();
  };

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-220 flex items-center justify-center p-10">
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 cursor-pointer bg-black/50"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-full w-full max-w-208 flex-col overflow-hidden rounded-3xl border border-border2 bg-surface shadow-lg"
      >
        <div className="flex justify-between gap-4 border-b border-border2 px-6 py-4">
          <div className="flex flex-col gap-1">
            <h2 id={titleId} className="text-xl font-bold leading-6 text-primary">
              Customize {deviceName} Metrics
            </h2>
            <p className="text-secondary-size leading-4.5 text-primary">
              Swap one displayed metric with another available metric.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-primary transition-colors hover:bg-gray-100"
            aria-label="Close"
          >
            <Icon name="ai-chat-close" size={32} color="currentColor" fill="none" />
          </button>
        </div>
        <div className="overflow-y-auto px-16 py-10">
          <div className="grid grid-cols-2 gap-10">
            <MetricColumn groups={config.left} checked={checked} onToggle={handleToggle} />
            <MetricColumn groups={config.right} checked={checked} onToggle={handleToggle} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-border2 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border2 bg-surface px-5 py-2.5 text-sm font-medium leading-5 cursor-pointer text-primary transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="cursor-pointer rounded-md bg-black px-5 py-2.5 text-sm font-medium leading-5 text-white transition-opacity hover:opacity-90"
          >
            Apply
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
