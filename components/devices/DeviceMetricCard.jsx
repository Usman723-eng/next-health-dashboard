'use client';

import { useMemo, useState } from 'react';
import { TIME_RANGE_TABS } from '@/app/lib/biomarkerDetailChartView';
import DeviceMetricLineChart from '@/components/charts/DeviceMetricLineChart';
import { getDeviceMetricSeries } from '@/app/lib/deviceMetricCardsData';

const DEFAULT_CHART_GRID = {
  horizontal: true,
  vertical: true,
  dash: [4, 4],
};

export default function DeviceMetricCard({ cardId, title, source, chartGrid }) {
  const [timeRangeIndex, setTimeRangeIndex] = useState(0);

  const series = useMemo(
    () => getDeviceMetricSeries(cardId, timeRangeIndex),
    [cardId, timeRangeIndex],
  );

  const grid = chartGrid ?? DEFAULT_CHART_GRID;
  return (
    <div className="flex flex-col gap-8 rounded-xl border border-border2 bg-surface px-4 pt-6 pb-13">
      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h3 className="text-body-size font-bold leading-6 text-primary">{title}</h3>
          <p className="text-secondary-size leading-4.5 text-primary">Source: {source}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 self-start rounded-xl bg-gray-100 p-0.75 sm:ml-2">
          {TIME_RANGE_TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              onClick={() => setTimeRangeIndex(i)}
              className={`
                cursor-pointer rounded-xl border-none px-1.5 py-0.75 text-secondary-size leading-5 transition-all
                ${timeRangeIndex === i ? 'font-semibold' : 'font-medium'}
              `}
              style={
                timeRangeIndex === i
                  ? { backgroundColor: 'var(--tabs-active-bg)', color: 'var(--tabs-active-text)' }
                  : { backgroundColor: 'transparent', color: 'var(--tab-text-color)' }
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="h-70 w-full">
        <DeviceMetricLineChart
          xLabels={series.xLabels}
          values={series.values}
          yTicks={series.yTicks}
          grid={grid}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
