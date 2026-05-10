'use client';

import { cn } from '@/lib/utils';
import {
  QUICK_FILTER_PRESET_BAR,
  toggleInFilterArray,
  type PurchaseOrderFilters,
} from './constants';

type QuickFilterPresetsProps = {
  filters: PurchaseOrderFilters;
  onFiltersChange: (filters: PurchaseOrderFilters) => void;
};

export function QuickFilterPresets({
  filters,
  onFiltersChange,
}: QuickFilterPresetsProps) {
  const togglePreset = (statusValue: string) => {
    onFiltersChange({
      ...filters,
      statuses: toggleInFilterArray(filters.statuses, statusValue),
    });
  };

  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
      {QUICK_FILTER_PRESET_BAR.map((item) => {
        const active = filters.statuses.includes(item.statusValue);
        return (
          <button
            key={item.statusValue}
            type="button"
            onClick={() => togglePreset(item.statusValue)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
              active
                ? 'border-foreground bg-foreground/5 font-semibold text-foreground'
                : 'border-[#E4E4E7] bg-background text-[#71717A] hover:bg-accent',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
