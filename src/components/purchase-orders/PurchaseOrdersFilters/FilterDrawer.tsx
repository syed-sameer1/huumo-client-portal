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
import { DatePicker } from '@/components/form-inputs/date-picker';
import {
  STATUS_OPTIONS,
  SECONDARY_FLAG_OPTIONS,
  DEFAULT_FILTERS,
  toggleInFilterArray,
  type PurchaseOrderFilters,
} from './constants';

function ChipGroup({
  label,
  description,
  options,
  selected,
  onToggle,
  counts,
}: {
  label: string;
  description?: string;
  options: readonly { label: string; value: string }[];
  selected: string[] | string;
  onToggle: (value: string) => void;
  counts?: Record<string, number>;
}) {
  return (
    <div className="space-y-2">
      <div className="font-semibold">{label}</div>
      {description && (
        <div className="text-sm text-muted-foreground">{description}</div>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isAll = opt.value === 'all';
          const isSingle = typeof selected === 'string';
          const active = isAll
            ? isSingle
              ? selected === ''
              : selected.length === 0
            : isSingle
              ? selected === opt.value
              : selected.includes(opt.value);
          const count = counts?.[opt.value];
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onToggle(opt.value)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                active
                  ? 'border-foreground bg-foreground/5 font-medium'
                  : 'border-input hover:bg-accent'
              }`}
            >
              {opt.label}
              {count !== undefined ? ` (${count})` : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: PurchaseOrderFilters;
  onApply: (filters: PurchaseOrderFilters) => void;
}

export function FilterDrawer({
  open,
  onOpenChange,
  filters,
  onApply,
}: FilterDrawerProps) {
  const [draft, setDraft] = useState<PurchaseOrderFilters>(filters);

  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) setDraft(filters);
    onOpenChange(isOpen);
  };

  const handleStatusToggle = (val: string) => {
    if (val === 'all') {
      setDraft((d) => ({ ...d, statuses: [] }));
      return;
    }
    setDraft((d) => ({
      ...d,
      statuses: toggleInFilterArray(d.statuses, val),
    }));
  };

  const handleFlagToggle = (val: string) => {
    if (val === 'all') {
      setDraft((d) => ({ ...d, secondaryFlags: [] }));
      return;
    }
    setDraft((d) => ({
      ...d,
      secondaryFlags: toggleInFilterArray(d.secondaryFlags, val),
    }));
  };

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="right" className="flex flex-col overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
          <SheetDescription className="sr-only">
            Filter purchase orders
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 py-4">
          <div className="space-y-2">
            <div className="font-semibold">Order Date</div>
            <div className="text-sm text-muted-foreground">
              when PO was created
            </div>
            <div className="grid grid-cols-2 gap-3">
              <DatePicker
                value={
                  draft.orderDateFrom
                    ? new Date(draft.orderDateFrom)
                    : undefined
                }
                onChange={(d) =>
                  setDraft((prev) => ({
                    ...prev,
                    orderDateFrom: d ? d.toISOString().slice(0, 10) : '',
                  }))
                }
                placeholder="Start"
                format="short"
                inputClassName="h-11 w-full"
              />
              <DatePicker
                value={
                  draft.orderDateTo ? new Date(draft.orderDateTo) : undefined
                }
                onChange={(d) =>
                  setDraft((prev) => ({
                    ...prev,
                    orderDateTo: d ? d.toISOString().slice(0, 10) : '',
                  }))
                }
                placeholder="End"
                format="short"
                inputClassName="h-11 w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-semibold">Due Date</div>
            <div className="text-sm text-muted-foreground">
              when vendor is expected to deliver
            </div>
            <div className="grid grid-cols-2 gap-3">
              <DatePicker
                value={
                  draft.dueDateFrom ? new Date(draft.dueDateFrom) : undefined
                }
                onChange={(d) =>
                  setDraft((prev) => ({
                    ...prev,
                    dueDateFrom: d ? d.toISOString().slice(0, 10) : '',
                  }))
                }
                placeholder="Start"
                format="short"
                inputClassName="h-11 w-full"
              />
              <DatePicker
                value={draft.dueDateTo ? new Date(draft.dueDateTo) : undefined}
                onChange={(d) =>
                  setDraft((prev) => ({
                    ...prev,
                    dueDateTo: d ? d.toISOString().slice(0, 10) : '',
                  }))
                }
                placeholder="End"
                format="short"
                inputClassName="h-11 w-full"
              />
            </div>
          </div>

          <ChipGroup
            label="Status"
            options={STATUS_OPTIONS}
            selected={draft.statuses}
            onToggle={handleStatusToggle}
            // counts={{
            //   all: 45,
            //   acknowledge: 5,
            //   review: 5,
            //   'follow-up': 5,
            //   escalated: 5,
            //   overdue: 5,
            //   'missing-vendor-info': 5,
            //   closed: 0,
            // }}
          />

          <ChipGroup
            label="Secondary Flags"
            options={SECONDARY_FLAG_OPTIONS}
            selected={draft.secondaryFlags}
            onToggle={handleFlagToggle}
            // counts={{
            //   all: 45,
            //   'past-due': 5,
            //   'needs-review': 5,
            //   'open-follow-ups': 5,
            //   escalated: 5,
            //   'automation-paused': 3,
            // }}
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-11"
            onClick={() => {
              onApply(DEFAULT_FILTERS);
              onOpenChange(false);
            }}
          >
            Clear Filters
          </Button>
          <Button
            className="flex-1 bg-background-secondary h-11"
            onClick={() => {
              onApply(draft);
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
