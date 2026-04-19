'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/icons';
import WearableMetricCard from '@/app/home/WearableMetricCard';
import { ALL_BIOMARKER_CARDS } from '@/app/lib/biomarkerLabs';
import SummaryStatCard from '@/components/SummaryStatCard';
import AIChatModal from '@/components/AIChatModal';

const SUMMARY_STATS = [
  {
    key: 'total',
    label: 'Total Biomarkers',
    value: '160',
    icon: 'summary-total-biomarkers',
    circleClass: 'bg-[#2563EB]',
  },
  {
    key: 'in',
    label: 'In Range',
    value: '123',
    icon: 'summary-in-range',
    circleClass: 'bg-[#16A34A]',
  },
  {
    key: 'out',
    label: 'Out of Range',
    value: '37',
    icon: 'summary-out-of-range',
    circleClass: 'bg-[#DC2626]',
  },
  {
    key: 'updated',
    label: 'Last Updated',
    value: 'Apr 31, 2026',
    icon: 'summary-calendar-dots',
    circleClass: 'bg-[#9131EE]',
    valueClass: 'text-[24px]!',
  },
];

export default function AllBiomarkersPage() {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  return (
    <main className="flex flex-col gap-6 px-6 py-5">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 bg-[#48289A] rounded-full flex items-center justify-center shrink-0"
        >
          <Icon name="all-biomarkers-grid-large" size={36} color="currentColor" fill="none" className="text-white" />
        </div>
        <h1 className="text-section-size font-semibold leading-9.5 text-primary">All Biomarkers</h1>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {SUMMARY_STATS.map((row) => (
          <SummaryStatCard
            key={row.key}
            icon={row.icon}
            circleClassName={row.circleClass}
            label={row.label}
            value={row.value}
            valueClassName={row.valueClass ?? ''}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {ALL_BIOMARKER_CARDS.map((card) => (
          <Link key={card.slug} href={`/biomarkers/${card.slug}`} className="block min-h-0 no-underline">
            <WearableMetricCard
              title={card.title}
              reference={card.reference}
              value={card.value}
              date={card.date}
              statusVariant={card.statusVariant}
              statusText={card.statusText}
              statusSize="md"
              chartType={card.chartType}
              chart={card.chart}
              className="h-full transition-shadow hover:shadow-md"
              onPinClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onAiClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setAiChatOpen(true);
              }}
            />
          </Link>
        ))}
      </div>
      <AIChatModal open={aiChatOpen} onClose={() => setAiChatOpen(false)} />
    </main>
  );
}
