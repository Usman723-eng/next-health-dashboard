'use client';

import dynamic from 'next/dynamic';
import Icon from '@/icons';

const LineChart = dynamic(() => import('@/components/charts/LineChart'), { ssr: false });
const BarChart = dynamic(() => import('@/components/charts/BarChart'), { ssr: false });

const MetricsCard2 = ({ title, value, label, score, date = 'Apr 9', icon, iconBg, chartType = 'line', chartData, chartColor }) => {
    return (
        <div className="bg-surface rounded-3xl p-4 flex flex-col gap-3 border border-border2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: iconBg, color: '#ffffff' }}
                    >
                        <Icon name={icon} size={24} color="currentColor" />
                    </div>
                    <span className="text-card-header-size leading-7.5 font-semibold text-primary">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                    <span className='text-secondary-size font-medium text-secondary'>{date}</span>
                    <Icon name='caret-right' size={24} color='#888888' />
                </div>
            </div>
            <div className="flex items-center justify-between gap-3">
                <span className="text-card-number-size font-bold text-primary leading-9">
                    {value}
                </span>
                <div className={`flex-1 h-9 ${chartType === 'line' ? 'max-w-51' : 'max-w-30'}`}>
                    {chartType === 'line'
                        ? <LineChart data={chartData} color={chartColor || iconBg} />
                        : <BarChart data={chartData} color={chartColor || iconBg} />
                    }
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-secondary-size text-secondary font-medium">
                    {label}
                </span>
                <div className='flex items-center gap-1'>
                    <Icon name='check-green' size={16} fill="#65A30D" color='none' />
                    <span className="text-primary text-secondary-size leading-5">
                        Score: {score}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MetricsCard2
