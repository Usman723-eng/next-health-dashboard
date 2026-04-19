import { METRICS, MONTHS } from '@/app/lib/metrics';

const SUMMARY =
  'Your biomarker result is tracked against clinical reference ranges. Follow your care plan and retest as recommended.';

const detailChartTemplate = {
  months: MONTHS,
  optimal: [31, 33, 35, 38, 42, 40, 44, 46, 48],
  warning: [11, 13, 16, 20, 24, 19, 17, 18, 15],
  critical: [4, 7, 9, 12, 16, 11, 8, 9, 6],
  optimalThreshold: 50,
  criticalThreshold: 75,
};

/** Optional multi-line chart on `/biomarkers/[slug]` (HDL + Total Cholesterol demos). */
const LAB_DETAIL_CHART_MULTI = {
  aiInsightLine: 'Trending up by 5.2% this month',
  series: [
    {
      label: 'Metric 1',
      color: '#EA580C',
      rangeLabel: 'January - June 2024',
      values: [42, 46, 44, 50, 48, 55, 52, 58, 60],
    },
    {
      label: 'Metric 2',
      color: '#14B8A6',
      rangeLabel: 'January - June 2024',
      values: [40, 41, 43, 45, 44, 47, 49, 48, 51],
    },
    {
      label: 'Metric 13',
      color: '#7C3AED',
      rangeLabel: 'January - June 2024',
      values: [36, 38, 40, 39, 42, 42, 44, 43, 46],
    },
  ],
};

const LAB_DETAIL_CHART_MULTI_ALT = {
  aiInsightLine: 'Trending up by 3.1% vs last period',
  series: [
    {
      label: 'Metric 1',
      color: '#EA580C',
      rangeLabel: 'January - June 2024',
      values: [44, 43, 47, 49, 51, 50, 54, 56, 55],
    },
    {
      label: 'Metric 2',
      color: '#14B8A6',
      rangeLabel: 'January - June 2024',
      values: [38, 39, 41, 42, 44, 43, 46, 47, 48],
    },
    {
      label: 'Metric 13',
      color: '#7C3AED',
      rangeLabel: 'January - June 2024',
      values: [34, 35, 37, 38, 40, 41, 42, 44, 45],
    },
  ],
};

/** Sidebar-style category chips for lab test detail “Description” card. */
const LAB_DESCRIPTION_TAGS_BY_SLUG = {
  'hdl-cholesterol': ['CV (Heart) Health', 'Metabolic Health', 'Nutrition'],
  'total-cholesterol': ['CV (Heart) Health', 'Metabolic Health', 'Nutrition'],
  'ldl-cholesterol': ['CV (Heart) Health', 'Metabolic Health', 'Nutrition'],
  'cholesterol-hdl-ratio': ['CV (Heart) Health', 'Metabolic Health', 'Nutrition'],
  triglycerides: ['CV (Heart) Health', 'Metabolic Health', 'Nutrition'],
  homocysteine: ['CV (Heart) Health', 'Metabolic Health'],
  plac: ['CV (Heart) Health', 'Inflammation'],
  'hs-crp': ['Immune Health', 'Inflammation'],
  creatinine: ['Liver and Kidney Health', 'Metabolic Health'],
  egfr: ['Liver and Kidney Health', 'Metabolic Health'],
};

function defaultLabDescription(title) {
  return `${title}, reported on your lab panel in standard units, is interpreted against reference ranges that depend on the assay and your clinical context. Your care team uses this marker together with symptoms, history, and related tests to guide follow-up—not from a single value alone. Monitoring trends over time often matters more than any one draw.`;
}

function defaultLabStats(partial) {
  const current = partial.detailStats?.find((s) => s.label === 'Current');
  const ref = partial.detailStats?.find((s) => s.label === 'Reference');
  const lastVal = current?.value ?? '—';
  const refStr = ref ? (ref.unit ? `${ref.value} ${ref.unit}` : String(ref.value)) : '—';
  return {
    lastValue: lastVal,
    referenceRange: refStr,
    overallChange: '0.0%',
    firstRecorded: lastVal,
    asOfDate: 'Apr 11, 2026',
  };
}

