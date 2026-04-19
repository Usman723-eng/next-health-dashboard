'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Icon from '@/icons';
import AIChatModal from '@/components/AIChatModal';
import {
  getMetricBySlug,
  getHealthRecommendationForMetric,
  getStatusInsightForMetric,
  isBiomarkerLabTestSlug,
} from '@/app/lib/biomarkerLabs';
import BiomarkerDescriptionCard from '@/components/BiomarkerDescriptionCard';
import BiomarkerStatusInsight from '@/components/BiomarkerStatusInsight';
import HealthRecommendationCard from '@/components/HealthRecommendationCard';
import MetricsCard from '@/app/biomarkers/MetricsCard';
import ScoringMetricCard from '@/components/ScoringMetricCard';
import WearableMetricCard from '@/app/home/WearableMetricCard';
import {
  buildDetailChartView,
  buildMultiMetricChartView,
  resolveChartIntervention,
  TIME_RANGE_TABS,
} from '@/app/lib/biomarkerDetailChartView';

const MetricLineChart = dynamic(() => import('@/components/charts/MetricLineChart'), { ssr: false });
const StackedBarChart = dynamic(() => import('@/components/charts/StackedBarChart'), { ssr: false });

const LINE_BAR_TABS = ['Line', 'Bar'];

const HEADER_BADGE_STYLES = {
  optimal: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  fair: 'border-[#D6C4B0] bg-[#FFF9F0] text-[#92400E]',
  poor: 'border-red-200 bg-red-50 text-red-800',
};

function headerStatusLabelFromVariant(variant) {
  if (variant === 'optimal') return 'Optimal';
  if (variant === 'poor') return 'Poor';
  return 'Fair';
}

function labReferenceRangeLine(detailStats) {
  const ref = detailStats?.find((s) => s.label === 'Reference');
  if (!ref) return '';
  return ref.unit ? `${ref.value} ${ref.unit}` : String(ref.value);
}

