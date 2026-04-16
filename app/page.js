'use client';

import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import PolarAreaChart from "@/components/charts/PolarAreaChart";
import HealthAreaList from "./home/HealthAreaList";
import MetricsCard from "./home/MetricsCard";
import MetricsCard2 from "./home/MetricsCard2";
import ProfileCard from "./home/ProfileCard";
import { METRICS, HEALTH_AREAS } from "@/app/lib/metrics";

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
          <Link key={metric.id} href={`/biomarkers/${metric.slug}`} className="block">
            <MetricsCard2 {...metric} />
          </Link>
        ))}
      </div>
      <ThemeSwitcher/>
    </main>
  );
}
