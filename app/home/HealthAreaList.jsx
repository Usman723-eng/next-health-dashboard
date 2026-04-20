'use client';

import Icon from '@/icons';

const clampTo100 = value => Math.max(0, Math.min(100, Number(value) || 0));

function HealthAreaList({ items = [] }) {
  const renderItem = item => (
    <div key={item.id} className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div
          className="text-white flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: item.color }}
        >
          <Icon name={item.icon} size={24} color="currentcolor" />
        </div>
        <span className="text-metric-size font-normal text-primary">{item.label}</span>
      </div>
      <span className="text-metric-size font-bold text-primary min-w-9">{clampTo100(item.value)}</span>
    </div>
  );

  return (
    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
      {items.map(renderItem)}
    </div>
  );
}

export default HealthAreaList;
