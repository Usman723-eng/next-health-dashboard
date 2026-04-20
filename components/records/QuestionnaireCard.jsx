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
  const handleStart = () => {
    if (onStart) onStart();
    else onClick?.();
  };

  const cardClass = `
    flex flex-col gap-3 rounded-xl border border-border2 bg-surface p-4 text-left
    ${className}
  `.trim();

  const header = (
    <div className="flex gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F2F5F9] text-primary">
        <Icon name={iconName} size={20} color="currentColor" fill="none" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold leading-4.5 text-primary line-clamp-1" title={title}>
          {title}
        </h3>
        <p className="text-xs leading-4.5 text-secondary">{category}</p>
      </div>
    </div>
  );

  const body = <p className="text-sm leading-4.5 font-medium text-secondary">{description}</p>;

  const startVisual = (
    <div className="flex justify-end pt-1">
      {href ? (
        <Link
          href={href}
          className="inline-flex cursor-pointer rounded-lg bg-[#192845] px-4.5 py-1.5 text-sm leading-5 font-semibold text-white no-underline transition-opacity hover:opacity-90"
        >
          Start
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleStart}
          className="cursor-pointer rounded-lg bg-[#192845] px-4.5 py-1.5 text-sm leading-5 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Start
        </button>
      )}
    </div>
  );

  return (
    <div className={cardClass}>
      {header}
      {body}
      {startVisual}
    </div>
  );
}
