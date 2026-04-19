/**
 * Single ordered list: pinned items first, then recommended (order within each group is controlled by this array).
 * @typedef {'pinned' | 'recommended'} HealthPlanSection
 */

export const HEALTH_PLAN_INSIGHTS = [
  {
    id: 'nutrition',
    section: 'pinned',
    title:
      'Your Nutrition: Real Strengths Underneath — With Three Areas That Need Your Attention',
    paragraphs: [
      'At 29, your nutritional profile carries some genuinely impressive strengths — excellent metabolic control, solid protein status, and well-managed mycotoxin exposure — but your overall score of 63/100 reflects three meaningful gaps that deserve focused attention.',
    ],
    tags: ['Nutrition', 'AI generated', 'Apr 10, 2026'],
  },
  {
    id: 'metabolic',
    section: 'pinned',
    title: 'Your Metabolic Health: A Solid Foundation with Key Lifestyle Levers to Pull',
    paragraphs: [
      'Your Metabolic Health score of 77/100 reflects a genuinely encouraging picture for a 29-year-old — your core glycemic markers are working in your favour.',
      'That said, the precision target for long-term metabolic protection is an HbA1c of 5.2–5.3%, making 5.4% the threshold where optimization should begin.',
    ],
    tags: ['Metabolic Health', 'AI generated', 'Apr 10, 2026'],
  },
  {
    id: 'sleep-recovery',
    section: 'recommended',
    title:
      'Your Sleep & Recovery: Real Strengths Buried Under Critical Gaps That Need Addressing Now',
    paragraphs: [
      'Your overall Sleep + Recovery score is 0/100. While that number sounds severe, the full picture is more nuanced — and more actionable — than a single score suggests.',
      'Your data reveals some structural sleep qualities alongside critical gaps, and your Comprehensive Sleep Assessment score of 40/100 points to real lifestyle patterns working against your recovery.',
    ],
    tags: ['Sleep and Recovery', 'AI generated', 'Apr 10, 2026'],
  },
  {
    id: 'physical-fitness',
    section: 'recommended',
    title:
      'Your Physical Fitness: Real Opportunity to Build a Stronger, More Active Foundation',
    paragraphs: [
      'At 29, you have every biological advantage to build exceptional physical fitness — but right now, your data shows your movement levels are far below where they need to be to support long-term health.',
      'Your Physical Fitness category score is 0/100, driven primarily by low daily movement data.',
      'The good news: this is one of the most changeable areas in your entire health profile.',
    ],
    tags: ['Physical Fitness', 'AI generated', 'Apr 10, 2026'],
  },
];

/**
 * Rebuilds `items` after reordering IDs within one section. Other section block stays in place.
 * @param {typeof HEALTH_PLAN_INSIGHTS} items
 * @param {'pinned' | 'recommended'} section
 * @param {string[]} newOrderedIds
 */
export function rebuildSectionOrder(items, section, newOrderedIds) {
  const byId = new Map(items.map((i) => [i.id, i]));
  const reordered = newOrderedIds.map((id) => byId.get(id)).filter(Boolean);
  const other = items.filter((i) => i.section !== section);
  if (section === 'pinned') {
    return [...reordered, ...other];
  }
  return [...other, ...reordered];
}
