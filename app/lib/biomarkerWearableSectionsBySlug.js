/**
 * Wearable-style biomarker grids for `/biomarkers/[slug]` (sidebar area routes only).
 * Structure: title + primary / secondary / devices — each is an array of cards for `WearableMetricCard`.
 */

const BAR_VALUES = [35, 52, 41, 58, 47, 63, 44, 55, 49];

function barColor(statusVariant) {
  if (statusVariant === 'optimal') return '#10B981';
  if (statusVariant === 'fair') return '#F59E0B';
  if (statusVariant === 'moderate') return '#EA580C';
  return '#EF4444';
}

function statusLabel(statusVariant) {
  if (statusVariant === 'optimal') return 'Optimal';
  if (statusVariant === 'fair') return 'Fair';
  if (statusVariant === 'moderate') return 'Moderate';
  return 'Poor';
}

/** @param {string} id @param {string} title @param {string} reference @param {string|number} value @param {'optimal'|'fair'|'moderate'|'poor'} statusVariant */
export function wearableBiomarkerCard(id, title, reference, value, statusVariant) {
  const color = barColor(statusVariant);
  return {
    id,
    title,
    reference,
    value: String(value),
    date: '8/10/2025',
    statusVariant,
    statusText: statusLabel(statusVariant),
    statusSize: 'md',
    chartType: 'bar',
    chart: {
      values: BAR_VALUES,
      colors: Array(9).fill(color),
    },
  };
}

function section(title, primary, secondary, devices) {
  return { title, primary, secondary, devices };
}

/** Repeating secondary rows for dense panels (e.g. Heavy Metals). */
function heavyMetalSecondaries(prefix, n) {
  const labels = [
    'Mercury (blood)',
    'Lead',
    'Cadmium',
    'Arsenic',
    'Nickel',
    'Aluminum',
    'Copper',
    'Chromium',
    'Manganese',
    'Selenium',
    'Cobalt',
    'Thallium',
    'Uranium',
    'Antimony',
    'Barium',
    'Bismuth',
    'Platinum',
    'Tin',
  ];
  const variants = ['poor', 'fair', 'fair', 'moderate', 'poor', 'fair', 'optimal', 'fair'];
  return Array.from({ length: n }, (_, i) => {
    const v = variants[i % variants.length];
    return wearableBiomarkerCard(
      `${prefix}-sec-${i}`,
      labels[i % labels.length],
      'Reference: lab-specific / clinician interpretation',
      20 + (i % 40),
      v
    );
  });
}

