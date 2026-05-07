'use client';

import { cn } from '@/lib/utils';
import {
  VENDOR_PRESET_META,
  VENDOR_QUICK_PRESET_ORDER,
  toggleInFilterArray,
  type VendorFiltersState,
} from './constants';

export function VendorQuickPresets({
  filters,
  onFiltersChange,
}: {
  filters: VendorFiltersState;
  onFiltersChange: (next: VendorFiltersState) => void;
}) {
  const toggleQuick = (id: string) => {
    const toggled = toggleInFilterArray(filters.quickPresets, id);
    let quickPresets = toggled;
    if (
      id === 'low-confirmation-rate' &&
      toggled.includes('low-confirmation-rate')
    ) {
      quickPresets = toggled.filter((x) => x !== 'high-spend');
    } else if (id === 'high-spend' && toggled.includes('high-spend')) {
      quickPresets = toggled.filter((x) => x !== 'low-confirmation-rate');
    }
    let drawerSort = filters.drawerSort;
    if (
      id === 'low-confirmation-rate' &&
      quickPresets.includes('low-confirmation-rate')
    ) {
      drawerSort = drawerSort.filter(
        (x) => x !== 'high-spend' && x !== 'top-spend',
      );
    } else if (id === 'high-spend' && quickPresets.includes('high-spend')) {
      drawerSort = drawerSort.filter((x) => x !== 'low-confirmation-rate');
    }
    onFiltersChange({ ...filters, quickPresets, drawerSort });
  };

  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
      {VENDOR_QUICK_PRESET_ORDER.map((id) => {
        const meta = VENDOR_PRESET_META[id];
        const active = filters.quickPresets.includes(id);
        return (
          <button
            key={id}
            type="button"
            onClick={() => toggleQuick(id)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors',
              active
                ? 'border-foreground bg-foreground/5 text-foreground'
                : 'border-[#E4E4E7] bg-background text-[#71717A] hover:bg-accent',
            )}
          >
            {meta.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
