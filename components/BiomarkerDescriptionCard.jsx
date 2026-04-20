'use client';

export default function BiomarkerDescriptionCard({
  heading = 'Description',
  body = '',
  tags = [],
  className = '',
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-border2 bg-surface py-4 px-6 ${className}`}
    >
      <h2 className="text-[22px] font-semibold leading-6.5 text-primary">{heading}</h2>
      {body ? (
        <p className="text-sm font-normal text-primary">{body}</p>
      ) : null}
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-[#F2F5F9] px-2 text-xs font-medium leading-5 text-[#384151]"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
