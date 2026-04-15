'use client';

import ThemeSwitcher from "@/components/ThemeSwitcher";
import PolarAreaChart from "@/components/charts/PolarAreaChart";
import HealthAreaList from "./home/HealthAreaList";
import MetricsCard from "./home/MetricsCard";
import MetricsCard2 from "./home/MetricsCard2";
import ProfileCard from "./home/ProfileCard";

const METRICS = [
  {
    id: 1,
    title: 'Weekly activity balance',
    value: 85,
    label: 'text',
    score: 1,
    icon: 'movement',
    iconBg: '#09BC4E',
    chartType: 'line',
    chartData: [60, 62, 61, 65, 70, 72, 75, 78, 80, 85],
  },
  {
    id: 2,
    title: 'Cardiovascular efficiency',
    value: 76,
    label: 'text',
    score: 1,
    icon: 'heart-health',
    iconBg: '#E51C29',
    chartType: 'line',
    chartData: [70, 68, 72, 71, 74, 73, 75, 76, 74, 76],
  },
  {
    id: 3,
    title: 'Recovery efficiency',
    value: 46,
    label: 'text',
    score: 1,
    icon: 'recovery',
    iconBg: '#3F54E4',
    chartType: 'line',
    chartData: [40, 42, 44, 41, 43, 45, 44, 46, 45, 46],
  },
  {
    id: 4,
    title: 'Mental clarity',
    value: 56,
    label: 'text',
    score: 1,
    icon: 'brain-health',
    iconBg: '#DE2ED7',
    chartType: 'bar',
    chartData: [30, 45, 50, 40, 55, 35, 56, 42, 38, 50],
  },
  {
    id: 5,
    title: 'Emotional Health + Stress',
    value: 81,
    label: 'text',
    score: 1,
    icon: 'emotional-health',
    iconBg: '#F56138',
    chartType: 'line',
    chartData: [70, 72, 75, 74, 76, 78, 79, 80, 81, 81],
  },
  {
    id: 6,
    title: 'Hormone Health',
    value: 49,
    label: 'text',
    score: 1,
    icon: 'hormone-health',
    iconBg: '#E71590',
    chartType: 'line',
    chartData: [42, 44, 45, 43, 46, 47, 48, 47, 49, 49],
  },
  {
    id: 7,
    title: 'Immune system',
    value: 62,
    label: 'text',
    score: 1,
    icon: 'immune-health',
    iconBg: '#00ADEF',
    chartType: 'line',
    chartData: [55, 57, 58, 56, 59, 60, 61, 60, 62, 62],
  },
  {
    id: 8,
    title: 'regenerative-medicine',
    value: 44,
    label: 'text',
    score: 1,
    icon: 'regenerative-medicine',
    iconBg: '#FF3083',
    chartType: 'line',
    chartData: [38, 39, 40, 41, 40, 42, 43, 42, 44, 44],
  },
  {
    id: 9,
    title: 'Long-term health outlook',
    value: 69,
    label: 'text',
    score: 1,
    icon: 'longevity',
    iconBg: '#7BC31B',
    chartType: 'line',
    chartData: [60, 62, 63, 64, 65, 66, 67, 68, 69, 69],
  },
];

const HEALTH_AREAS = [
  { id: "nutrition", label: "Nutrition + Metabolic", value: 86, icon: "nutrition", color: "#A855F7" },
  { id: "hormone", label: "Hormone Health", value: 30, icon: "hormone-health", color: "#E71590" },
  { id: "movement", label: "Weekly activity balance", value: 78, icon: "movement", color: "#16A34A" },
  { id: "brain", label: "Mental clarity", value: 44, icon: "brain-health", color: "#DE2ED7" },
  { id: "recovery", label: "Recovery efficiency", value: 84, icon: "recovery", color: "#3F54E4" },
  { id: "cardio", label: "Cardiovascular efficiency", value: 88, icon: "heart-health", color: "#DC2626" },
  { id: "detoxification", label: "Detoxification", value: 32, icon: "detoxification", color: "#15803D" },
  { id: "immune", label: "Immune system", value: 48, icon: "immune-health", color: "#00ADEF" },
  { id: "stress", label: "Emotional Health + Stress", value: 74, icon: "emotional-health", color: "#F97316" },
  { id: "regen", label: "Regenerative Medicine", value: 70, icon: "regenerative-medicine", color: "#FF3083" },
  { id: "gut", label: "Gut Health", value: 96, icon: "gut-health", color: "#7F1D1D" },
  { id: "long-term", label: "Long-term health outlook", value: 92, icon: "longevity", color: "#7BC31B" },
  { id: "sleep", label: "Sleep quality", value: 66, icon: "recovery", color: "#8B5CF6" },
  { id: "hydration", label: "Hydration balance", value: 58, icon: "nutrition", color: "#06B6D4" },
  { id: "metabolic-flex", label: "Metabolic flexibility", value: 81, icon: "movement", color: "#84CC16" },
];

export default function Home() {
  const overallAverage = Math.round(
    HEALTH_AREAS.reduce((acc, item) => acc + item.value, 0) / HEALTH_AREAS.length
  );

  return (
    <main className="flex flex-col pb-6">
      <div className="grid grid-cols-3 gap-2.5 px-6 pt-4.25">
        <ProfileCard
          name="Michael Carter"
          age={53}
          avatarSrc="/assets/profile-image.png"
        />
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
        <div className="flex flex-col gap-27 lg:flex-row lg:items-center rounded-3xl border border-border2 bg-surface py-[41px] px-[61px]">
          <div className="flex justify-center lg:justify-start">
            <PolarAreaChart items={HEALTH_AREAS} score={overallAverage} />
          </div>
          <HealthAreaList items={HEALTH_AREAS} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 px-6">
        {METRICS.map(metric => (
          <MetricsCard2 key={metric.id} {...metric} />
        ))}
      </div>
      <ThemeSwitcher/>
    </main>
  );
}
