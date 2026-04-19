'use client';

import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/icons';

/** @typedef {{ id: string, label: string, defaultChecked?: boolean }} MetricItem */
/** @typedef {{ category: string, items: MetricItem[] }} MetricGroup */

/** @type {Record<string, { left: MetricGroup[], right: MetricGroup[] }>} */
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
  /** @type {Record<string, boolean>} */
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
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.category}>
          <h3 className="mb-2 text-sm font-bold leading-5 text-primary">{group.category}</h3>
          <ul className="flex flex-col gap-2">
            {group.items.map((item) => (
              <li key={item.id}>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm font-normal leading-5 text-primary">
                  <input
                    type="checkbox"
                    className="h-4 w-4 shrink-0 rounded border-border2 accent-[#2563EB]"
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
    <div className="fixed inset-0 z-220 flex items-center justify-center p-4">
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
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border2 bg-surface shadow-lg"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border2 px-6 py-5">
          <div className="flex min-w-0 flex-col gap-1">
            <h2 id={titleId} className="text-[22px] font-semibold leading-7 text-primary">
              Customize {deviceName} Metrics
            </h2>
            <p className="text-secondary-size leading-5 text-secondary">
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

        <div className="overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            <MetricColumn groups={config.left} checked={checked} onToggle={handleToggle} />
            <MetricColumn groups={config.right} checked={checked} onToggle={handleToggle} />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border2 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border2 bg-surface px-5 py-2.5 text-sm font-medium leading-none text-primary transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="cursor-pointer rounded-xl bg-black px-5 py-2.5 text-sm font-medium leading-none text-white transition-opacity hover:opacity-90"
          >
            Apply
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
