'use client';

import { use } from 'react';
import BiomarkerDetailPageView from '@/components/biomarkers/BiomarkerDetailPageView';

export default function BiomarkerDetailPage({ params }) {
  const { slug } = use(params);
  return <BiomarkerDetailPageView slug={slug} view="standard" />;
}
