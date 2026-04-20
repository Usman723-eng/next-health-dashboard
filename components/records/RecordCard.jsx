'use client';

import Icon from '@/icons';

const STATUS_STYLES = {
  completed: 'bg-[#DCFCE7] text-[#166534]',
  pending: 'bg-[#FEF3C7] text-[#92400E]',
  'in-progress': 'bg-[#DBEAFE] text-[#1E40AF]',
};

export default function RecordCard({
  title,
  status = 'Completed',
  score,
  date,
  time,
  onPreview,
  onAskAI,
  onView,
  onDownload,
  onDelete,
  className = '',
}) {
  const normalizedStatus = String(status ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
  const statusClass = STATUS_STYLES[normalizedStatus] ?? 'bg-[#F3F4F6] text-[#374151]';

  return (
    <article
      className={`flex flex-col gap-4 rounded-xl border border-border2 bg-surface p-4 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold leading-4.5 text-primary">{title}</h3>
          <span className={`inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-semibold leading-5 ${statusClass}`}>
            {status}
          </span>
        </div>
        <button
          type="button"
          onClick={onPreview}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-surface text-[#475569] transition-colors hover:bg-[#F8FAFC]"
          aria-label="Preview"
        >
          <Icon name="records-eye" size={20} color="currentColor" fill="none" />
        </button>
      </div>
      <p className="text-secondary-size leading-4.5 text-secondary">Overall score: {score}</p>
      <div className="flex items-center gap-4">
        <span className="flex items-center text-sm leading-4.5 gap-2 text-primary">
          <Icon name="records-calendar" size={20} color="currentColor" fill="none" />
          {date}
        </span>
        <span className="flex items-center text-sm leading-4.5 gap-2 text-primary">
          <Icon name="records-clock" size={20} color="currentColor" fill="none" />
          {time}
        </span>
      </div>
      <div
        className="flex items-center justify-between gap-3"
      >
        {onAskAI && (
          <button
            type="button"
            onClick={onAskAI}
            className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-border2 bg-surface px-2 py-1.5 text-xs font-medium leading-5 text-primary transition-colors hover:bg-[#F8FAFC]"
          >
            <Icon name="records-ask-ai" size={16} color="#1C1917" fill="none" />
            AskAI
          </button>
        )}
        <div className="flex items-center gap-2">
          {onView && (
            <button
              type="button"
              onClick={onView}
              className="rounded-md bg-[#1D2939] px-4.5 py-1.5 text-xs leading-5 font-medium text-white transition-opacity hover:opacity-90"
            >
              View
            </button>
          )}
          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-[#1C1917] bg-transparent px-4.5 py-1.5 text-xs leading-5 font-medium text-[#1C1917] transition-colors hover:bg-[#F8FAFC]"
            >
              <Icon name="records-download" size={20} color="currentColor" fill="none" />
              Download
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-[#C21919] bg-transparent px-4.5 py-1.5 text-xs leading-5 font-medium text-[#C21919] transition-colors hover:bg-red-50"
            >
              <Icon name="records-trash" size={20} color="#C21919" fill="none" />
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
