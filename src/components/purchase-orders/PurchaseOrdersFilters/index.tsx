'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterDrawer } from './FilterDrawer';
import { type PurchaseOrderFilters } from './constants';

function DebouncedSearchInput({
  initialValue,
  onDebouncedChange,
}: {
  initialValue: string;
  onDebouncedChange: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setValue(next);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onDebouncedChange(next), 500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="relative flex-1 max-w-md">
      <Button
        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
        variant="ghost"
      >
        <Search />
      </Button>
      <Input
        placeholder="Search by PO number, vendor, or by email"
        value={value}
        onChange={handleChange}
        className="h-10"
      />
    </div>
  );
}

interface PurchaseOrdersFiltersProps {
  filters: PurchaseOrderFilters;
  onFiltersChange: (filters: PurchaseOrderFilters) => void;
  actionsBeforeFilters?: React.ReactNode;
}

export const PurchaseOrdersFilters = ({
  filters,
  onFiltersChange,
  actionsBeforeFilters,
}: PurchaseOrdersFiltersProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeDrawerCount = useMemo(() => {
    let count = 0;
    if (filters.orderDateFrom || filters.orderDateTo) count++;
    if (filters.dueDateFrom || filters.dueDateTo) count++;
    if (filters.status) count++;
    count += filters.secondaryFlags.length;
    return count;
  }, [filters]);

  const handleDebouncedSearch = (value: string) => {
    onFiltersChange({ ...filters, searchValue: value });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <DebouncedSearchInput
          key={filters.searchValue}
          initialValue={filters.searchValue}
          onDebouncedChange={handleDebouncedSearch}
        />

        <div className="flex items-center gap-3">
          {actionsBeforeFilters}
          <Button
            variant="outline"
            className="gap-2 shrink-0"
            onClick={() => setDrawerOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeDrawerCount > 0 && ` (${activeDrawerCount})`}
          </Button>
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        filters={filters}
        onApply={onFiltersChange}
      />
    </div>
  );
};
