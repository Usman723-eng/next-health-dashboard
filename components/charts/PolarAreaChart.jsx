'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  Chart,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PolarAreaController,
} from 'chart.js';

Chart.register(RadialLinearScale, ArcElement, Tooltip, Legend, PolarAreaController);

const clampTo100 = value => Math.max(0, Math.min(100, Number(value) || 0));

const DEFAULT_COLORS = [
  '#BB0DE2',
  '#E71590',
  '#09BC4E',
  '#DE2ED7',
  '#3F54E4',
  '#E51C29',
  '#056839',
  '#00ADEF',
  '#F56138',
  '#FF3083',
  '#7C2E2F',
  '#7BC31B',
];

function PolarAreaChart({ items = [], score = 0 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const chartValues = useMemo(
    () => items.map(item => clampTo100(item.value)),
    [items]
  );

  const chartColors = useMemo(
    () => items.map((item, idx) => item.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]),
    [items]
  );

  useEffect(() => {
    if (!canvasRef.current || !items.length) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'polarArea',
      data: {
        labels: items.map(item => item.label),
        datasets: [
          {
            data: chartValues,
            backgroundColor: chartColors.map(color => `${color}CC`),
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverOffset: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: { display: false },
          tooltip: false,
          // tooltip: {
          //   callbacks: {
          //     label: context => {
          //       const value = clampTo100(context.raw);
          //       return `${context.label}: ${value}`;
          //     },
          //   },
          // },
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { display: false, stepSize: 20 },
            grid: { display: false },
            angleLines: { display: false },
            pointLabels: { display: false },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [items, chartValues, chartColors]);

  const safeScore = clampTo100(score);

  return (
    <div className="relative h-81.5 w-79.5">
      <canvas ref={canvasRef} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="flex h-22.5 w-22.5 flex-col items-center justify-center rounded-full border-4 border-white bg-[#3E3E3E] text-white">
          <span className="text-card-number-size font-semibold leading-7.5">{safeScore}</span>
          <span className="text-[15px] leading-none text-[#78716C] font-semibold">avg</span>
        </div>
      </div>
    </div>
  );
}

export default PolarAreaChart;
