export const SCORING_SECTIONS_BY_SLUG = {
  movement: {
    title: 'Physical Fitness Scores',
    cards: [
      { title: 'Activity Volume', description: 'Weekly movement load is supporting your goals', value: 88, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Cardio Fitness', description: 'Aerobic capacity trending in a good range', value: 84, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Recovery Readiness', description: 'Some variability week to week — monitor load', value: 68, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Strength Index', description: 'Resistance training signals are stable', value: 79, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Mobility & Flexibility', description: 'Range and movement quality need occasional focus', value: 72, variant: 'moderate', statusText: 'Moderate - Monitor' },
    ],
  },
  heart: {
    title: 'CV (Heart) Health Scores',
    cards: [
      { title: 'Resting Heart Rate', description: 'Resting HR is in a favorable band', value: 81, variant: 'optimal', statusText: 'Optimal' },
      { title: 'HRV & Stress Load', description: 'Autonomic balance shows room to improve', value: 64, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Blood Pressure Trend', description: 'Average readings warrant continued tracking', value: 71, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Lipid Profile', description: 'Cholesterol-related markers need coordinated follow-up', value: 58, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Rhythm & Recovery', description: 'Cardiac rhythm stability looks acceptable', value: 76, variant: 'optimal', statusText: 'Optimal' },
    ],
  },
  sleep: {
    title: 'Sleep & Recovery Scores',
    cards: [
      { title: 'Sleep Quality', description: 'Overall sleep efficiency is below target', value: 48, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Deep & REM Sleep', description: 'Restorative sleep stages need improvement', value: 42, variant: 'elevated', statusText: 'Elevated - Act Now' },
      { title: 'Overnight HRV', description: 'Autonomic recovery overnight is strained', value: 44, variant: 'elevated', statusText: 'Elevated - Act Now' },
      { title: 'Wake Episodes', description: 'Fragmentation is higher than ideal', value: 51, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Daytime Recovery', description: 'Alertness and fatigue still inconsistent', value: 46, variant: 'moderate', statusText: 'Moderate - Monitor' },
    ],
  },
  brain: {
    title: 'Brain Health Scores',
    cards: [
      { title: 'Focus & Attention', description: 'Sustained concentration below optimal', value: 52, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Memory & Processing', description: 'Cognitive processing in a fair range', value: 58, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Stress & Mental Load', description: 'Stress index elevated versus targets', value: 45, variant: 'elevated', statusText: 'Elevated - Act Now' },
      { title: 'Sleep–Brain Link', description: 'Sleep support for cognition needs work', value: 49, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Cognitive Energy', description: 'Daytime mental energy is mixed', value: 61, variant: 'moderate', statusText: 'Moderate - Monitor' },
    ],
  },
  emotional: {
    title: 'Emotional Health & Stress Scores',
    cards: [
      { title: 'Perceived Stress', description: 'Self-reported stress is well managed', value: 85, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Mood Stability', description: 'Mood trend is positive overall', value: 82, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Resilience', description: 'Coping and bounce-back remain strong', value: 79, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Sleep–Mood Link', description: 'Rest is supporting emotional balance', value: 77, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Social & Support Load', description: 'Minor strain — keep monitoring', value: 72, variant: 'moderate', statusText: 'Moderate - Monitor' },
    ],
  },
  hormones: {
    title: 'Hormone Health Scores',
    cards: [
      { title: 'Cortisol Rhythm', description: 'Stress-axis pattern needs attention', value: 44, variant: 'elevated', statusText: 'Elevated - Act Now' },
      { title: 'Thyroid Signal', description: 'Thyroid-related markers are borderline', value: 52, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Sex Hormones', description: 'Androgen/estrogen balance is suboptimal', value: 48, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Metabolic–Hormone Link', description: 'Energy and weight hormones show strain', value: 46, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Growth & Repair', description: 'Anabolic signals are fair, not optimal', value: 55, variant: 'moderate', statusText: 'Moderate - Monitor' },
    ],
  },
  immune: {
    title: 'Immune Health Scores',
    cards: [
      { title: 'Inflammatory Load', description: 'Systemic inflammation markers are mixed', value: 62, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'WBC Balance', description: 'White cell pattern is generally stable', value: 71, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Recovery Immunity', description: 'Post-illness recovery could be stronger', value: 58, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Barrier & Mucosal', description: 'Gut–immune interface needs monitoring', value: 54, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Autoimmune Signal', description: 'No major red flags; continue surveillance', value: 68, variant: 'moderate', statusText: 'Moderate - Monitor' },
    ],
  },
  regenerative: {
    title: 'Cancer Prevention Scores',
    cards: [
      { title: 'Inflammation Control', description: 'Inflammatory drivers remain a priority', value: 41, variant: 'elevated', statusText: 'Elevated - Act Now' },
      { title: 'Cell Renewal & DNA Repair', description: 'Regenerative signals are below target', value: 46, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Screening Alignment', description: 'Keep age-appropriate screening on schedule', value: 52, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Lifestyle Risk Factors', description: 'Diet, activity, and exposures need tightening', value: 44, variant: 'elevated', statusText: 'Elevated - Act Now' },
      { title: 'Immune Surveillance', description: 'Immune monitoring is fair — follow up', value: 48, variant: 'moderate', statusText: 'Moderate - Monitor' },
    ],
  },
  longevity: {
    title: 'Longevity Scores',
    cards: [
      { title: 'Biological Age Gap', description: 'Pace of aging is slightly favorable', value: 72, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Metabolic Vitality', description: 'Energy systems are supporting longevity', value: 74, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Inflammation & Aging', description: 'Low-grade inflammation under control', value: 69, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Cardio Reserve', description: 'Heart and vessel resilience is decent', value: 71, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Recovery & Repair', description: 'Sleep and stress recovery support aging well', value: 67, variant: 'moderate', statusText: 'Moderate - Monitor' },
    ],
  },
  nutrition: {
    title: 'Nutrition Scores',
    cards: [
      { title: 'Micronutrient Density', description: 'Vitamins and minerals largely on track', value: 88, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Glycemic Control', description: 'Glucose-related nutrition is stable', value: 86, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Lipid-Related Diet', description: 'Fat quality and intake support goals', value: 84, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Inflammation & Diet', description: 'Dietary drivers of inflammation are low', value: 82, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Hydration & Electrolytes', description: 'Fluid balance is acceptable', value: 80, variant: 'optimal', statusText: 'Optimal' },
    ],
  },
  detox: {
    title: 'Detoxification Scores',
    cards: [
      { title: 'Liver Enzymes', description: 'Hepatic stress markers are elevated', value: 34, variant: 'elevated', statusText: 'Elevated - Act Now' },
      { title: 'Heavy Metal Burden', description: 'Circulating metals need reduction strategies', value: 38, variant: 'elevated', statusText: 'Elevated - Act Now' },
      { title: 'Clearance Capacity', description: 'Detox pathways are under strain', value: 30, variant: 'elevated', statusText: 'Elevated - Act Now' },
      { title: 'Oxidative Load', description: 'Oxidative stress is higher than ideal', value: 42, variant: 'elevated', statusText: 'Elevated - Act Now' },
      { title: 'Kidney Filtration', description: 'Renal clearance is borderline — monitor', value: 48, variant: 'moderate', statusText: 'Moderate - Monitor' },
    ],
  },
  gut: {
    title: 'Gut Health Scores',
    cards: [
      { title: 'Microbiome Diversity', description: 'Microbial balance is excellent', value: 96, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Gut Barrier', description: 'Intestinal barrier signals are strong', value: 94, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Gut Inflammation', description: 'Local inflammation markers are low', value: 92, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Digestion & Enzymes', description: 'Breakdown and absorption look good', value: 90, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Motility & Regularity', description: 'Transit and comfort are on track', value: 91, variant: 'optimal', statusText: 'Optimal' },
    ],
  },
  metabolic: {
    title: 'Metabolic Health Scores',
    cards: [
      { title: 'Glucose Control', description: 'HbA1c and glucose patterns are favorable', value: 82, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Insulin Sensitivity', description: 'Metabolic flexibility is in a good range', value: 78, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Lipid Metabolism', description: 'Triglycerides and related markers stable', value: 74, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Energy Balance', description: 'Caloric and activity balance supports health', value: 80, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Weight Trend', description: 'Body composition trajectory is acceptable', value: 76, variant: 'optimal', statusText: 'Optimal' },
    ],
  },
  'toxin-exposure': {
    title: 'Toxin & Organ Health Scores',
    cards: [
      { title: 'Mold Toxin Score', description: 'Low mold exposure, minimal health impact detected', value: 80, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Heavy Metals', description: 'Moderate heavy metal levels; matches your tracked burden — ongoing monitoring recommended', value: 61, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Environmental Toxins', description: 'Low environmental toxin exposure, overall risk remains low', value: 69, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Liver Health', description: 'Clearance pathways moderate; detox performance still worth tracking alongside exposure', value: 64, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Kidney Health', description: 'Filtration under strain; pair with exposure review and clinical follow-up', value: 29, variant: 'elevated', statusText: 'Elevated - Act Now' },
    ],
  },
  'liver-kidney': {
    title: 'Organ & Toxin Health Scores',
    cards: [
      { title: 'Liver Health', description: 'ALT-linked pattern suggests moderate reserve; detox capacity needs monitoring', value: 63, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Kidney Health', description: 'eGFR-aligned risk: kidney function needs prompt attention and intervention', value: 28, variant: 'elevated', statusText: 'Elevated - Act Now' },
      { title: 'Mold Toxin Score', description: 'Mold burden remains low versus organ stress signals on this panel', value: 79, variant: 'optimal', statusText: 'Optimal' },
      { title: 'Heavy Metals', description: 'Circulating metals elevated moderately; clearance and sources should be reviewed', value: 60, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Environmental Toxins', description: 'Environmental exposure overall low; less driver than organ markers here', value: 68, variant: 'optimal', statusText: 'Optimal' },
    ],
  },
  inflammation: {
    title: 'Inflammation Scores',
    cards: [
      { title: 'hs-CRP', description: 'Cardiovascular inflammation marker is watch-list', value: 58, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'ESR & Acute Phase', description: 'Sed rate suggests low-grade activity', value: 62, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Cytokine Load', description: 'Immune messenger pattern needs monitoring', value: 54, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Recovery Inflammation', description: 'Post-exercise or stress inflammation fair', value: 56, variant: 'moderate', statusText: 'Moderate - Monitor' },
      { title: 'Dietary Triggers', description: 'Food-related inflammation drivers moderate', value: 59, variant: 'moderate', statusText: 'Moderate - Monitor' },
    ],
  },
};
