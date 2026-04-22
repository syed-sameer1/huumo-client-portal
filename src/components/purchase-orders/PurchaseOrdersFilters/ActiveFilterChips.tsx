'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getSecondaryFlagLabel,
  getStatusLabel,
  type PurchaseOrderFilters,
} from './constants';

type ActiveFilterChipsProps = {
  filters: PurchaseOrderFilters;
  onFiltersChange: (filters: PurchaseOrderFilters) => void;
};

export function ActiveFilterChips({
  filters,
  onFiltersChange,
}: ActiveFilterChipsProps) {
  const statuses = filters.statuses;
  const secondary = filters.secondaryFlags;
  const hasChips = statuses.length > 0 || secondary.length > 0;

  if (!hasChips) return null;

  const removeStatus = (value: string) => {
    onFiltersChange({
      ...filters,
      statuses: filters.statuses.filter((s) => s !== value),
    });
  };

  const removeSecondary = (value: string) => {
    onFiltersChange({
      ...filters,
      secondaryFlags: filters.secondaryFlags.filter((f) => f !== value),
    });
  };

  const clearStatusAndSecondary = () => {
    onFiltersChange({ ...filters, statuses: [], secondaryFlags: [] });
  };

  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
      {statuses.map((statusValue) => (
        <span
          key={statusValue}
          className="inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1 text-sm font-medium text-[#71717A]"
        >
          {getStatusLabel(statusValue) ?? statusValue}
          <button
            type="button"
            className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={() => removeStatus(statusValue)}
            aria-label={`Remove ${getStatusLabel(statusValue) ?? statusValue} filter`}
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </span>
      ))}
      {secondary.map((flag) => (
        <span
          key={flag}
          className="inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1 text-sm font-medium text-[#71717A]"
        >
          {getSecondaryFlagLabel(flag)}
          <button
            type="button"
            className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={() => removeSecondary(flag)}
            aria-label={`Remove ${getSecondaryFlagLabel(flag)} filter`}
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </span>
      ))}
      <Button
        type="button"
        variant="ghost"
        className="h-auto px-2 py-1 text-sm font-normal text-foreground"
        onClick={clearStatusAndSecondary}
      >
        Clear All
      </Button>
    </div>
  );
}
