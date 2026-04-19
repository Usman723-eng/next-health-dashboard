/**
 * Series config for device dashboard metric cards (Devices page only).
 * `rangeIndex`: 0 Day, 1 Week, 2 Month, 3 Year — aligned with TIME_RANGE_TABS in biomarkerDetailChartView.
 */

const DAY_LABELS = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'];
const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_LABELS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
const YEAR_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function resample(arr, n) {
  if (!arr?.length) return Array.from({ length: n }, () => 0);
  const L = arr.length;
  return Array.from({ length: n }, (_, i) => {
    const t = (i / Math.max(n - 1, 1)) * (L - 1);
    const j = Math.floor(t);
    const f = t - j;
    const a = Number(arr[j] ?? 0);
    const b = Number(arr[Math.min(j + 1, L - 1)] ?? a);
    return Math.round(a + f * (b - a));
  });
}

/** Weight: design reference week series (Mon–Sun). */
const WEIGHT_WEEK = [9500, 5000, 5100, 10000, 2000, 4000, 2500];
const WEIGHT_Y_TICKS = [0, 2500, 5000, 7500, 10000];

/** @type {Record<string, Record<number, { xLabels: string[], values: number[], yTicks: number[] }>>} */
const SERIES = {
  weight: {
    0: {
      xLabels: DAY_LABELS,
      values: resample(WEIGHT_WEEK, 12),
      yTicks: WEIGHT_Y_TICKS,
    },
    1: {
      xLabels: WEEK_LABELS,
      values: [...WEIGHT_WEEK],
      yTicks: WEIGHT_Y_TICKS,
    },
    2: {
      xLabels: MONTH_LABELS,
      values: resample(WEIGHT_WEEK, 6),
      yTicks: WEIGHT_Y_TICKS,
    },
    3: {
      xLabels: YEAR_LABELS,
      values: resample(WEIGHT_WEEK, 12),
      yTicks: WEIGHT_Y_TICKS,
    },
  },
  bodyFat: {
    0: {
      xLabels: DAY_LABELS,
      values: [18, 19, 18, 20, 19, 21, 20, 19, 18, 20, 19, 18],
      yTicks: [0, 10, 20, 30, 40, 50],
    },
    1: {
      xLabels: WEEK_LABELS,
      values: [22, 21, 23, 22, 24, 23, 22],
      yTicks: [0, 10, 20, 30, 40, 50],
    },
    2: {
      xLabels: MONTH_LABELS,
      values: [22, 23, 22, 24, 23, 22],
      yTicks: [0, 10, 20, 30, 40, 50],
    },
    3: {
      xLabels: YEAR_LABELS,
      values: resample([24, 23, 22, 21, 22, 23], 12),
      yTicks: [0, 10, 20, 30, 40, 50],
    },
  },
  systolicBp: {
    0: {
      xLabels: DAY_LABELS,
      values: [118, 122, 120, 119, 121, 120, 118, 119, 120, 121, 119, 120],
      yTicks: [60, 80, 100, 120, 140, 160],
    },
    1: {
      xLabels: WEEK_LABELS,
      values: [118, 122, 121, 125, 119, 120, 118],
      yTicks: [60, 80, 100, 120, 140, 160],
    },
    2: {
      xLabels: MONTH_LABELS,
      values: [120, 119, 121, 118, 122, 120],
      yTicks: [60, 80, 100, 120, 140, 160],
    },
    3: {
      xLabels: YEAR_LABELS,
      values: resample([122, 120, 119, 121, 120, 118], 12),
      yTicks: [60, 80, 100, 120, 140, 160],
    },
  },
  bloodOxygen: {
    0: {
      xLabels: DAY_LABELS,
      values: [97, 98, 97, 98, 97, 98, 97, 98, 97, 98, 97, 98],
      yTicks: [85, 90, 95, 100],
    },
    1: {
      xLabels: WEEK_LABELS,
      values: [97, 98, 97, 98, 97, 98, 97],
      yTicks: [85, 90, 95, 100],
    },
    2: {
      xLabels: MONTH_LABELS,
      values: [97, 98, 97, 98, 97, 98],
      yTicks: [85, 90, 95, 100],
    },
    3: {
      xLabels: YEAR_LABELS,
      values: resample([97, 98, 97, 98], 12),
      yTicks: [85, 90, 95, 100],
    },
  },
};

export const DEVICE_METRIC_CARD_DEFS = [
  { id: 'weight', title: 'Weight', source: 'Withings' },
  { id: 'bodyFat', title: 'Body Fat', source: 'Withings' },
  { id: 'systolicBp', title: 'Systolic BP', source: 'Withings' },
  { id: 'bloodOxygen', title: 'Blood Oxygen', source: 'Withings' },
];

/**
 * @param {'weight'|'bodyFat'|'systolicBp'|'bloodOxygen'} cardId
 * @param {number} rangeIndex 0–3
 */
export function getDeviceMetricSeries(cardId, rangeIndex) {
  const idx = Math.min(Math.max(rangeIndex, 0), 3);
  const block = SERIES[cardId]?.[idx];
  if (block) return block;
  return SERIES.weight[1];
}