/** Nine-bar strip: single status color, varying heights (matches All Biomarkers wearable cards). */
export function wearableChartForStatus(variant) {
  const color =
    variant === 'optimal' ? '#10B981' : variant === 'fair' ? '#F59E0B' : '#EF4444';
  const values = [35, 52, 41, 58, 47, 63, 44, 55, 49];
  return {
    chartType: 'bar',
    chart: {
      values,
      colors: Array(9).fill(color),
    },
  };
}

function labMetric(partial) {
  const title = partial.title ?? 'Biomarker';
  const slug = partial.slug ?? '';
  return {
    score: 1,
    chartType: 'line',
    chartData: [60, 62, 61, 63, 64, 65, 64, 65, 66, 66],
    detailChart: { ...detailChartTemplate },
    summary: SUMMARY,
    questionnaires: 4,
    questionnairesSubtitle: 'Average Reading',
    statusItems: [
      { title: 'Biomarkers', value: '1', subtitle: 'Tracked', badge: 'In Range', type: 'success' },
    ],
    ...partial,
    description: partial.description ?? defaultLabDescription(title),
    descriptionTags: partial.descriptionTags ?? LAB_DESCRIPTION_TAGS_BY_SLUG[slug] ?? ['Biomarkers'],
    labStats: {
      ...defaultLabStats(partial),
      ...partial.labStats,
    },
  };
}

/** Individual lab tests — detail route `/biomarkers/[slug]`. */
export const BIOMARKER_LAB_METRICS = [
  labMetric({
    id: 101,
    slug: 'hdl-cholesterol',
    title: 'HDL Cholesterol',
    value: 52,
    label: 'HDL Cholesterol',
    icon: 'nutrition',
    iconBg: '#A855F7',
    detailStats: [
      { label: 'Current', value: '52', unit: 'mg/dL' },
      { label: 'Reference', value: '41–59', unit: 'mg/dL' },
    ],
    finalScore: 52,
    finalScoreSubtitle: 'Versus reference range',
    detailChartMulti: LAB_DETAIL_CHART_MULTI,
  }),
  labMetric({
    id: 102,
    slug: 'total-cholesterol',
    title: 'Total Cholesterol',
    value: 52,
    label: 'Total Cholesterol',
    icon: 'nutrition',
    iconBg: '#A855F7',
    detailStats: [
      { label: 'Current', value: '52', unit: 'mg/dL' },
      { label: 'Reference', value: '200–239', unit: 'mg/dL' },
    ],
    finalScore: 52,
    finalScoreSubtitle: 'Versus reference range',
    detailChartMulti: LAB_DETAIL_CHART_MULTI_ALT,
  }),
  labMetric({
    id: 103,
    slug: 'ldl-cholesterol',
    title: 'LDL Cholesterol',
    value: 52,
    label: 'LDL Cholesterol',
    icon: 'nutrition',
    iconBg: '#A855F7',
    detailStats: [
      { label: 'Current', value: '52', unit: 'mg/dL' },
      { label: 'Reference', value: '100–129', unit: 'mg/dL' },
    ],
    finalScore: 52,
    finalScoreSubtitle: 'Versus reference range',
    chartIntervention: {
      label: 'Intervention',
      xIndexByRange: [5.5, 1.5, 2.5, 2.5],
    },
  }),
  labMetric({
    id: 104,
    slug: 'cholesterol-hdl-ratio',
    title: 'Cholesterol / HDL Ratio',
    value: 52,
    label: 'Cholesterol / HDL Ratio',
    icon: 'nutrition',
    iconBg: '#A855F7',
    detailStats: [
      { label: 'Current', value: '52', unit: 'ratio' },
      { label: 'Reference', value: '3.5–5', unit: 'ratio' },
    ],
    finalScore: 52,
    finalScoreSubtitle: 'Versus reference range',
  }),
  labMetric({
    id: 105,
    slug: 'triglycerides',
    title: 'Triglycerides',
    value: 52,
    label: 'Triglycerides',
    icon: 'nutrition',
    iconBg: '#A855F7',
    detailStats: [
      { label: 'Current', value: '52', unit: 'mg/dL' },
      { label: 'Reference', value: '150–199', unit: 'mg/dL' },
    ],
    finalScore: 52,
    finalScoreSubtitle: 'Versus reference range',
    chartIntervention: {
      label: 'Intervention',
      xIndexByRange: [7.5, 4.5, 3.5, 4],
    },
  }),
  labMetric({
    id: 106,
    slug: 'homocysteine',
    title: 'Homocysteine',
    value: 52,
    label: 'Homocysteine',
    icon: 'heart-health',
    iconBg: '#DC2626',
    detailStats: [
      { label: 'Current', value: '52', unit: 'umol/L' },
      { label: 'Reference', value: '12–15', unit: 'umol/L' },
    ],
    finalScore: 52,
    finalScoreSubtitle: 'Versus reference range',
  }),
  labMetric({
    id: 107,
    slug: 'plac',
    title: 'PLAC',
    value: 52,
    label: 'PLAC',
    icon: 'heart-health',
    iconBg: '#DC2626',
    detailStats: [
      { label: 'Current', value: '52', unit: 'ng/mL' },
      { label: 'Reference', value: '200–235', unit: 'ng/mL' },
    ],
    finalScore: 52,
    finalScoreSubtitle: 'Versus reference range',
  }),
  labMetric({
    id: 108,
    slug: 'hs-crp',
    title: 'hs-CRP',
    value: 52,
    label: 'hs-CRP',
    icon: 'immune-health',
    iconBg: '#00ADEF',
    detailStats: [
      { label: 'Current', value: '52', unit: 'mg/L' },
      { label: 'Reference', value: '1–3', unit: 'mg/L' },
    ],
    finalScore: 52,
    finalScoreSubtitle: 'Versus reference range',
  }),
  labMetric({
    id: 109,
    slug: 'creatinine',
    title: 'Creatinine',
    value: 52,
    label: 'Creatinine',
    icon: 'detoxification',
    iconBg: '#15803D',
    detailStats: [
      { label: 'Current', value: '52', unit: 'mg/dL' },
      { label: 'Reference', value: '0.7–1.2', unit: 'mg/dL' },
    ],
    finalScore: 52,
    finalScoreSubtitle: 'Versus reference range',
  }),
  labMetric({
    id: 110,
    slug: 'egfr',
    title: 'eGFR',
    value: 52,
    label: 'eGFR',
    icon: 'detoxification',
    iconBg: '#15803D',
    detailStats: [
      { label: 'Current', value: '52', unit: 'mL/min/1.73m²' },
      { label: 'Reference', value: '60–89', unit: 'mL/min/1.73m²' },
    ],
    finalScore: 52,
    finalScoreSubtitle: 'Versus reference range',
  }),
];

