'use client';

import MetricsCard from "./home/MetricsCard";
import ProfileCard from "./home/ProfileCard";

export default function Home() {
  return (
    <main className="flex flex-col">
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
    </main>
  );
}
