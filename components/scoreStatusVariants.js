
export const SCORE_VARIANTS = {
  optimal: {
    key: 'optimal',
    label: 'Optimal',
    progress: '#22C55E',
    track: '#E5E5EA',
    pillBg: '#E2FBE8',
    pillText: '#166534',
  },
  moderate: {
    key: 'moderate',
    label: 'Moderate',
    progress: '#EA580C',
    track: '#E5E5EA',
    pillBg: '#FFEDD5',
    pillText: '#9A3412',
  },
  elevated: {
    key: 'elevated',
    label: 'Elevated',
    progress: '#DC2626',
    track: '#E5E5EA',
    pillBg: '#FEE2E2',
    pillText: '#991B1B',
  },
  poor: {
    key: 'poor',
    label: 'Poor',
    progress: '#DC2626',
    track: '#E5E5EA',
    pillBg: '#FFCECE',
    pillText: '#C21919',
  },
  fair: {
    key: 'fair',
    label: 'Fair',
    progress: '#EA580C',
    track: '#E5E5EA',
    pillBg: '#FFEDD5',
    pillText: '#C2410C',
  },
};

export function scoreToVariant(score, thresholds = { optimalMin: 70, moderateMin: 40 }) {
  if (typeof score !== 'number' || Number.isNaN(score)) return 'moderate';
  if (score >= thresholds.optimalMin) return 'optimal';
  if (score >= thresholds.moderateMin) return 'moderate';
  return 'elevated';
}