export const BIOMARKER_WEARABLE_SECTIONS_BY_SLUG = {
  movement: section(
    'Activity Biomarkers',
    [
      wearableBiomarkerCard('mv-p1', 'VO₂ estimate', 'Reference: age-adjusted bands', 48, 'fair'),
      wearableBiomarkerCard('mv-p2', 'Resting HR', 'Reference: 50–70 bpm', 62, 'optimal'),
    ],
    [
      wearableBiomarkerCard('mv-s1', 'Step load', 'Reference: goal-based', 72, 'optimal'),
      wearableBiomarkerCard('mv-s2', 'Training strain', 'Reference: personalized', 55, 'fair'),
      wearableBiomarkerCard('mv-s3', 'Recovery HRV', 'Reference: baseline +20%', 44, 'poor'),
      wearableBiomarkerCard('mv-s4', 'Active calories', 'Reference: plan target', 81, 'optimal'),
    ],
    [
      wearableBiomarkerCard('mv-d1', 'Garmin Training Status', 'Reference: device norms', 58, 'fair'),
      wearableBiomarkerCard('mv-d2', 'Apple Activity Rings', 'Reference: daily goals', 90, 'optimal'),
    ]
  ),
  heart: section(
    'Cardiovascular Biomarkers',
    [
      wearableBiomarkerCard('ht-p1', 'LDL Cholesterol', 'Reference: <100 mg/dL', 112, 'poor'),
      wearableBiomarkerCard('ht-p2', 'ApoB', 'Reference: <80 mg/dL', 88, 'fair'),
    ],
    [
      wearableBiomarkerCard('ht-s1', 'hs-CRP', 'Reference: <1.0 mg/L', 1.4, 'fair'),
      wearableBiomarkerCard('ht-s2', 'Lp(a)', 'Reference: <50 mg/dL', 42, 'moderate'),
      wearableBiomarkerCard('ht-s3', 'Triglycerides', 'Reference: <150 mg/dL', 138, 'optimal'),
      wearableBiomarkerCard('ht-s4', 'HDL', 'Reference: >40 mg/dL', 46, 'fair'),
    ],
    [
      wearableBiomarkerCard('ht-d1', 'Withings BP', 'Reference: <120/80', '118/76', 'optimal'),
      wearableBiomarkerCard('ht-d2', 'ECG watch export', 'Reference: sinus rhythm', 'Normal', 'optimal'),
    ]
  ),
  sleep: section(
    'Sleep Biomarkers',
    [
      wearableBiomarkerCard('sl-p1', 'Sleep efficiency', 'Reference: >85%', 72, 'fair'),
      wearableBiomarkerCard('sl-p2', 'Deep sleep %', 'Reference: age norms', 14, 'poor'),
    ],
    [
      wearableBiomarkerCard('sl-s1', 'REM %', 'Reference: 20–25%', 19, 'optimal'),
      wearableBiomarkerCard('sl-s2', 'Wake after sleep onset', 'Reference: <30 min', 42, 'poor'),
      wearableBiomarkerCard('sl-s3', 'Sleep latency', 'Reference: <20 min', 28, 'fair'),
      wearableBiomarkerCard('sl-s4', 'Overnight HRV', 'Reference: vs baseline', 33, 'fair'),
    ],
    [
      wearableBiomarkerCard('sl-d1', 'Oura Sleep Score', 'Reference: 70+', 61, 'fair'),
      wearableBiomarkerCard('sl-d2', 'Whoop recovery', 'Reference: green', 54, 'fair'),
    ]
  ),
  brain: section(
    'Cognitive Biomarkers',
    [
      wearableBiomarkerCard('br-p1', 'Reaction time index', 'Reference: cohort norms', 48, 'fair'),
      wearableBiomarkerCard('br-p2', 'Processing speed', 'Reference: age-matched', 52, 'moderate'),
    ],
    [
      wearableBiomarkerCard('br-s1', 'B12', 'Reference: 200–900 pg/mL', 420, 'optimal'),
      wearableBiomarkerCard('br-s2', 'Folate', 'Reference: >3 ng/mL', 14, 'optimal'),
      wearableBiomarkerCard('br-s3', 'Homocysteine', 'Reference: <15 µmol/L', 11, 'optimal'),
      wearableBiomarkerCard('br-s4', 'TSH', 'Reference: 0.4–4.0 mIU/L', 2.1, 'optimal'),
    ],
    [
      wearableBiomarkerCard('br-d1', 'Cognitive app streak', 'Reference: daily', 12, 'fair'),
      wearableBiomarkerCard('br-d2', 'Screen-time focus block', 'Reference: goals', 68, 'optimal'),
    ]
  ),
  emotional: section(
    'Stress & Mood Biomarkers',
    [
      wearableBiomarkerCard('em-p1', 'Cortisol (AM)', 'Reference: 10–20 mcg/dL', 16, 'optimal'),
      wearableBiomarkerCard('em-p2', 'DHEA-S', 'Reference: age ranges', 180, 'fair'),
    ],
    [
      wearableBiomarkerCard('em-s1', 'Heart rate stress', 'Reference: low load', 38, 'optimal'),
      wearableBiomarkerCard('em-s2', 'HRV balance', 'Reference: vs baseline', 62, 'optimal'),
      wearableBiomarkerCard('em-s3', 'Sleep-stress link', 'Reference: stable', 55, 'fair'),
      wearableBiomarkerCard('em-s4', 'Mood journal score', 'Reference: 7-day avg', 7, 'optimal'),
    ],
    [
      wearableBiomarkerCard('em-d1', 'Meditation minutes', 'Reference: 10+/day', 15, 'optimal'),
      wearableBiomarkerCard('em-d2', 'Breathing app sessions', 'Reference: 5+/week', 8, 'fair'),
    ]
  ),
  hormones: section(
    'Hormone Biomarkers',
    [
      wearableBiomarkerCard('ho-p1', 'Testosterone', 'Reference: lab range', 320, 'fair'),
      wearableBiomarkerCard('ho-p2', 'Estradiol', 'Reference: lab range', 42, 'optimal'),
    ],
    [
      wearableBiomarkerCard('ho-s1', 'FSH', 'Reference: lab range', 6, 'optimal'),
      wearableBiomarkerCard('ho-s2', 'LH', 'Reference: lab range', 8, 'fair'),
      wearableBiomarkerCard('ho-s3', 'SHBG', 'Reference: lab range', 28, 'moderate'),
      wearableBiomarkerCard('ho-s4', 'Prolactin', 'Reference: lab range', 12, 'optimal'),
    ],
    [
      wearableBiomarkerCard('ho-d1', 'Cycle tracking device', 'Reference: regular', 88, 'optimal'),
      wearableBiomarkerCard('ho-d2', 'Temp sensor', 'Reference: biphasic', 72, 'fair'),
    ]
  ),
  immune: section(
    'Immune Biomarkers',
    [
      wearableBiomarkerCard('im-p1', 'WBC', 'Reference: 4.5–11.0 K/µL', 7.2, 'optimal'),
      wearableBiomarkerCard('im-p2', 'Neutrophil %', 'Reference: 40–70%', 58, 'optimal'),
    ],
    [
      wearableBiomarkerCard('im-s1', 'hs-CRP', 'Reference: <1.0 mg/L', 2.2, 'fair'),
      wearableBiomarkerCard('im-s2', 'ESR', 'Reference: <20 mm/hr', 14, 'optimal'),
      wearableBiomarkerCard('im-s3', 'Vitamin D', 'Reference: 30–100 ng/mL', 38, 'fair'),
      wearableBiomarkerCard('im-s4', 'Ferritin', 'Reference: 30–300 ng/mL', 95, 'optimal'),
    ],
    [
      wearableBiomarkerCard('im-d1', 'Oura temp deviation', 'Reference: stable', 0.2, 'optimal'),
      wearableBiomarkerCard('im-d2', 'Illness likelihood', 'Reference: low', 12, 'fair'),
    ]
  ),
  regenerative: section(
    'Screening Biomarkers',
    [
      wearableBiomarkerCard('rg-p1', 'Inflammation index', 'Reference: low', 58, 'fair'),
      wearableBiomarkerCard('rg-p2', 'Metabolic risk', 'Reference: moderate', 62, 'fair'),
    ],
    [
      wearableBiomarkerCard('rg-s1', 'PSA (if applicable)', 'Reference: age norms', 1.1, 'optimal'),
      wearableBiomarkerCard('rg-s2', 'CA-125 (if applicable)', 'Reference: <35', 18, 'optimal'),
      wearableBiomarkerCard('rg-s3', 'CEA', 'Reference: <3 ng/mL', 2.1, 'optimal'),
      wearableBiomarkerCard('rg-s4', 'AFP', 'Reference: <10 ng/mL', 4, 'optimal'),
    ],
    [
      wearableBiomarkerCard('rg-d1', 'Screening reminders', 'Reference: on schedule', 100, 'optimal'),
      wearableBiomarkerCard('rg-d2', 'Lifestyle risk score', 'Reference: improving', 44, 'fair'),
    ]
  ),
  longevity: section(
    'Longevity Biomarkers',
    [
      wearableBiomarkerCard('lg-p1', 'Biological age delta', 'Reference: ≤0 yrs', 3, 'fair'),
      wearableBiomarkerCard('lg-p2', 'Glycan age', 'Reference: cohort norms', 48, 'optimal'),
    ],
    [
      wearableBiomarkerCard('lg-s1', 'HbA1c', 'Reference: <5.7%', 5.4, 'optimal'),
      wearableBiomarkerCard('lg-s2', 'Fasting insulin', 'Reference: <25 µIU/mL', 8, 'optimal'),
      wearableBiomarkerCard('lg-s3', 'ApoB', 'Reference: <80 mg/dL', 92, 'fair'),
      wearableBiomarkerCard('lg-s4', 'Uric acid', 'Reference: <7.0 mg/dL', 5.8, 'optimal'),
    ],
    [
      wearableBiomarkerCard('lg-d1', 'Ring recovery trend', 'Reference: upward', 64, 'optimal'),
      wearableBiomarkerCard('lg-d2', 'Steps consistency', 'Reference: 7-day', 78, 'optimal'),
    ]
  ),
  nutrition: section(
    'Nutrition Biomarkers',
    [
      wearableBiomarkerCard('nu-p1', 'Vitamin D', 'Reference: 30–100 ng/mL', 42, 'optimal'),
      wearableBiomarkerCard('nu-p2', 'Iron (ferritin)', 'Reference: 30–300 ng/mL', 68, 'optimal'),
    ],
    [
      wearableBiomarkerCard('nu-s1', 'B12', 'Reference: 200–900 pg/mL', 510, 'optimal'),
      wearableBiomarkerCard('nu-s2', 'Magnesium (RBC)', 'Reference: 4.2–6.8 mg/dL', 5.1, 'optimal'),
      wearableBiomarkerCard('nu-s3', 'Omega-3 index', 'Reference: >8%', 6, 'fair'),
      wearableBiomarkerCard('nu-s4', 'Zinc', 'Reference: 60–130 mcg/dL', 88, 'optimal'),
    ],
    [
      wearableBiomarkerCard('nu-d1', 'Food log adherence', 'Reference: 80%+', 74, 'optimal'),
      wearableBiomarkerCard('nu-d2', 'Hydration tracker', 'Reference: goal', 82, 'optimal'),
    ]
  ),
  detox: section(
    'Detox Biomarkers',
    [
      wearableBiomarkerCard('dx-p1', 'ALT', 'Reference: 7–56 U/L', 52, 'fair'),
      wearableBiomarkerCard('dx-p2', 'AST', 'Reference: 10–40 U/L', 38, 'optimal'),
    ],
    [
      wearableBiomarkerCard('dx-s1', 'GGT', 'Reference: <51 U/L', 48, 'fair'),
      wearableBiomarkerCard('dx-s2', 'Bilirubin total', 'Reference: 0.1–1.2 mg/dL', 0.9, 'optimal'),
      wearableBiomarkerCard('dx-s3', 'Albumin', 'Reference: 3.5–5.0 g/dL', 4.3, 'optimal'),
      wearableBiomarkerCard('dx-s4', 'Heavy metals (panel)', 'Reference: low burden', 33, 'poor'),
    ],
    [
      wearableBiomarkerCard('dx-d1', 'Air quality sensor', 'Reference: AQI <50', 42, 'optimal'),
      wearableBiomarkerCard('dx-d2', 'Water filter status', 'Reference: replace on time', 95, 'optimal'),
    ]
  ),
  gut: section(
    'Gut Biomarkers',
    [
      wearableBiomarkerCard('gt-p1', 'Calprotectin', 'Reference: <50 mcg/g', 28, 'optimal'),
      wearableBiomarkerCard('gt-p2', 'Zonulin', 'Reference: low', 42, 'fair'),
    ],
    [
      wearableBiomarkerCard('gt-s1', 'Secretory IgA', 'Reference: lab range', 210, 'optimal'),
      wearableBiomarkerCard('gt-s2', 'Beta defensin', 'Reference: stable', 58, 'optimal'),
      wearableBiomarkerCard('gt-s3', 'Microbiome diversity', 'Reference: high', 86, 'optimal'),
      wearableBiomarkerCard('gt-s4', 'SCFA estimate', 'Reference: adequate', 71, 'fair'),
    ],
    [
      wearableBiomarkerCard('gt-d1', 'Symptom diary', 'Reference: improving', 62, 'fair'),
      wearableBiomarkerCard('gt-d2', 'Fiber intake', 'Reference: 25g+', 22, 'fair'),
    ]
  ),
  metabolic: section(
    'Metabolic Biomarkers',
    [
      wearableBiomarkerCard('me-p1', 'Fasting glucose', 'Reference: 70–99 mg/dL', 88, 'optimal'),
      wearableBiomarkerCard('me-p2', 'HbA1c', 'Reference: <5.7%', 5.2, 'optimal'),
    ],
    [
      wearableBiomarkerCard('me-s1', 'Fasting insulin', 'Reference: <25 µIU/mL', 9, 'optimal'),
      wearableBiomarkerCard('me-s2', 'HOMA-IR', 'Reference: <2.0', 1.4, 'optimal'),
      wearableBiomarkerCard('me-s3', 'Triglycerides', 'Reference: <150 mg/dL', 122, 'optimal'),
      wearableBiomarkerCard('me-s4', 'HDL', 'Reference: >40 mg/dL', 52, 'optimal'),
    ],
    [
      wearableBiomarkerCard('me-d1', 'CGM time in range', 'Reference: >70%', 81, 'optimal'),
      wearableBiomarkerCard('me-d2', 'Weight trend', 'Reference: stable', 74, 'optimal'),
    ]
  ),
  'toxin-exposure': section(
    'Heavy Metals Biomarkers',
    [
      wearableBiomarkerCard('tx-p1', 'Lead (blood)', 'Reference: <3.5 mcg/dL', '2.4', 'fair'),
      wearableBiomarkerCard('tx-p2', 'Mercury', 'Reference: <10 mcg/L', '14', 'poor'),
    ],
    heavyMetalSecondaries('tx', 18),
    [
      wearableBiomarkerCard('tx-d1', 'Environmental sensor', 'Reference: low exposure', 58, 'fair'),
      wearableBiomarkerCard('tx-d2', 'Water heavy metals', 'Reference: below limits', 72, 'optimal'),
    ]
  ),
  'liver-kidney': section(
    'Kidney & Liver Biomarkers',
    [
      wearableBiomarkerCard('lk-p1', 'Creatinine', 'Reference: 0.7–1.2 mg/dL', '52', 'poor'),
      wearableBiomarkerCard('lk-p2', 'eGFR', 'Reference: 60–89 mL/min/1.73m²', '58', 'fair'),
    ],
    [
      wearableBiomarkerCard('lk-s1', 'Creatinine', 'Reference: 0.7–1.2 mg/dL', '52', 'poor'),
      wearableBiomarkerCard('lk-s2', 'eGFR', 'Reference: 60–89 mL/min/1.73m²', '58', 'fair'),
      wearableBiomarkerCard('lk-s3', 'BUN', 'Reference: 7–20 mg/dL', 16, 'optimal'),
      wearableBiomarkerCard('lk-s4', 'ALT', 'Reference: 7–56 U/L', 28, 'optimal'),
      wearableBiomarkerCard('lk-s5', 'AST', 'Reference: 10–40 U/L', 24, 'optimal'),
      wearableBiomarkerCard('lk-s6', 'Albumin', 'Reference: 3.5–5.0 g/dL', 4.4, 'optimal'),
    ],
    [
      wearableBiomarkerCard('lk-d1', 'Creatinine', 'Reference: 0.7–1.2 mg/dL', '52', 'poor'),
      wearableBiomarkerCard('lk-d2', 'eGFR', 'Reference: 60–89 mL/min/1.73m²', '58', 'fair'),
    ]
  ),
  inflammation: section(
    'Inflammatory Biomarkers',
    [
      wearableBiomarkerCard('if-p1', 'hs-CRP', 'Reference: <1.0 mg/L', 1.2, 'fair'),
      wearableBiomarkerCard('if-p2', 'ESR', 'Reference: <20 mm/hr', 18, 'optimal'),
    ],
    [
      wearableBiomarkerCard('if-s1', 'IL-6', 'Reference: low', 3, 'fair'),
      wearableBiomarkerCard('if-s2', 'Ferritin', 'Reference: context-specific', 140, 'fair'),
      wearableBiomarkerCard('if-s3', 'NLR', 'Reference: <3.0', 2.4, 'optimal'),
      wearableBiomarkerCard('if-s4', 'PLR', 'Reference: context-specific', 168, 'fair'),
    ],
    [
      wearableBiomarkerCard('if-d1', 'Whoop strain vs recovery', 'Reference: balanced', 55, 'fair'),
      wearableBiomarkerCard('if-d2', 'Sleep debt index', 'Reference: low', 38, 'poor'),
    ]
  ),
};
