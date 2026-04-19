'use client';

import { useState } from 'react';
import Icon from '@/icons';
import CustomizeMetricsModal from '@/components/CustomizeMetricsModal';
import DeviceMetricCard from '@/components/devices/DeviceMetricCard';
import { DEVICE_METRIC_CARD_DEFS } from '@/app/lib/deviceMetricCardsData';

const DEVICE_TABS = ['All', 'Withings', 'Apple'];

const DEVICE_SOURCES = [
  {
    id: 'withings',
    name: 'Withings',
    connectedCount: 1,
    tab: 'Withings',
  },
  {
    id: 'apple',
    name: 'Apple',
    connectedCount: 2,
    tab: 'Apple',
  },
];

export default function DevicesPage() {
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [customizeSource, setCustomizeSource] = useState(/** @type {null | (typeof DEVICE_SOURCES)[number]} */ (null));
  const [customizeModalKey, setCustomizeModalKey] = useState(0);

  const tab = DEVICE_TABS[activeTabIndex];
  const visibleSources =
    tab === 'All' ? DEVICE_SOURCES : DEVICE_SOURCES.filter((s) => s.tab === tab);

  return (
    <main className="flex flex-col gap-6 px-6 py-5">
      <div className="flex items-center justify-between gap-4 rounded-3xl border border-border2 bg-surface p-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h1 className="text-section-size font-semibold leading-9 text-primary">Devices</h1>
          <p className="text-secondary-size font-normal leading-5 text-secondary">
            Connect your devices to visualize sleep, activity, and recovery trends.
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 cursor-pointer rounded-full bg-black px-5 py-2.5 text-sm font-medium leading-none text-white transition-opacity hover:opacity-90"
        >
          Connect Devices
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-stretch gap-1 max-w-163 w-full rounded-xl bg-tertiary-color/12 p-0.5">
          {DEVICE_TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTabIndex(i)}
              className={`
                flex-1 cursor-pointer rounded-xl px-3 py-2 text-secondary-size leading-5 transition-all w-full
                ${activeTabIndex === i ? 'font-semibold' : 'font-medium'}
              `}
              style={
                activeTabIndex === i
                  ? {
                      backgroundColor: '#ffffff',
                      color: 'var(--tabs-active-text)',
                    }
                  : {
                      backgroundColor: 'transparent',
                      color: 'var(--tab-text-color)',
                    }
              }
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 w-full">
          {visibleSources.map((source) => (
            <div
              key={source.id}
              className="flex items-center justify-between gap-4 w-full rounded-2xl border border-border2 bg-surface p-4"
            >
              <div className="flex flex-col gap-1">
                <h2 className="text-card-header-size font-semibold leading-[100%] text-primary">{source.name}</h2>
                <p className="text-secondary-size leading-5 text-secondary">
                  {source.connectedCount} connected source{source.connectedCount === 1 ? '' : 's'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  className="rounded-full border border-border2 bg-[#F4F4F5] px-4 py-2 text-sm font-medium leading-none text-primary cursor-pointer transition-colors hover:bg-[#E4E4E7]"
                >
                  Disconnect
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCustomizeSource(source);
                    setCustomizeModalKey((n) => n + 1);
                    setCustomizeOpen(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-border2 bg-[#F4F4F5] px-4 py-2 text-sm font-medium leading-none text-primary cursor-pointer transition-colors hover:bg-[#E4E4E7]"
                >
                  <Icon name="customize-setting" size={16} color="currentColor" fill="none" />
                  Customize
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {DEVICE_METRIC_CARD_DEFS.map((def) => (
          <DeviceMetricCard
            key={def.id}
            cardId={def.id}
            title={def.title}
            source={def.source}
          />
        ))}
      </div>
      <CustomizeMetricsModal
        key={customizeModalKey}
        open={customizeOpen}
        onClose={() => {
          setCustomizeOpen(false);
          setCustomizeSource(null);
        }}
        deviceId={customizeSource?.id ?? 'withings'}
        deviceName={customizeSource?.name ?? 'Withings'}
        onApply={() => {
          /* wire save when backend exists */
        }}
      />
    </main>
  );
}
