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

/**
 * Metric card for the Devices dashboard: title, source, biomarker-style time tabs, and {@link DeviceMetricLineChart}.
 *
 * @param {object} props
 * @param {'weight'|'bodyFat'|'systolicBp'|'bloodOxygen'} props.cardId
 * @param {string} props.title
 * @param {string} props.source
 * @param {{ horizontal?: boolean, vertical?: boolean, color?: string, dash?: number[] }} [props.chartGrid] Passed only to DeviceMetricLineChart; does not affect other charts.
 */
export default function DeviceMetricCard({ cardId, title, source, chartGrid }) {
  const [timeRangeIndex, setTimeRangeIndex] = useState(0);

  const series = useMemo(
    () => getDeviceMetricSeries(cardId, timeRangeIndex),
    [cardId, timeRangeIndex],
  );

  const grid = chartGrid ?? DEFAULT_CHART_GRID;

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-border2 bg-surface p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="text-body-size font-semibold leading-6 text-primary">{title}</h3>
          <p className="text-secondary-size leading-5 text-secondary">Source: {source}</p>
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
      <div className="h-56 min-h-[14rem] w-full sm:h-66.5">
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
