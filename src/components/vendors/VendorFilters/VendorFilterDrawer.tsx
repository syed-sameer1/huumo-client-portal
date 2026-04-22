'use client';

import { useEffect, useState } from 'react';
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
  VENDOR_DRAWER_PRESET_ORDER,
  VENDOR_PRESET_META,
  toggleInFilterArray,
  type VendorFiltersState,
} from './constants';

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
  const [draft, setDraft] = useState<VendorFiltersState>(filters);

  useEffect(() => {
    setDraft({
      ...filters,
      confirmationRateMax: 100,
      performanceScoreMax: 100,
    });
  }, [filters]);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) setDraft(filters);
    onOpenChange(isOpen);
  };

  const togglePreset = (id: string) => {
    setDraft((d) => ({
      ...d,
      presets: toggleInFilterArray(d.presets, id),
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
              value={[draft.confirmationRateMin]}
              onValueChange={([v]) =>
                setDraft((d) => ({
                  ...d,
                  confirmationRateMin: v,
                  confirmationRateMax: 100,
                }))
              }
              trackClassName="bg-[#20A665]/20"
              rangeClassName="bg-[#20A665]"
              thumbClassName="border-[#20A665] focus-visible:ring-[#20A665]"
              className="py-1"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0</span>
              <span>100</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-semibold">Performance Score</div>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[draft.performanceScoreMin]}
              onValueChange={([v]) =>
                setDraft((d) => ({
                  ...d,
                  performanceScoreMin: v,
                  performanceScoreMax: 100,
                }))
              }
              trackClassName="bg-[#20A665]/20"
              rangeClassName="bg-[#20A665]"
              thumbClassName="border-[#20A665] focus-visible:ring-[#20A665]"
              className="py-1"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0</span>
              <span>100</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-semibold">Sort By</div>
            <div className="flex flex-wrap gap-2">
              {VENDOR_DRAWER_PRESET_ORDER.map((id) => {
                const meta = VENDOR_PRESET_META[id];
                const active = draft.presets.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => togglePreset(id)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? 'border-foreground bg-foreground/5 font-medium'
                        : 'border-input hover:bg-accent'
                    }`}
                  >
                    {meta.label}
                    {/* {meta.drawerCount !== undefined
                      ? ` (${meta.drawerCount})`
                      : ''} */}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t pt-4">
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
