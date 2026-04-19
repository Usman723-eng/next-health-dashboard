import React from 'react'

const BADGE_BG = {
  success: '#57C7A0',
  warning: '#EE8927',
  danger:  '#C21919',
};
const VALUE_COLOR = {
  success: '#57C7A0',
  warning: '#EE8927',
  danger:  '#C21919',
};

const MetricsCard = ({ title, value, subtitle, badge, type, compact }) => {
    const badgeBg = type ? BADGE_BG[type] : null;
    const valueColor = type ? VALUE_COLOR[type] : null;
    return (
        <div
            className={`bg-surface rounded-3xl border border-border2 p-4 flex flex-col ${compact ? 'gap-2' : 'gap-3.5'}`}
        >
            <div className="flex items-start justify-between gap-2">
                <span
                    className={`font-semibold text-primary leading-tight ${compact ? 'text-sm' : 'text-xl'}`}
                >
                    {title}
                </span>
                {badge && (
                    <span
                        className="text-body-size leading-5 font-medium px-[10.5px] py-1 text-white rounded-md shrink-0 whitespace-nowrap"
                        style={{
                            backgroundColor: badgeBg ? badgeBg : 'transparent',
                        }}
                    >
                        {badge}
                    </span>
                )}
            </div>
            <div className={`flex flex-col ${compact ? 'gap-1' : 'gap-2'}`}>
                <span
                    className={`font-semibold text-primary tabular-nums ${compact ? 'text-2xl leading-8' : 'leading-9.5 text-5xl'}`}
                    style={{ color: valueColor }}
                >
                    {value}
                </span>
                <span className={`leading-5 text-secondary ${compact ? 'text-xs' : 'text-body-size'}`}>
                    {subtitle}
                </span>
            </div>
        </div>
    );
};

export default MetricsCard
