'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

const DEFAULT_LINE = '#5B31B2';
const DEFAULT_TICK = '#A0A0A0';
const DEFAULT_GRID = 'rgba(160, 160, 160, 0.45)';

/**
 * Line chart used only by device metric cards. Does not share options with {@link MetricLineChart}.
 *
 * @param {object} props
 * @param {string[]} props.xLabels Bottom / category axis labels.
 * @param {number[]} props.values Y values (same length as `xLabels`).
 * @param {number[]} props.yTicks Left-axis tick values (ascending); also drives horizontal grid lines when grid is on.
 * @param {{ horizontal?: boolean, vertical?: boolean, color?: string, dash?: number[] }} [props.grid]
 * @param {string} [props.lineColor]
 * @param {string} [props.className]
 */
export default function DeviceMetricLineChart({
  xLabels,
  values,
  yTicks,
  grid = {},
  lineColor = DEFAULT_LINE,
  className = '',
}) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const showH = grid.horizontal !== false;
  const showV = grid.vertical === true;
  const gridColor = grid.color ?? DEFAULT_GRID;
  const gridDash = useMemo(
    () => (Array.isArray(grid.dash) ? grid.dash : [4, 4]),
    [grid.dash],
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const labels = xLabels ?? [];
    const data = (values ?? []).map((v) => Number(v));
    const ticks = (yTicks ?? [0, 1]).filter(Number.isFinite).sort((a, b) => a - b);
    const yMin = ticks[0] ?? 0;
    const yMax = ticks[ticks.length - 1] ?? 1;

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor: lineColor,
            backgroundColor: lineColor,
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 4,
            pointHoverRadius: 5,
            pointBackgroundColor: lineColor,
            pointBorderColor: lineColor,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            offset: true,
            grid: {
              display: showV,
              color: gridColor,
              borderDash: gridDash,
              drawTicks: true,
            },
            border: { display: false },
            ticks: {
              color: DEFAULT_TICK,
              font: { size: 11 },
              maxRotation: 0,
            },
          },
          y: {
            min: yMin,
            max: yMax,
            grid: {
              display: showH,
              color: gridColor,
              borderDash: gridDash,
              lineWidth: 1,
            },
            border: { display: false },
            ticks: {
              color: DEFAULT_TICK,
              font: { size: 11 },
              stepSize:
                ticks.length >= 2 ? (yMax - yMin) / Math.max(ticks.length - 1, 1) : undefined,
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [xLabels, values, yTicks, showH, showV, gridColor, gridDash, lineColor]);

  return <canvas ref={canvasRef} className={className} />;
}
