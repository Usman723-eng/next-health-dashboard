'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/icons';
import HealthRecommendationCard from '@/components/HealthRecommendationCard';

const BLUE = '#0772EB';
const SEND_BG = '#171717';
const SEND_FG = '#FAFAFA';

const DEFAULT_RECOMMENDATION = [
  'Your Nutrition & Metabolic Health score is currently low, indicating that your body may be under strain in maintaining stable metabolic function. At this time, none of the tracked indicators are performing at an optimal level, and several biomarkers fall outside the recommended range.',
  'This suggests potential inconsistencies in factors such as nutrition, blood sugar regulation, or energy balance.',
];

const DEFAULT_MESSAGES = [
  {
    id: '1',
    role: 'ai',
    name: 'Ai Agent',
    time: '2 minutes ago',
    body: 'One moment. Um, let me verify that real quick.',
  },
  {
    id: '2',
    role: 'user',
    name: 'You',
    time: '2 minutes ago',
    segments: [{ type: 'text', value: 'What does this mean ' }, { type: 'pill', value: 'Mold Toxin Score' }],
  },
];

export function ChatReferencePill({ children, className = '' }) {
  return (
    <span
      className={`inline-flex h-5 max-w-full items-center rounded-full border border-border2 bg-surface px-2 py-0.5 text-xs font-normal leading-4 text-primary ${className}`}
    >
      {children}
    </span>
  );
}
function AiAgentAvatar({ className = '' }) {
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full [&_path]:stroke-white ${className}`}
      style={{ backgroundColor: BLUE }}
    >
      <Icon name="wearable-ai" size={16} color="#FFFFFF" fill="none" />
    </div>
  );
}
export function ChatAiMessageRow({ name = 'Ai Agent', time = '2 minutes ago', children, className = '' }) {
  return (
    <div className={`flex gap-2 p-2 ${className}`}>
      <AiAgentAvatar />
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium leading-5 text-primary">{name}</span>
          <span className="text-sm leading-5 text-primary">{time}</span>
        </div>
        <p className="text-sm leading-5 text-primary">{children}</p>
      </div>
    </div>
  );
}
export function ChatUserMessageCard({
  name = 'You',
  time = '2 minutes ago',
  segments = [],
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-2 rounded-md border border-border2 bg-surface px-6 pt-4 pb-2.5 ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className="text-sm font-medium leading-5 text-primary">{name}</span>
        <span className="text-sm leading-5 text-primary">{time}</span>
      </div>
      <div className="flex items-center gap-4">
        {segments.map((seg, i) =>
          seg.type === 'pill' ? (
            <ChatReferencePill key={i}>{seg.value}</ChatReferencePill>
          ) : (
            <span key={i} className="text-sm leading-5 text-primary">
              {seg.value}
            </span>
          )
        )}
      </div>
    </div>
  );
}
export function AIChatComposer({
  value,
  onChange,
  onSend,
  placeholder = 'Ask about...',
  disabled,
  className = '',
}) {
  const inputId = useId();
  const send = () => {
    const t = value.trim();
    if (!t || disabled) return;
    onSend?.(t);
  };

  return (
    <div
      className={`flex flex-col gap-2.5 rounded-md border border-border2 bg-surface p-3 ${className}`}
    >
      <label className="sr-only text-sm leading-5 text-secondary" htmlFor={inputId}>
        {placeholder}
      </label>
      <textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="min-h-5 w-full resize-none border-0 bg-transparent text-sm text-primary placeholder:text-[#737373] outline-none focus:ring-0"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }}
      />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#0A0A0A] cursor-pointer transition-colors hover:bg-surface-secondary hover:text-primary [&_path]:stroke-current"
            aria-label="Attach file"
          >
            <Icon name="ai-chat-attach" size={16} color="currentColor" fill="none" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#0A0A0A] cursor-pointer transition-colors hover:bg-surface-secondary hover:text-primary [&_path]:stroke-current"
            aria-label="Voice input"
          >
            <Icon name="ai-chat-voice" size={16} color="currentColor" fill="none" />
          </button>
        </div>
        <button
          type="button"
          onClick={send}
          disabled={disabled || !value.trim()}
          className="inline-flex h-8 items-center justify-center rounded-lg px-2.5 text-sm font-medium text-[#FAFAFA] cursor-pointer transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          style={{ backgroundColor: SEND_BG, color: SEND_FG }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

function MessageBlock({ message }) {
  if (message.role === 'ai') {
    return (
      <ChatAiMessageRow name={message.name} time={message.time}>
        {message.body}
      </ChatAiMessageRow>
    );
  }
  return (
    <ChatUserMessageCard
      name={message.name}
      time={message.time}
      segments={message.segments}
    />
  );
}
export default function AIChatModal({
  open,
  onClose,
  recommendationTitle,
  recommendationParagraphs,
  onRecommendationShowMore,
  messages = DEFAULT_MESSAGES,
  onSend,
  inputPlaceholder = 'Ask about...',
  className = '',
}) {
  const titleId = useId();
  const [draft, setDraft] = useState('');

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, handleClose]);

  useEffect(() => {
    if (open) setDraft('');
  }, [open]);

  if (!open) return null;

  const panel = (
    <div className={`fixed top-0 left-0 w-full h-screen z-200 flex justify-end ${className}`}>
      <div
        className="absolute inset-0 bg-black/50"
        aria-label="Dismiss"
        onClick={handleClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex flex-col w-full h-dvh max-w-155 overflow-hidden bg-[#FAFAFA]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between px-6 py-4">
          <div className='flex flex-col gap-1'>
            <h1 id={titleId} className="text-xl leading-[100%] font-bold text-primary">
              AI chat
            </h1>
            <p className='text-secondary-size leading-[100%] text-primary'>
              Choose with model...
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-secondary cursor-pointer transition-colors hover:bg-surface-secondary hover:text-primary [&_path]:stroke-current"
            aria-label="Close chat"
          >
            <Icon name="ai-chat-close" size={32} color="currentColor" fill="none" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-8 py-10 h-full bg-[#F3F3F3] border border-border2">
          <HealthRecommendationCard
            title={recommendationTitle}
            paragraphs={recommendationParagraphs ?? DEFAULT_RECOMMENDATION}
            onShowMore={onRecommendationShowMore}
          />
          <div className="flex flex-col gap-4">
            {messages.map((m) => (
              <MessageBlock key={m.id} message={m} />
            ))}
          </div>
        </div>
        <div className="px-8 py-4">
          <AIChatComposer
            value={draft}
            onChange={setDraft}
            placeholder={inputPlaceholder}
            onSend={(text) => {
              onSend?.(text);
              setDraft('');
            }}
          />
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(panel, document.body);
}

export { BLUE, DEFAULT_MESSAGES, DEFAULT_RECOMMENDATION };
