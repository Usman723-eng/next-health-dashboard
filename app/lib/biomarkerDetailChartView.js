export const TIME_RANGE_TABS = ['Day', 'Week', 'Month', 'Year'];

const RANGE_LENGTHS = [12, 7, 6, 12];

const RANGE_LABELS = [
  ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'],
  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
];

const SUBTITLES = [
  'Total for the last 24 hours',
  'Total for the last 7 days',
  'Total for the last 30 days',
  'Total for the last 12 months',
];

function hashStr(s) {
  let h = 0;
  const str = String(s ?? '');
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function resampleArray(arr, n) {
  if (!arr?.length) return Array.from({ length: n }, () => 0);
  const L = arr.length;
  if (n <= 1) return [Number(arr[L - 1] ?? 0)];
  return Array.from({ length: n }, (_, i) => {
    const t = (i / (n - 1)) * (L - 1);
    const j = Math.floor(t);
    const f = t - j;
    const a = Number(arr[j] ?? 0);
    const b = Number(arr[Math.min(j + 1, L - 1)] ?? a);
    return a + f * (b - a);
  });
}

function jitterSeries(arr, seed, strength = 0.07) {
  return arr.map((v, i) => {
    const w = Math.sin(((seed + i * 17) % 100) * 0.15) * strength;
    return Math.max(0, Number(v) * (1 + w));
  });
}

export function buildDetailChartView(detailChart, timeRangeIndex, slug = '') {
  if (!detailChart) {
    return {
      months: [],
      optimal: [],
      warning: [],
      critical: [],
      optimalThreshold: 50,
      criticalThreshold: 75,
      subtitle: SUBTITLES[3],
    };
  }

  const idx = Math.min(Math.max(timeRangeIndex, 0), RANGE_LENGTHS.length - 1);
  const n = RANGE_LENGTHS[idx];
  const labels = RANGE_LABELS[idx];
  const seed = hashStr(`${slug}|${idx}|${TIME_RANGE_TABS[idx]}`);

  const sample = (key) =>
    jitterSeries(resampleArray(detailChart[key], n), seed + key.length * 13);

  return {
    months: labels.slice(0, n),
    optimal: sample('optimal'),
    warning: sample('warning'),
    critical: sample('critical'),
    optimalThreshold: detailChart.optimalThreshold,
    criticalThreshold: detailChart.criticalThreshold,
    subtitle: SUBTITLES[idx],
  };
}

/**
 * Multiple line series for biomarker detail (optional `detailChartMulti` on metric).
 * Each series provides base `values` (any length); they are resampled per time range like {@link buildDetailChartView}.
 *
 * @param {{ aiInsightLine?: string, series: Array<{ label: string, color: string, rangeLabel: string, values: number[] }> }} multiConfig
 */
export function buildMultiMetricChartView(multiConfig, timeRangeIndex, slug = '') {
  if (!multiConfig?.series?.length) {
    return null;
  }

  const idx = Math.min(Math.max(timeRangeIndex, 0), RANGE_LENGTHS.length - 1);
  const n = RANGE_LENGTHS[idx];
  const labels = RANGE_LABELS[idx];
  const baseSeed = hashStr(`${slug}|multi|${idx}|${TIME_RANGE_TABS[idx]}`);

  const series = multiConfig.series.map((s, si) => {
    const resampled = jitterSeries(resampleArray(s.values, n), baseSeed + si * 37 + s.label.length * 3);
    return {
      label: s.label,
      color: s.color,
      rangeLabel: s.rangeLabel,
      values: resampled,
    };
  });

  return {
    months: labels.slice(0, n),
    series,
    subtitle: SUBTITLES[idx],
    aiInsightLine: multiConfig.aiInsightLine ?? 'Trending up by 5.2% this month',
  };
}

/**
 * Optional vertical “Intervention” marker on {@link MetricLineChart}.
 * `xIndexByRange` entries align with {@link TIME_RANGE_TABS} (Day / Week / Month / Year):
 * fractional index on the category axis (e.g. 1.5 = between the 2nd and 3rd tick).
 *
 * @param {{ label: string, xIndexByRange: number[] } | null | undefined} chartIntervention
 * @returns {{ label: string, xIndex: number } | null}
 */
export function resolveChartIntervention(chartIntervention, timeRangeIndex) {
  if (!chartIntervention?.label || !Array.isArray(chartIntervention.xIndexByRange)) {
    return null;
  }
  const idx = Math.min(Math.max(timeRangeIndex, 0), chartIntervention.xIndexByRange.length - 1);
  const xIndex = chartIntervention.xIndexByRange[idx];
  if (!Number.isFinite(xIndex)) return null;
  return { label: chartIntervention.label, xIndex };
}
