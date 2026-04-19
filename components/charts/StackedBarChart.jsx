'use client';

import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(BarController, BarElement, LinearScale, CategoryScale);

const BAR_RADIUS = 5;
const BAR_RADIUS_COMPACT = 3;
const LEFT_GUTTER_PX = 76;

const referenceLinePlugin = {
  id: 'refLines',
  afterDraw(chart) {
    const { ctx, chartArea, scales, config } = chart;
    const yScale = scales.y;
    const lines = config.options?.plugins?.refLines?.lines || [];

    lines.forEach(({ value, label }) => {
      if (value < yScale.min || value > yScale.max) return;
      const yRaw = yScale.getPixelForValue(value);
      const y = Math.min(Math.max(yRaw, chartArea.top + 18), chartArea.bottom - 18);

      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = '#737373';
      ctx.lineWidth = 1;
      ctx.moveTo(chartArea.left, y);
      ctx.lineTo(chartArea.right, y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#44403C';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      const labelX = 12;
      ctx.fillText(label, labelX, y - 6);
      ctx.fillStyle = '#44403C';
      ctx.font = '18px Inter, sans-serif';
      ctx.fillText(value.toLocaleString(), labelX, y + 16);
      ctx.restore();
    });
  },
};

const StackedBarChart = ({
  months,
  optimal,
  warning,
  critical,
  optimalThreshold,
  criticalThreshold,
  compact = false,
}) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const barR = compact ? BAR_RADIUS_COMPACT : BAR_RADIUS;
    const barThick = compact ? 6 : 56;

    const stacks = [optimal, warning, critical];
    const outerRadiusFor = (datasetIndex, dataIndex) => {
      const valuesAtIndex = stacks.map((arr) => Number(arr?.[dataIndex] ?? 0));
      const nonZero = valuesAtIndex
        .map((v, idx) => ({ v, idx }))
        .filter(({ v }) => v > 0);

      if (nonZero.length === 0) return 0;

      const bottomIdx = nonZero[0].idx;
      const topIdx = nonZero[nonZero.length - 1].idx;

      const isBottom = datasetIndex === bottomIdx;
      const isTop = datasetIndex === topIdx;

      if (isTop && isBottom) {
        return { topLeft: barR, topRight: barR, bottomLeft: 0, bottomRight: 0 };
      }

      if (isTop) {
        return { topLeft: barR, topRight: barR, bottomLeft: 0, bottomRight: 0 };
      }

      if (isBottom) {
        return { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 };
      }

      return 0;
    };

    const totals = months.map((_, i) =>
      Number(optimal?.[i] ?? 0) + Number(warning?.[i] ?? 0) + Number(critical?.[i] ?? 0)
    );
    const dataMax = totals.length ? Math.max(...totals) : 0;
    const thresholdMax = Math.max(Number(optimalThreshold ?? 0), Number(criticalThreshold ?? 0));
    const yMax = Math.max(dataMax, thresholdMax);
    const yScaleMax = compact ? Math.max(yMax * 2.35, 100) : yMax;

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Optimal',
            data: optimal,
            backgroundColor: '#059669',
            stack: 'stack',
            borderRadius: (ctx) => outerRadiusFor(ctx.datasetIndex, ctx.dataIndex),
            borderSkipped: false,
            borderWidth: 0,
            borderColor: '#059669',
            barThickness: barThick,
            maxBarThickness: barThick,
          },
          {
            label: 'Warning',
            data: warning,
            backgroundColor: '#EA580C',
            stack: 'stack',
            borderRadius: (ctx) => outerRadiusFor(ctx.datasetIndex, ctx.dataIndex),
            borderSkipped: false,
            borderWidth: 0,
            borderColor: '#EA580C',
            barThickness: barThick,
            maxBarThickness: barThick,
          },
          {
            label: 'Critical',
            data: critical,
            backgroundColor: '#DC2626',
            stack: 'stack',
            borderRadius: (ctx) => outerRadiusFor(ctx.datasetIndex, ctx.dataIndex),
            borderSkipped: false,
            borderWidth: 0,
            borderColor: '#DC2626',
            barThickness: barThick,
            maxBarThickness: barThick,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          bar: {
            borderWidth: 0,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
          refLines: compact
            ? { lines: [] }
            : {
                lines: [
                  { value: criticalThreshold, label: 'Critical' },
                  { value: optimalThreshold, label: 'Optimal' },
                ],
              },
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            border: { display: false },
            ticks: compact
              ? { display: false }
              : { color: '#78716C', font: { size: 14 }, padding: 8 },
            categoryPercentage: compact ? 0.8 : 0.74,
            barPercentage: compact ? 0.9 : 0.98,
          },
          y: {
            stacked: true,
            grid: { display: false },
            border: { display: false },
            ticks: { display: false },
            beginAtZero: true,
            ...(compact
              ? { max: yScaleMax }
              : { suggestedMax: yMax }),
          },
        },
        layout: { padding: { left: compact ? 0 : LEFT_GUTTER_PX } },
      },
      plugins: compact ? [] : [referenceLinePlugin],
    });

    return () => chartRef.current?.destroy();
  }, [months, optimal, warning, critical, optimalThreshold, criticalThreshold, compact]);

  return <canvas ref={canvasRef} />;
};

export default StackedBarChart;