export default function BiomarkerDetailPageView({ slug, view = 'standard' }) {
  const metric = getMetricBySlug(slug);
  if (!metric) notFound();

  const [timeRangeIndex, setTimeRangeIndex] = useState(2);
  const [chartKindIndex, setChartKindIndex] = useState(0);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  const {
    title, icon, iconBg,
    detailStats, detailChart,
    finalScore,
    description,
    descriptionTags,
    labStats,
    scoringSection,
    biomarkerWearableSection,
  } = metric;

  const isLabDetailPage = isBiomarkerLabTestSlug(slug);

  const detailChartView = buildDetailChartView(detailChart, timeRangeIndex, slug);

  const multiChartView = metric.detailChartMulti
    ? buildMultiMetricChartView(metric.detailChartMulti, timeRangeIndex, slug)
    : null;

  const metricLineMultiSeries = multiChartView ? { series: multiChartView.series } : null;

  const chartSubtitle = multiChartView?.subtitle ?? detailChartView.subtitle;

  const lineIntervention = resolveChartIntervention(metric.chartIntervention, timeRangeIndex);

  const healthRecommendation = !isLabDetailPage
    ? getHealthRecommendationForMetric(metric)
    : null;

  const statusInsight = getStatusInsightForMetric(metric, slug);

  const labReferenceLine = isLabDetailPage ? labReferenceRangeLine(detailStats) : '';

  const headerBadgeClass =
    HEADER_BADGE_STYLES[statusInsight?.variant] ?? HEADER_BADGE_STYLES.fair;
  const headerStatusText = headerStatusLabelFromVariant(statusInsight?.variant ?? 'fair');

  const mainClass =
    view === 'overview'
      ? 'biomarker-detail biomarker-detail--overview flex flex-col p-6'
      : 'biomarker-detail biomarker-detail--standard flex flex-col p-6';

  return (
    <main className={mainClass} data-biomarker-view={view}>
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border2 bg-surface px-4 py-4 sm:px-5">
        <div className="flex flex-1 items-center gap-3">
          {isLabDetailPage ? (
            <Link
              href="/biomarkers"
              className="flex h-9 w-9 shrink-0 items-center justify-center text-primary transition-colors hover:opacity-80"
              aria-label="Back to all biomarkers"
            >
              <Icon name="arrow-left-circle" size={24} color="currentColor" fill="none" />
            </Link>
          ) : (
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: iconBg, color: '#ffffff' }}
            >
              <Icon name={`${icon}-large`} size={36} color="currentColor" />
            </div>
          )}
          <div className="flex items-center gap-2">
            <h1 className="text-section-size font-semibold leading-9.5 text-primary">{title}</h1>
            {isLabDetailPage && labReferenceLine ? (
              <span className="text-secondary-size font-normal leading-5 text-secondary">{labReferenceLine}</span>
            ) : null}
          </div>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold leading-none ${headerBadgeClass}`}
          >
            {headerStatusText}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-[32px] font-bold leading-9 tabular-nums text-primary">{finalScore}</span>
          <button
            type="button"
            onClick={() => setAiChatOpen(true)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-2xl border border-[#4818AF80] bg-[#E2D7FA] px-3 py-2 text-sm font-medium leading-none text-[#4818AF] transition-opacity hover:opacity-90"
          >
            <Icon name="wearable-ai" size={16} color="#4818AF" fill="none" />
            Ask AI
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {statusInsight?.body ? (
          <BiomarkerStatusInsight
            variant={statusInsight.variant}
            label={statusInsight.label}
            body={statusInsight.body}
          />
        ) : null}
        {isLabDetailPage ? (
          <>
            <BiomarkerDescriptionCard
              body={description}
              tags={descriptionTags ?? []}
            />
            {labStats ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <MetricsCard
                  compact
                  title="Last Value"
                  value={String(labStats.lastValue)}
                  subtitle={labStats.asOfDate}
                />
                <MetricsCard
                  compact
                  title="Reference Range"
                  value={String(labStats.referenceRange)}
                  subtitle={labStats.asOfDate}
                />
                <MetricsCard
                  compact
                  title="Overall Change"
                  value={String(labStats.overallChange)}
                  subtitle={labStats.asOfDate}
                />
                <MetricsCard
                  compact
                  title="First Recorded"
                  value={String(labStats.firstRecorded)}
                  subtitle={labStats.asOfDate}
                />
              </div>
            ) : null}
          </>
        ) : (
          healthRecommendation && (
            <HealthRecommendationCard
              paragraphs={healthRecommendation.paragraphs}
              modalSubtitle={healthRecommendation.modalSubtitle}
              modalContent={healthRecommendation.modalContent}
            />
          )
        )}
      </div>
      <div className="flex flex-col gap-3 bg-surface rounded-3xl border border-border2 p-4 mt-6">
        <div className="flex flex-col gap-3 py-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1.5 min-w-50.75">
              <span className="text-body-size leading-6 font-semibold text-primary">Metric</span>
              <p className="text-secondary-size leading-5 text-secondary">{chartSubtitle}</p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2.5">
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-0.75">
                {TIME_RANGE_TABS.map((tab, i) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setTimeRangeIndex(i)}
                    className={`
                      px-1.5 py-0.75 rounded-xl text-secondary-size leading-5 cursor-pointer border-none transition-all
                      ${timeRangeIndex === i ? 'font-semibold' : 'font-medium'}
                    `}
                    style={
                      timeRangeIndex === i
                        ? { backgroundColor: 'var(--tabs-active-bg)', color: 'var(--tabs-active-text)' }
                        : { backgroundColor: 'transparent', color: 'var(--tab-text-color)' }
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-0.5">
                {LINE_BAR_TABS.map((tab, i) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setChartKindIndex(i)}
                    className={`
                      px-1.5 py-1.75 rounded-xl text-secondary-size leading-4.5 cursor-pointer border-none min-w-30 transition-all
                      ${chartKindIndex === i ? 'font-semibold' : 'font-medium'}
                    `}
                    style={
                      chartKindIndex === i
                        ? { backgroundColor: 'var(--tabs-active-bg)', color: 'var(--tabs-active-text)' }
                        : { backgroundColor: 'transparent', color: 'var(--tab-text-color)' }
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {!multiChartView && (
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
          )}
          {multiChartView && LINE_BAR_TABS[chartKindIndex] === 'Line' ? (
            <div className="flex flex-wrap gap-8 border-t border-border2 pt-4">
              {multiChartView.series.map((s) => (
                <div key={s.label} className="flex min-w-0 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-sm font-semibold leading-5 text-primary">{s.label}</span>
                  </div>
                  <span className="text-secondary-size leading-5 text-secondary">{s.rangeLabel}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {LINE_BAR_TABS[chartKindIndex] === 'Line' ? (
          <div className="h-66.5">
            <MetricLineChart
              months={multiChartView ? multiChartView.months : detailChartView.months}
              optimal={detailChartView.optimal}
              warning={detailChartView.warning}
              critical={detailChartView.critical}
              optimalThreshold={detailChartView.optimalThreshold}
              criticalThreshold={detailChartView.criticalThreshold}
              multiSeries={metricLineMultiSeries}
              intervention={lineIntervention}
            />
          </div>
        ) : (
          <div className="h-69.25">
            <StackedBarChart
              months={detailChartView.months}
              optimal={detailChartView.optimal}
              warning={detailChartView.warning}
              critical={detailChartView.critical}
              optimalThreshold={detailChartView.optimalThreshold}
              criticalThreshold={detailChartView.criticalThreshold}
            />
          </div>
        )}
        {multiChartView && LINE_BAR_TABS[chartKindIndex] === 'Line' ? (
          <div className="mt-3 flex flex-col gap-1 border-t border-border2 pt-4">
            <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
              <span>{multiChartView.aiInsightLine}</span>
              <span className="text-emerald-600" aria-hidden>
                ↑
              </span>
            </div>
            <span className="text-xs leading-4 text-secondary">Ai insight</span>
          </div>
        ) : null}
      </div>
      {scoringSection?.cards?.length ? (
        <div className="flex flex-col gap-4 mt-6">
          <h2 className="text-section-size font-semibold leading-9 text-primary">
            {scoringSection.title}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scoringSection.cards.map((card) => (
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
        </div>
      ) : null}
      {!isLabDetailPage && biomarkerWearableSection ? (
        <div className="flex flex-col gap-6 mt-6">
          <h2 className="text-section-size font-semibold leading-9 text-primary">
            {biomarkerWearableSection.title}
          </h2>
          {[
            { key: 'primary', heading: (items) => `Primary (${items.length})` },
            { key: 'secondary', heading: (items) => `Secondary (${items.length})` },
            { key: 'devices', heading: () => 'Devices' },
          ].map(({ key, heading }) => {
            const items = biomarkerWearableSection[key];
            if (!items?.length) return null;
            return (
              <div key={key} className="flex flex-col gap-4">
                <h3 className="text-body-size font-bold leading-[100%] text-primary">
                  {heading(items)}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
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
              </div>
            );
          })}
        </div>
      ) : null}
      <AIChatModal open={aiChatOpen} onClose={() => setAiChatOpen(false)} />
    </main>
  );
}