export const BIOMARKER_LAB_SLUGS = BIOMARKER_LAB_METRICS.map((m) => m.slug);

/** True when `/biomarkers/[slug]` is an individual lab test from the All Biomarkers grid (not a sidebar area). */
export function isBiomarkerLabTestSlug(slug) {
  return BIOMARKER_LAB_SLUGS.includes(slug);
}

const STATUS_BY_SLUG = {
  'hdl-cholesterol': 'fair',
  'total-cholesterol': 'poor',
  'ldl-cholesterol': 'optimal',
  'cholesterol-hdl-ratio': 'poor',
  triglycerides: 'optimal',
  homocysteine: 'fair',
  plac: 'poor',
  'hs-crp': 'optimal',
  creatinine: 'poor',
  egfr: 'fair',
};

const REFERENCE_LINE_BY_SLUG = {
  'hdl-cholesterol': 'Reference: 41–59 mg/dL',
  'total-cholesterol': 'Reference: 200–239 mg/dL',
  'ldl-cholesterol': 'Reference: 100–129 mg/dL',
  'cholesterol-hdl-ratio': 'Reference: 3.5–5 ratio',
  triglycerides: 'Reference: 150–199 mg/dL',
  homocysteine: 'Reference: 12–15 umol/L',
  plac: 'Reference: 200–235 ng/mL',
  'hs-crp': 'Reference: 1–3 mg/L',
  creatinine: 'Reference: 0.7–1.2 mg/dL',
  egfr: 'Reference: 60–89 mL/min/1.73m²',
};

