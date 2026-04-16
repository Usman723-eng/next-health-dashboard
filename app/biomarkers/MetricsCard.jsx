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

const MetricsCard = ({ title, value, subtitle, badge, type }) => {
    const badgeBg = type ? BADGE_BG[type] : null;
    const valueColor = type ? VALUE_COLOR[type] : null;
    return (
        <div className="bg-surface rounded-3xl border border-border2 p-4 flex flex-col gap-3.5">
            <div className="flex items-start justify-between gap-2">
                <span className="text-xl font-semibold text-primary leading-tight">{title}</span>
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
            <div className='flex flex-col gap-2'>
                <span
                    className="font-semibold leading-9.5 text-5xl text-primary"
                    style={{color: valueColor}}
                >
                    {value}
                </span>
                <span className="text-body-size leading-5 text-secondary">{subtitle}</span>
            </div>
        </div>
    )
}

export default MetricsCard
