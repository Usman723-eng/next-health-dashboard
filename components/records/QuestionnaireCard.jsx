'use client';

import Link from 'next/link';
import Icon from '@/icons';

export default function QuestionnaireCard({
  title,
  category,
  description,
  iconName = 'questionnaire-article',
  onClick,
  onStart,
  href,
  className = '',
}) {
  const handleStart = (e) => {
    e.stopPropagation();
    if (onStart) onStart();
    else onClick?.();
  };

  const cardClass = `
    flex flex-col gap-3 rounded-2xl border border-border2 bg-surface p-4 text-left transition-shadow
    ${onClick || href ? 'cursor-pointer hover:shadow-md' : ''}
    ${className}
  `.trim();

  const header = (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F2F5F9] text-[#78716C]">
        <Icon name={iconName} size={20} color="currentColor" fill="none" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold leading-6 text-primary" title={title}>
          {title}
        </h3>
        <p className="text-secondary-size leading-5 text-secondary">{category}</p>
      </div>
    </div>
  );

  const body = <p className="text-sm leading-5 text-[#78716C]">{description}</p>;

  const startVisual = (
    <div className="flex justify-end pt-1">
      {href ? (
        <span className="inline-flex rounded-lg bg-[#1D2939] px-4 py-2 text-sm font-semibold text-white">
          Start
        </span>
      ) : (
        <button
          type="button"
          onClick={handleStart}
          className="cursor-pointer rounded-lg bg-[#1D2939] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Start
        </button>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={`${cardClass} no-underline`}>
        {header}
        {body}
        {startVisual}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        className={cardClass}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {header}
        {body}
        {startVisual}
      </div>
    );
  }

  return (
    <article className={cardClass}>
      {header}
      {body}
      {startVisual}
    </article>
  );
}