export const ALL_BIOMARKER_CARDS = BIOMARKER_LAB_METRICS.map((m) => {
  const status = STATUS_BY_SLUG[m.slug];
  const statusText = status === 'optimal' ? 'Optimal' : status === 'fair' ? 'Fair' : 'Poor';
  const variant = status;
  return {
    slug: m.slug,
    title: m.title,
    reference: REFERENCE_LINE_BY_SLUG[m.slug],
    value: 52,
    date: '8/10/2025',
    statusVariant: variant,
    statusText,
    ...wearableChartForStatus(status),
  };
});

export function getMetricBySlug(slug) {
  return METRICS.find((m) => m.slug === slug) ?? BIOMARKER_LAB_METRICS.find((m) => m.slug === slug);
}

/**
 * Card + modal copy for `/biomarkers/[slug]`. Prefer `metric.healthRecommendation` from METRICS / lab data;
 * otherwise derive a sensible default from `metric.title`.
 */
export function getHealthRecommendationForMetric(metric) {
  if (metric.healthRecommendation) {
    return metric.healthRecommendation;
  }
  const title = metric.title;
  const body = `Your ${title} result is tracked against your recent data and care goals. Review the indicators on this page with your clinician to interpret patterns and next steps.`;
  return {
    paragraphs: [body, body],
    modalSubtitle: `${title}: overview`,
    modalContent: [
      body,
      `Use the charts and summary below to see how ${title} fits into your broader health picture.`,
    ],
  };
}

function insightVariantFromSlugStatus(s) {
  if (s === 'optimal') return 'optimal';
  if (s === 'fair') return 'fair';
  return 'poor';
}

function defaultInsightLabel(variant) {
  if (variant === 'optimal') return 'Optimal';
  if (variant === 'fair') return 'Warning';
  return 'Poor';
}

function buildLabInsightBody(title, variant, score, referenceLine) {
  const ref = referenceLine || 'clinical reference ranges';
  if (variant === 'optimal') {
    return `Your ${title} is in the optimal zone (${score}/100), which generally represents a strong and well-balanced result relative to ${ref}. Great work – your current habits appear to be supporting this marker well. Keep doing what is working.`;
  }
  if (variant === 'fair') {
    return `Your ${title} is in the fair range (${score}/100). There is measurable variability versus the target band (${ref}). Review the pattern with your clinician and consider consistency in habits that influence this marker.`;
  }
  return `Your ${title} is in the poor range (${score}/100) relative to ${ref}. This suggests priority follow-up with your care team to clarify causes and next steps.`;
}

function buildAreaInsightBody(title, variant, score) {
  if (variant === 'optimal') {
    return `Your ${title} score is strong (${score}/100), with tracked indicators largely supporting your goals. Keep the habits that are working and monitor trends over time.`;
  }
  if (variant === 'fair') {
    return `Your ${title} score is fair (${score}/100), indicating measurable variability across this area. Weakness may be concentrated in specific indicators while others remain relatively stronger. Review the biomarkers below and prioritize the highest-impact contributors with your clinician.`;
  }
  return `Your ${title} score needs attention (${score}/100). Several indicators may be below optimal; use the summary and charts to focus follow-up with your care team.`;
}

function areaVariantFromScore(score) {
  if (score >= 72) return 'optimal';
  if (score >= 55) return 'fair';
  return 'poor';
}

/**
 * Banner under the page header: optimal (green), fair / “Warning” (cream-amber), poor (red).
 * Labs use `STATUS_BY_SLUG`; area metrics use score bands unless `metric.statusInsight` is set.
 */
export function getStatusInsightForMetric(metric, slug) {
  if (metric.statusInsight) {
    return metric.statusInsight;
  }
  const title = metric.title ?? 'Biomarker';
  const score = Number(metric.finalScore ?? metric.value ?? 0);

  if (isBiomarkerLabTestSlug(slug)) {
    const raw = STATUS_BY_SLUG[slug] ?? 'fair';
    const variant = insightVariantFromSlugStatus(raw);
    const ref = REFERENCE_LINE_BY_SLUG[slug] ?? '';
    return {
      variant,
      label: defaultInsightLabel(variant),
      body: buildLabInsightBody(title, variant, score, ref),
    };
  }

  const variant = areaVariantFromScore(score);
  return {
    variant,
    label: defaultInsightLabel(variant),
    body: buildAreaInsightBody(title, variant, score),
  };
}
