'use client';

import { useEffect, useMemo, useState } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';
import { RolesFilterDrawer } from './RolesFilterDrawer';
import { activeRolesDrawerCount, type RolesFiltersState } from './constants';

function RolesSearchInput({
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
        placeholder="Search by name or email"
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

export type { RolesFiltersState } from './constants';

interface RolesFiltersProps {
  filters: RolesFiltersState;
  onFiltersChange: (next: RolesFiltersState) => void;
}

export const RolesFilters = ({
  filters,
  onFiltersChange,
}: RolesFiltersProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeDrawerCount = useMemo(
    () => activeRolesDrawerCount(filters),
    [filters],
  );

  const handleSearchChange = (searchValue: string) => {
    onFiltersChange({ ...filters, searchValue });
  };

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-3">
        <RolesSearchInput
          key={filters.searchValue}
          initialValue={filters.searchValue}
          onDebouncedChange={handleSearchChange}
        />
        <Button
          variant="outline"
          className="h-10 shrink-0 gap-2 rounded-md"
          onClick={() => setDrawerOpen(true)}
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeDrawerCount > 0 ? ` (${activeDrawerCount})` : ''}
        </Button>
      </div>

      <RolesFilterDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        filters={filters}
        onApply={onFiltersChange}
      />
    </div>
  );
};
