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
      color = '#D1FAE5',
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

    // top + bottom borders for the green range band
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

const MetricLineChart = ({
  months,
  optimal,
  warning,
  critical,
  optimalThreshold,
  criticalThreshold,
}) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const totals = (months || []).map((_, i) =>
      Number(optimal?.[i] ?? 0) + Number(warning?.[i] ?? 0) + Number(critical?.[i] ?? 0)
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
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
          rangeBand:
            Number.isFinite(t1) && Number.isFinite(t2)
              ? { min: t1, max: t2, color: 'rgba(34, 197, 94, 0.14)' }
              : undefined,
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#e5e5e5', font: { size: 12 }},
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
      plugins: [rangeBandPlugin],
    });

    return () => chartRef.current?.destroy();
  }, [months, optimal, warning, critical, optimalThreshold, criticalThreshold]);

  return <canvas ref={canvasRef} />;
};

export default MetricLineChart;

