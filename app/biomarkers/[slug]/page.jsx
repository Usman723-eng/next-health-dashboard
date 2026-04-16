'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Icon from '@/icons';
import { METRICS } from '@/app/lib/metrics';
import MetricsCard from '../MetricsCard';

const MetricLineChart = dynamic(() => import('@/components/charts/MetricLineChart'), { ssr: false });
const StackedBarChart = dynamic(() => import('@/components/charts/StackedBarChart'), { ssr: false });

const TIME_TABS = ['6 months', 'Last 30 days', 'Last 90 days'];

export default function BiomarkerDetailPage({ params }) {
  const { slug } = use(params);
  const metric = METRICS.find(m => m.slug === slug);
  if (!metric) notFound();

  const [activeTab, setActiveTab] = useState(0);

  const {
    title, icon, iconBg,
    detailStats, detailChart,
    summary,
    finalScore, finalScoreSubtitle,
    questionnaires, questionnairesSubtitle,
    statusItems,
  } = metric;

  return (
    <main className="flex flex-col pb-6">
      <div className="flex items-center justify-between pl-4.75 pt-5.75 pr-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: iconBg, color: '#ffffff' }}
          >
            <Icon name={`${icon}-large`} size={36} color="currentColor" />
          </div>
          <h1 className="text-section-size font-semibold leading-9.5 text-primary">{title}</h1>
        </div>
        <div className="flex items-center gap-1 bg-tertiary-color/12 rounded-xl p-0.5">
          {TIME_TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`
                px-1.5 py-1.75 rounded-xl text-secondary-size leading-5 cursor-pointer border-none min-w-28.75 transition-all
                ${activeTab === i ? 'font-semibold' : 'font-medium'}  
              `}
              style={
                activeTab === i
                  ? { backgroundColor: 'var(--tabs-active-bg)', color: 'var(--text-on-color)' }
                  : { backgroundColor: 'transparent', color: 'var(--tab-text-color)' }
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className='pl-4.75 pr-8 mt-4.5 mb-4.25'>
        <div className="flex flex-col gap-3 bg-surface rounded-3xl border border-border2 p-4">
          <div className="flex gap-1.5 py-1">
            <div className='flex flex-col gap-1.5 min-w-50.75'>
              <span className="text-body-size leading-6 font-semibold text-primary">Metric</span>
              <p className="text-secondary-size leading-5 text-secondary">Total for the last 3 months</p>
            </div>
            <div className="flex gap-4">
              {detailStats.map(({ label, value, unit }) => (
                <div key={label} className="flex flex-col pb-2 min-w-30">
                  <span className="text-secondary-size leading-5 text-secondary">{label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold text-primary">{value}</span>
                    {unit && <span className="text-secondary-size leading-5 text-secondary">{unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-69.25">
            <StackedBarChart
              months={detailChart.months}
              optimal={detailChart.optimal}
              warning={detailChart.warning}
              critical={detailChart.critical}
              optimalThreshold={detailChart.optimalThreshold}
              criticalThreshold={detailChart.criticalThreshold}
            />
          </div>
        </div>
      </div>
      <div className='pl-4.75 pr-8 mt-4.5 mb-4.25'>
        <div className="flex flex-col gap-3 bg-surface rounded-3xl border border-border2 p-4">
          <div className="flex flex-col gap-3 py-1">
            <div className='flex flex-col gap-1.5 min-w-50.75'>
              <span className="text-body-size leading-6 font-semibold text-primary">Metric</span>
              <p className="text-secondary-size leading-5 text-secondary">Total for the last 3 months</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {detailStats.map(({ label, value, unit }) => (
                <div key={label} className="flex flex-col pb-2">
                  <span className="text-secondary-size leading-5 text-secondary">{label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold text-primary">{value}</span>
                    {unit && <span className="text-secondary-size leading-5 text-secondary">{unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-66.5">
            <MetricLineChart
              months={detailChart.months}
              optimal={detailChart.optimal}
              warning={detailChart.warning}
              critical={detailChart.critical}
              optimalThreshold={detailChart.optimalThreshold}
              criticalThreshold={detailChart.criticalThreshold}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 pl-4.75 pr-6'>
        <div className="flex flex-col gap-3 bg-surface rounded-3xl border border-border2 p-4">
          <h2 className="text-[22px] leading-6.5 font-bold text-primary">Summary</h2>
          <div className="grid grid-cols-2 gap-3">
            <p className="text-secondary-size text-tab-text-color">{summary}</p>
            <p className="text-secondary-size text-tab-text-color">{summary}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <MetricsCard
            title="Final Score"
            value={String(finalScore)}
            subtitle={finalScoreSubtitle}
          />
          <MetricsCard
            title="Questionnaires"
            value={String(questionnaires)}
            subtitle={questionnairesSubtitle}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {statusItems.map(({ title: label, value, subtitle, badge, type }) => (
            <MetricsCard
              key={label + badge}
              title={label}
              value={value}
              subtitle={subtitle}
              badge={badge}
              type={type}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
