'use client';

import { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler);

const NAVY = '#172645';

function xPixelForCategoryIndex(chart, xIndex) {
  const labels = chart.data.labels || [];
  if (!labels.length || !Number.isFinite(xIndex)) return null;
  const xScale = chart.scales.x;
  const max = labels.length - 1;
  if (max < 0) return null;
  if (xIndex <= 0) return xScale.getPixelForValue(labels[0]);
  if (xIndex >= max) return xScale.getPixelForValue(labels[max]);
  const i = Math.floor(xIndex);
  const f = xIndex - i;
  const p0 = xScale.getPixelForValue(labels[i]);
  const p1 = xScale.getPixelForValue(labels[Math.min(i + 1, max)]);
  return p0 + f * (p1 - p0);
}

const rangeBandPlugin = {
  id: 'rangeBand',
  beforeDatasetsDraw(chart) {
    const { ctx, chartArea, scales, config } = chart;
    const yScale = scales.y;
    const band = config.options?.plugins?.rangeBand;
    if (!band) return;

    const {
      min,
      max,
      color = '#737373',
      borderColor = '#26D76A',
      borderWidth = 1,
    } = band;
    const minNum = Number(min);
    const maxNum = Number(max);
    if (!Number.isFinite(minNum) || !Number.isFinite(maxNum)) return;

    const topVal = Math.max(minNum, maxNum);
    const botVal = Math.min(minNum, maxNum);
    const yTop = yScale.getPixelForValue(topVal);
    const yBot = yScale.getPixelForValue(botVal);

    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(chartArea.left, yTop, chartArea.right - chartArea.left, yBot - yTop);

    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    const yTopLine = Math.round(yTop) + 0.5;
    const yBotLine = Math.round(yBot) + 0.5;
    ctx.moveTo(chartArea.left, yTopLine);
    ctx.lineTo(chartArea.right, yTopLine);
    ctx.moveTo(chartArea.left, yBotLine);
    ctx.lineTo(chartArea.right, yBotLine);
    ctx.stroke();
    ctx.restore();
  },
};

/** Vertical reference line + pill label (optional). */
const interventionLinePlugin = {
  id: 'interventionLine',
  afterDatasetsDraw(chart) {
    const intervention = chart.options.plugins?.intervention;
    if (!intervention?.label || !Number.isFinite(intervention.xIndex)) return;

    const x = xPixelForCategoryIndex(chart, intervention.xIndex);
    if (x == null) return;

    const { ctx, chartArea } = chart;
    const label = String(intervention.label);
    const paddingX = 10;
    const paddingY = 6;
    const font = '600 12px Inter, system-ui, sans-serif';
    ctx.save();
    ctx.font = font;
    const textW = ctx.measureText(label).width;
    const badgeW = textW + paddingX * 2;
    const badgeH = paddingY * 2 + 14;
    const gap = 4;

    ctx.strokeStyle = NAVY;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.round(x) + 0.5, chartArea.top);
    ctx.lineTo(Math.round(x) + 0.5, chartArea.bottom);
    ctx.stroke();

    const badgeY = chartArea.top - gap - badgeH;
    const badgeX = x - badgeW / 2;
    ctx.fillStyle = NAVY;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 6);
    } else {
      ctx.rect(badgeX, badgeY, badgeW, badgeH);
    }
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, badgeY + badgeH / 2);
    ctx.restore();
  },
};

/**
 * @param {object} props
 * @param {string[]} props.months
 * @param {number[]} props.optimal
 * @param {number[]} props.warning
 * @param {number[]} props.critical
 * @param {number} props.optimalThreshold
 * @param {number} props.criticalThreshold
 * @param {{ series: Array<{ label: string, color: string, values: number[] }> }} [props.multiSeries]
 * @param {{ label: string, xIndex: number } | null} [props.intervention] Vertical marker + badge; omit for default charts.
 */
const MetricLineChart = ({
  months,
  optimal,
  warning,
  critical,
  optimalThreshold,
  criticalThreshold,
  multiSeries = null,
  intervention = null,
}) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const interventionKey =
    intervention?.label != null && Number.isFinite(intervention?.xIndex)
      ? `${intervention.label}:${intervention.xIndex}`
      : '';

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const labels = months ?? [];

    const interventionOpts =
      intervention?.label && Number.isFinite(intervention.xIndex)
        ? { label: intervention.label, xIndex: intervention.xIndex }
        : undefined;

    if (multiSeries?.series?.length) {
      const allVals = multiSeries.series.flatMap((s) => (s.values ?? []).map(Number)).filter(Number.isFinite);
      const dataMax = allVals.length ? Math.max(...allVals) : 0;
      const dataMin = allVals.length ? Math.min(...allVals) : 0;
      const pad = (dataMax - dataMin) * 0.15 || 1;

      chartRef.current = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels,
          datasets: multiSeries.series.map((s) => ({
            label: s.label,
            data: (s.values ?? []).map((v) => Number(v)),
            borderColor: s.color,
            backgroundColor: s.color,
            borderWidth: 2,
            tension: 0.45,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: false,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { top: interventionOpts ? 36 : 0 } },
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
            intervention: interventionOpts,
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: { color: '#737373', font: { size: 12 } },
            },
            y: {
              grid: { color: 'rgba(120, 113, 108, 0.12)' },
              border: { display: false },
              ticks: { display: false },
              min: dataMin - pad,
              max: dataMax + pad,
            },
          },
        },
        plugins: [interventionLinePlugin],
      });

      return () => chartRef.current?.destroy();
    }

    const totals = (months || []).map((_, i) =>
      Number(optimal?.[i] ?? 0) + Number(warning?.[i] ?? 0) + Number(critical?.[i] ?? 0),
    );

    const values = totals.filter((n) => Number.isFinite(n));
    const dataMax = values.length ? Math.max(...values) : 0;
    const dataMin = values.length ? Math.min(...values) : 0;

    const t1 = Number(optimalThreshold);
    const t2 = Number(criticalThreshold);
    const thresholds = [t1, t2].filter(Number.isFinite);

    const allMax = Math.max(dataMax, ...(thresholds.length ? thresholds : [dataMax]));
    const allMin = Math.min(dataMin, ...(thresholds.length ? thresholds : [dataMin]));
    const pad = (allMax - allMin) * 0.2 || 1;

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Metric',
            data: totals,
            color: '#737373',
            borderColor: '#0F172A',
            borderWidth: 2,
            tension: 0.45,
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: interventionOpts ? 36 : 0 } },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
          rangeBand:
            Number.isFinite(t1) && Number.isFinite(t2)
              ? { min: t1, max: t2, color: 'rgba(34, 197, 94, 0.14)' }
              : undefined,
          intervention: interventionOpts,
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#737373', font: { size: 12 }},
          },
          y: {
            grid: { color: 'rgba(120, 113, 108, 0.12)' },
            border: { display: false },
            ticks: { display: false },
            min: allMin - pad,
            max: allMax + pad,
          },
        },
      },
      plugins: [rangeBandPlugin, interventionLinePlugin],
    });

    return () => chartRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- interventionKey encodes intervention.label + xIndex
  }, [
    months,
    optimal,
    warning,
    critical,
    optimalThreshold,
    criticalThreshold,
    multiSeries,
    interventionKey,
  ]);

  return <canvas ref={canvasRef} />;
};

export default MetricLineChart;
