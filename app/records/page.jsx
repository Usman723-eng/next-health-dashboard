'use client';

import { useState } from 'react';
import Icon from '@/icons';
import SummaryStatCard from '@/components/SummaryStatCard';
import QuestionnaireCard from '@/components/records/QuestionnaireCard';
import { AVAILABLE_QUESTIONNAIRES } from '@/app/lib/recordsQuestionnaires';
import { COMPLETED_RECORDS } from '@/app/lib/completedRecords';
import RecordCard from '@/components/records/RecordCard';
import AIChatModal from '@/components/AIChatModal';

const RECORDS_SUMMARY = [
  {
    key: 'total',
    label: 'Total Records',
    value: '3',
    icon: 'records-total',
    circleClass: 'bg-[#2563EB]',
  },
  {
    key: 'questionnaires',
    label: 'Questionnaires',
    value: '1',
    icon: 'records-questionnaire',
    circleClass: 'bg-[#2563EB]',
  },
  {
    key: 'lab',
    label: 'Lab Results',
    value: '2',
    icon: 'records-lab-results',
    circleClass: 'bg-[#2563EB]',
  },
  {
    key: 'imaging',
    label: 'Imaging',
    value: '0',
    icon: 'records-imaging',
    circleClass: 'bg-[#2563EB]',
  },
  {
    key: 'genetics',
    label: 'Genetics',
    value: '0',
    icon: 'records-genetics',
    circleClass: 'bg-[#2563EB]',
  },
  {
    key: 'prescriptions',
    label: 'Prescriptions',
    value: '0',
    icon: 'records-prescription',
    circleClass: 'bg-[#2563EB]',
  },
  {
    key: 'reports',
    label: 'Reports',
    value: '0',
    icon: 'records-reports',
    circleClass: 'bg-[#2563EB]',
  },
];

export default function RecordsPage() {
  const [activeKey, setActiveKey] = useState('questionnaires');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiChatRecordTitle, setAiChatRecordTitle] = useState(undefined);

  return (
    <main className="flex flex-col gap-6 px-6 py-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-section-size font-semibold leading-9 text-primary">Records</h1>
        <button
          type="button"
          className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-border2 bg-surface px-4 py-2.5 text-sm font-medium leading-none text-primary transition-shadow hover:shadow-md"
        >
          <Icon name="upload-simple" size={20} color="currentColor" fill="none" />
          Upload Records
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {RECORDS_SUMMARY.map((row) => (
          <SummaryStatCard
            key={row.key}
            icon={row.icon}
            circleClassName={row.circleClass}
            label={row.label}
            value={row.value}
            selected={activeKey === row.key}
            onClick={() => setActiveKey(row.key)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold leading-[100%] text-primary">Available Questionnaires</h2>
        <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {AVAILABLE_QUESTIONNAIRES.map((q) => (
            <QuestionnaireCard
              key={q.id}
              title={q.title}
              category={q.category}
              description={q.description}
              onClick={() => {
                /* e.g. router.push(`/records/questionnaires/${q.id}`) */
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-2">
        <h2 className="text-xl font-bold leading-[100%] text-primary">Completed</h2>
        <div className="flex flex-col gap-4">
          {COMPLETED_RECORDS.map((row) => (
            <RecordCard
              key={row.id}
              title={row.title}
              status={row.status}
              score={row.score}
              date={row.date}
              time={row.time}
              onAskAI={() => {
                setAiChatRecordTitle(row.title);
                setAiChatOpen(true);
              }}
              onView={() => {
                /* navigate to detail */
              }}
              onDownload={() => {
                /* download */
              }}
              onDelete={() => {
                /* confirm delete */
              }}
            />
          ))}
        </div>
      </div>
      <AIChatModal
        open={aiChatOpen}
        onClose={() => {
          setAiChatOpen(false);
          setAiChatRecordTitle(undefined);
        }}
        recommendationTitle={aiChatRecordTitle}
      />
    </main>
  );
}
