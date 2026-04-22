'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DEFAULT_VENDOR_FILTERS,
  getPresetLabel,
  vendorSliderIsDefault,
  type VendorFiltersState,
} from './constants';

export function VendorActiveChips({
  filters,
  onFiltersChange,
}: {
  filters: VendorFiltersState;
  onFiltersChange: (next: VendorFiltersState) => void;
}) {
  const removePreset = (id: string) => {
    onFiltersChange({
      ...filters,
      presets: filters.presets.filter((p) => p !== id),
    });
  };

  const clearAll = () => {
    onFiltersChange(DEFAULT_VENDOR_FILTERS);
  };

  const slidersActive = !vendorSliderIsDefault(filters);

  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
      {filters.presets.map((id) => (
        <span
          key={id}
          className="inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1 text-sm font-semibold text-[#71717A]"
        >
          {getPresetLabel(id)}
          <button
            type="button"
            className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={() => removePreset(id)}
            aria-label={`Remove ${getPresetLabel(id)}`}
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </span>
      ))}
      {slidersActive && (
        <>
          <span className="inline-flex items-center rounded-full border border-input bg-background px-3 py-1 text-sm font-semibold text-[#71717A]">
            Confirmation {filters.confirmationRateMin}–
            {filters.confirmationRateMax}%
          </span>
          <span className="inline-flex items-center rounded-full border border-input bg-background px-3 py-1 text-sm font-semibold text-[#71717A]">
            Performance {filters.performanceScoreMin}–
            {filters.performanceScoreMax}%
          </span>
        </>
      )}
      <Button
        type="button"
        variant="ghost"
        className="h-auto px-2 py-1 text-sm font-normal text-foreground"
        onClick={clearAll}
      >
        Clear All
      </Button>
    </div>
  );
}
