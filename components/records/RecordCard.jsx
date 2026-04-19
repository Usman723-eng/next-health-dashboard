'use client';

import Icon from '@/icons';

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
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-border2 bg-surface p-4 ${className}`.trim()}
    >
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold leading-6 text-primary">{title}</h3>
            <span className="inline-flex shrink-0 items-center rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-medium leading-4 text-[#166534]">
              {status}
            </span>
          </div>
          {onPreview && (
            <button
              type="button"
              onClick={onPreview}
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border2 bg-surface text-[#475569] transition-colors hover:bg-[#F8FAFC]"
              aria-label="Preview"
            >
              <Icon name="records-eye" size={20} color="currentColor" fill="none" />
            </button>
          )}
        </div>
        <p className="text-secondary-size leading-5 text-[#78716C]">Overall score: {score}</p>
        <div className="flex flex-wrap items-center gap-4 text-secondary-size leading-5 text-[#78716C]">
          <span className="inline-flex items-center gap-1.5 text-[#78716C]">
            <Icon name="records-calendar" size={20} color="currentColor" fill="none" />
            {date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="records-clock" size={20} color="currentColor" fill="none" />
            {time}
          </span>
        </div>
      </div>

      <div
        className={`flex flex-col gap-3 sm:flex-row sm:items-center ${onAskAI ? 'sm:justify-between' : 'sm:justify-end'}`}
      >
        {onAskAI && (
          <button
            type="button"
            onClick={onAskAI}
            className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-border2 bg-surface px-3 py-2 text-sm font-medium leading-none text-primary transition-colors hover:bg-[#F8FAFC]"
          >
            <Icon name="records-ask-ai" size={16} color="#4818AF" fill="none" />
            AskAI
          </button>
        )}
        <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
          {onView && (
            <button
              type="button"
              onClick={onView}
              className="rounded-lg bg-[#1D2939] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              View
            </button>
          )}
          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#1C1917] bg-transparent px-4 py-2 text-sm font-semibold text-[#1C1917] transition-colors hover:bg-[#F8FAFC]"
            >
              <Icon name="records-download" size={20} color="currentColor" fill="none" />
              Download
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#C21919] bg-transparent px-4 py-2 text-sm font-semibold text-[#C21919] transition-colors hover:bg-red-50"
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
