'use client';

import { useEffect, useMemo, useState } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';
import { VendorFilterDrawer } from './VendorFilterDrawer';
import { VendorQuickPresets } from './VendorQuickPresets';
import { VendorActiveChips } from './VendorActiveChips';
import { activeVendorDrawerCount, hasVendorFilterSelection } from './constants';
import type { VendorFiltersState } from './constants';

function VendorSearchInput({
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
    <div className="relative w-full max-w-md flex-1">
      {appliedSearchValue ? (
        <Button
          type="button"
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
          variant="ghost"
          onClick={removeSearch}
          aria-label="Clear search"
        >
          <X />
        </Button>
      ) : (
        <Button
          type="button"
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
          variant="ghost"
          onClick={submitSearch}
          aria-label="Search"
        >
          <Search />
        </Button>
      )}
      <Input
        placeholder="Search by vendor name"
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

export type { VendorFiltersState } from './constants';

interface VendorFiltersProps {
  filters: VendorFiltersState;
  onFiltersChange: (next: VendorFiltersState) => void;
}

export const VendorFilters = ({
  filters,
  onFiltersChange,
}: VendorFiltersProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeDrawerCount = useMemo(
    () => activeVendorDrawerCount(filters),
    [filters],
  );

  const showChips = hasVendorFilterSelection(filters);

  const handleSearchChange = (searchValue: string) => {
    onFiltersChange({ ...filters, searchValue });
  };

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
        <VendorSearchInput
          key={filters.searchValue}
          initialValue={filters.searchValue}
          onDebouncedChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {showChips ? (
            <VendorActiveChips
              filters={filters}
              onFiltersChange={onFiltersChange}
            />
          ) : (
            <VendorQuickPresets
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

      <VendorFilterDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        filters={filters}
        onApply={onFiltersChange}
      />
    </div>
  );
};
