'use client';

import dynamic from 'next/dynamic';
import Icon from '@/icons';
import ScoreStatusBadge from '@/components/ScoreStatusBadge';

const StackedBarChart = dynamic(() => import('@/components/charts/StackedBarChart'), { ssr: false });
const BarChart = dynamic(() => import('@/components/charts/BarChart'), { ssr: false });
const LineChart = dynamic(() => import('@/components/charts/LineChart'), { ssr: false });

export const DEFAULT_WEARABLE_CHART = {
  months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  optimal: [14, 10, 16, 8, 15, 9, 14, 11],
  warning: [3, 12, 2, 14, 4, 11, 5, 9],
  critical: [0, 5, 0, 7, 0, 6, 0, 5],
  optimalThreshold: 50,
  criticalThreshold: 75,
};

function WearableChart({ chartType, chart }) {
  if (chartType === 'bar') {
    const { values, colors } = chart;
    return <BarChart data={values} barColors={colors} compact />;
  }
  if (chartType === 'line') {
    const { values, lineColor } = chart;
    return <LineChart data={values} color={lineColor} />;
  }
  const {
    months,
    optimal,
    warning,
    critical,
    optimalThreshold,
    criticalThreshold,
  } = chart;
  return (
    <StackedBarChart
      months={months}
      optimal={optimal}
      warning={warning}
      critical={critical}
      optimalThreshold={optimalThreshold}
      criticalThreshold={criticalThreshold}
      compact
    />
  );
}

export default function WearableMetricCard({
  title,
  reference,
  value,
  date = '8/10/2025',
  statusVariant = 'poor',
  statusText,
  statusSize = 'md',
  chartType = 'stacked',
  chart = DEFAULT_WEARABLE_CHART,
  className = '',
  onPinClick,
  onAiClick,
}) {
  const chartWrapClass =
    chartType === 'line'
      ? 'h-10 w-full flex-1 max-w-[200px] shrink-0'
      : chartType === 'bar'
        ? 'h-10 w-full flex-1 max-w-[110px] shrink-0'
        : 'h-10 w-full flex-1 max-w-[110px] shrink-0';
  return (
    <div
      className={`flex flex-col gap-3 rounded-3xl border border-border2 bg-surface p-4 sm:p-5 ${className}`}
    >
      <div className='flex flex-col gap-1'>
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-card-header-size font-semibold leading-[100%] text-primary">{title}</h3>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-[#888888] transition-colors hover:(--menu-hover) hover:text-primary"
              aria-label="Pin"
              onClick={onPinClick}
            >
              <Icon name="wearable-pin" size={20} color="#888888" fill="none" />
            </button>
            <button
              type="button"
              className="flex h-6 cursor-pointer items-center justify-center rounded-md border px-2 py-1 transition-colors"
              style={{
                backgroundColor: '#E2D7FA',
                borderColor: 'rgba(72, 24, 175, 0.50)',
              }}
              aria-label="AI insights"
              onClick={onAiClick}
            >
              <Icon name="wearable-ai" size={16} color="#4818AF" fill="none" />
            </button>
          </div>
        </div>
        <p className="text-secondary-size leading-[100%] text-secondary">{reference}</p>
      </div>
      <div className="flex justify-between gap-3">
        <span className="text-[32px] font-bold leading-9 text-primary tabular-nums">
          {value}
        </span>
        <div className={chartWrapClass}>
          <WearableChart chartType={chartType} chart={chart} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <ScoreStatusBadge variant={statusVariant} size={statusSize}>
          {statusText}
        </ScoreStatusBadge>
        <p className="text-secondary-size font-medium leading-[100%] text-secondary">{date}</p>
      </div>
    </div>
  );
}
