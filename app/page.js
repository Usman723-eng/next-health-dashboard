'use client';

import { useState } from "react";
import PolarAreaChart from "@/components/charts/PolarAreaChart";
import AIChatModal from "@/components/AIChatModal";
import HealthAreaList from "./home/HealthAreaList";
import MetricsCard from "./home/MetricsCard";
import ProfileCard from "./home/ProfileCard";
import { HEALTH_AREAS } from "@/app/lib/metrics";
import ScoringMetricCard from "@/components/ScoringMetricCard";
import WearableMetricCard from "./home/WearableMetricCard";
import SummaryStatCard from "@/components/SummaryStatCard";

const WEARABLE_CARDS = [
  {
    id: "sleep",
    title: "Sleep",
    reference: "Reference: 0.7–1.2 mg/dL",
    value: 52,
    date: "8/10/2025",
    statusVariant: "poor",
    statusText: "Poor",
    statusSize: "md",
    chartType: "bar",
    chart: {
      values: [32, 88, 35, 90, 40, 85, 38, 55],
      colors: [
        "#10B981",
        "#EF4444",
        "#10B981",
        "#EF4444",
        "#10B981",
        "#EF4444",
        "#10B981",
        "#F59E0B",
      ],
    },
  },
  {
    id: "weight",
    title: "Weight",
    reference: "Reference: 60–89 mL/min/1.73m²",
    value: 52,
    date: "8/10/2025",
    statusVariant: "fair",
    statusText: "Fair",
    statusSize: "md",
    chartType: "line",
    chart: {
      values: [46, 48, 51, 49, 50, 52, 51, 50],
      lineColor: "#C026D3",
    },
  },
  {
    id: "something",
    title: "Something",
    reference: "Reference: 60–89 mL/min/1.73m²",
    value: 52,
    date: "8/10/2025",
    statusVariant: "fair",
    statusText: "Fair",
    statusSize: "md",
    chartType: "stacked",
    chart: {
      months: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
      optimal:  [50, 50, 40, 70, 60, 40, 60, 60, 70],
      warning:  [10, 10, 10, 10, 10, 10, 10, 10, 10],
      critical: [10, 10, 10, 10, 10, 10, 10, 10, 10],
      optimalThreshold: 50,
      criticalThreshold: 75,
    },
  },
];
const SCORING_CARD_DEMOS = [
  {
    title: "Mold Toxin Score",
    description: "Low mold exposure, minimal health impact detected",
    value: 80,
    variant: "optimal",
    statusText: "Optimal",
  },
  {
    title: "Heavy Metals",
    description: "Monitor exposure levels and follow recommended limits",
    value: 61,
    variant: "moderate",
    statusText: "Moderate - Monitor",
  },
  {
    title: "Environmental Toxins",
    description: "Low overall exposure across monitored compounds",
    value: 69,
    variant: "optimal",
    statusText: "Optimal",
  },
  {
    title: "Liver Health",
    description: "Some markers need attention and lifestyle review",
    value: 64,
    variant: "moderate",
    statusText: "Moderate - Monitor",
  },
  {
    title: "Kidney Health",
    description: "Elevated risk — follow up with your care team",
    value: 29,
    variant: "elevated",
    statusText: "Elevated - Act Now",
  },
];
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
  }
];

export default function Home() {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const overallAverage = Math.round(
    HEALTH_AREAS.reduce((acc, item) => acc + item.value, 0) / HEALTH_AREAS.length
  );

  return (
    <main className="flex flex-col pb-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5 px-6 pt-4.25">
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
        <MetricsCard
          label="Biological Age"
          value="51.1"
          variant="green"
        />
        <MetricsCard
          label="Vitality Score"
          value="68"
          variant="orange"
        />
      </div>
      <div className="px-6 mt-3.75 mb-4.25">
        <div className="flex flex-col gap-27 lg:flex-row lg:items-center rounded-3xl border border-border2 bg-surface py-10.25 px-15.25">
          <div className="flex justify-center lg:justify-start">
            <PolarAreaChart items={HEALTH_AREAS} score={overallAverage} />
          </div>
          <HealthAreaList items={HEALTH_AREAS} />
        </div>
      </div>
      {/* <div className="grid grid-cols-3 gap-4 px-6">
        {METRICS.map(metric => (
          <Link key={metric.id} href={`/biomarkers/${metric.slug}`} className="block">
            <MetricsCard2 {...metric} />
          </Link>
        ))}
      </div> */}
      <section className="flex flex-col gap-4 px-6">
        <h2 className="text-section-size font-semibold leading-9 text-primary">
          Scoring
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SCORING_CARD_DEMOS.map((card) => (
            <ScoringMetricCard
              key={card.title}
              title={card.title}
              description={card.description}
              value={card.value}
              variant={card.variant}
              statusText={card.statusText}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4 px-6 my-5.75">
        <h2 className="text-section-size font-semibold leading-9 text-primary">
          Pinned
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {WEARABLE_CARDS.map((item) => (
            <WearableMetricCard
              key={item.id}
              title={item.title}
              reference={item.reference}
              value={item.value}
              date={item.date}
              statusVariant={item.statusVariant}
              statusText={item.statusText}
              statusSize={item.statusSize}
              chartType={item.chartType}
              chart={item.chart}
              onAiClick={() => setAiChatOpen(true)}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4 px-6">
        <h2 className="text-section-size font-semibold leading-9 text-primary">
          Wearables
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {WEARABLE_CARDS.map((item) => (
            <WearableMetricCard
              key={item.id}
              title={item.title}
              reference={item.reference}
              value={item.value}
              date={item.date}
              statusVariant={item.statusVariant}
              statusText={item.statusText}
              statusSize={item.statusSize}
              chartType={item.chartType}
              chart={item.chart}
              onAiClick={() => setAiChatOpen(true)}
            />
          ))}
        </div>
      </section>
      <AIChatModal open={aiChatOpen} onClose={() => setAiChatOpen(false)} />
    </main>
  );
}
