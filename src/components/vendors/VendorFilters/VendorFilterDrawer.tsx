'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  DEFAULT_VENDOR_FILTERS,
  VENDOR_DRAWER_SORT_ORDER,
  VENDOR_PRESET_META,
  toggleInFilterArray,
  type VendorFiltersState,
} from './constants';

function normalizeDrawerDraft(f: VendorFiltersState): VendorFiltersState {
  const crMin = Math.min(f.confirmationRateMin, f.confirmationRateMax);
  const crMax = Math.max(f.confirmationRateMin, f.confirmationRateMax);
  const psMin = Math.min(f.performanceScoreMin, f.performanceScoreMax);
  const psMax = Math.max(f.performanceScoreMin, f.performanceScoreMax);
  const drawerSort = [
    ...new Set(
      f.drawerSort.map((id) => (id === 'top-spend' ? 'high-spend' : id)),
    ),
  ];
  return {
    ...f,
    confirmationRateMin: crMin,
    confirmationRateMax: crMax,
    performanceScoreMin: psMin,
    performanceScoreMax: psMax,
    drawerSort,
  };
}

export function VendorFilterDrawer({
  open,
  onOpenChange,
  filters,
  onApply,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: VendorFiltersState;
  onApply: (filters: VendorFiltersState) => void;
}) {
  const [draft, setDraft] = useState<VendorFiltersState>(() =>
    normalizeDrawerDraft(filters),
  );

  const handleOpen = (isOpen: boolean) => {
    if (!isOpen) {
      setDraft(normalizeDrawerDraft(filters));
    }
    onOpenChange(isOpen);
  };

  const toggleDrawerSort = (id: string) => {
    setDraft((d) => {
      let drawerSort = toggleInFilterArray(d.drawerSort, id);
      let quickPresets = d.quickPresets;

      if (
        id === 'low-confirmation-rate' &&
        drawerSort.includes('low-confirmation-rate')
      ) {
        quickPresets = quickPresets.filter((x) => x !== 'high-spend');
        drawerSort = drawerSort.filter(
          (x) => x !== 'high-spend' && x !== 'top-spend',
        );
      }
      if (id === 'high-spend' && drawerSort.includes('high-spend')) {
        quickPresets = quickPresets.filter(
          (x) => x !== 'low-confirmation-rate',
        );
        drawerSort = drawerSort.filter((x) => x !== 'low-confirmation-rate');
      }

      return { ...d, drawerSort, quickPresets };
    });
  };

  const setConfirmationRange = (v: number[]) => {
    const [a, b] = v;
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    setDraft((d) => ({
      ...d,
      confirmationRateMin: lo,
      confirmationRateMax: hi,
    }));
  };

  const setPerformanceRange = (v: number[]) => {
    const [a, b] = v;
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    setDraft((d) => ({
      ...d,
      performanceScoreMin: lo,
      performanceScoreMax: hi,
    }));
  };

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="right" className="flex flex-col overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
          <SheetDescription className="sr-only">
            Filter vendors by score and presets
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-8 py-6">
          <div className="space-y-3">
            <div className="font-semibold">Confirmation Rate</div>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[draft.confirmationRateMin, draft.confirmationRateMax]}
              onValueChange={setConfirmationRange}
              trackClassName="bg-[#20A665]/20"
              rangeClassName="bg-[#20A665]"
              thumbClassName="border-[#20A665] focus-visible:ring-[#20A665]"
              className="py-1"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{draft.confirmationRateMin}%</span>
              <span>{draft.confirmationRateMax}%</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-semibold">Performance score</div>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[draft.performanceScoreMin, draft.performanceScoreMax]}
              onValueChange={setPerformanceRange}
              trackClassName="bg-[#20A665]/20"
              rangeClassName="bg-[#20A665]"
              thumbClassName="border-[#20A665] focus-visible:ring-[#20A665]"
              className="py-1"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{draft.performanceScoreMin}%</span>
              <span>{draft.performanceScoreMax}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-semibold">Sort By</div>
            <div className="flex flex-wrap gap-2">
              {VENDOR_DRAWER_SORT_ORDER.map((id) => {
                const meta = VENDOR_PRESET_META[id];
                const active = draft.drawerSort.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleDrawerSort(id)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? 'border-foreground bg-foreground/5 font-medium'
                        : 'border-input hover:bg-accent'
                    }`}
                  >
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t pt-4">
          <Button
            variant="outline"
            className="h-11 w-full"
            onClick={() => {
              onApply(DEFAULT_VENDOR_FILTERS);
              onOpenChange(false);
            }}
          >
            Clear Filters
          </Button>
          <Button
            className="h-11 w-full bg-background-secondary hover:bg-background-secondary/90"
            onClick={() => {
              onApply({ ...draft, searchValue: filters.searchValue });
              onOpenChange(false);
            }}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
