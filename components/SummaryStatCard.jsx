'use client';

import Link from 'next/link';
import Icon from '@/icons';

export default function SummaryStatCard({
  icon,
  circleClassName = '',
  label,
  value,
  valueClassName = '',
  className = '',
  onClick,
  href,
  selected = false,
}) {
  const cardClass = `
    flex w-full min-w-0 items-center gap-2 rounded-2xl border bg-surface p-4 text-left transition-shadow
    ${selected ? 'border-[#9131EE] ring-1 ring-[#9131EE]' : 'border-border2'}
    ${href || onClick ? 'cursor-pointer hover:shadow-md' : ''}
    ${className}
  `.trim();

  const inner = (
    <>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-secondary-size leading-5 text-secondary">{label}</p>
        <p className={`text-[32px] font-bold leading-9 tabular-nums text-primary ${valueClassName}`}>{value}</p>
      </div>
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${circleClassName}`}
      >
        <Icon name={icon} size={20} color="currentColor" />
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${cardClass} no-underline`}>
        {inner}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cardClass}>
        {inner}
      </button>
    );
  }

  return <div className={cardClass}>{inner}</div>;
}
