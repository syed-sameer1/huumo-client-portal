'use client';

import { useState, useMemo, useEffect } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterDrawer } from './FilterDrawer';
import { ActiveFilterChips } from './ActiveFilterChips';
import { QuickFilterPresets } from './QuickFilterPresets';
import { type PurchaseOrderFilters } from './constants';
import { useSearchParams } from 'next/navigation';

function DebouncedSearchInput({
  initialValue,
  onDebouncedChange,
}: {
  initialValue: string;
  onDebouncedChange: (value: string) => void;
}) {
  const appliedSearchValue = useSearchParams().get('searchValue');
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const submitSearch = () => {
    onDebouncedChange(value);
  };

  const removeSearch = () => {
    onDebouncedChange('');
  };

  return (
    <div className="relative flex-1 w-[395px]">
      {appliedSearchValue ? (
        <Button
          type="button"
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
          variant="ghost"
          onClick={removeSearch}
          aria-label="Search"
        >
          <X />
        </Button>
      ) : (
        <Button
          type="button"
          className="absolute right-3 top-1/2 h-[100%] w-4 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
          variant="ghost"
          onClick={submitSearch}
          aria-label="Search"
        >
          <Search />
        </Button>
      )}
      <Input
        placeholder="Search by PO number, vendor, or by email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            submitSearch();
          }
        }}
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
    count += filters.statuses.length;
    count += filters.secondaryFlags.length;
    return count;
  }, [filters]);

  const handleDebouncedSearch = (value: string) => {
    onFiltersChange({ ...filters, searchValue: value });
  };

  const hasStatusOrSecondary =
    filters.statuses.length > 0 || filters.secondaryFlags.length > 0;

  return (
    <div className="flex justify-between mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <DebouncedSearchInput
          key={filters.searchValue}
          initialValue={filters.searchValue}
          onDebouncedChange={handleDebouncedSearch}
        />
        {actionsBeforeFilters}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {hasStatusOrSecondary ? (
            <ActiveFilterChips
              filters={filters}
              onFiltersChange={onFiltersChange}
            />
          ) : (
            <QuickFilterPresets
              filters={filters}
              onFiltersChange={onFiltersChange}
            />
          )}
        </div>
        <Button
          variant="outline"
          className="h-10 shrink-0 gap-2 rounded-md"
          onClick={() => setDrawerOpen(true)}
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeDrawerCount > 0 && ` (${activeDrawerCount})`}
        </Button>
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
