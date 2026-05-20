'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useVendorsData } from '@/hooks/vendors';
import { PAGE_SIZE } from '@/hooks/purchaseOrders';
import { EmptyScreen } from '../empty-screen';
import { VendorFilters, type VendorFiltersState } from './VendorFilters';
import {
  hasVendorSearchOrFilters,
  searchParamsToVendorFilters,
  toggleVendorSort,
  vendorFiltersToSearchParams,
  type VendorSortField,
} from './VendorFilters/constants';
import { VendorsTable } from './VendorsTable';
import { Button } from '@/components/ui/button';
import { BulkDeleteVendorsModal } from './BulkDeleteVendorsModal';
import type { VendorData } from '@/types/vendors';
import type { RowSelectionState } from '@tanstack/react-table';
import { VendorsSkeleton } from './VendorsTable/VendorsSkeleton';

export const VendorsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedVendors, setSelectedVendors] = useState<VendorData[]>([]);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const filters: VendorFiltersState = useMemo(
    () => searchParamsToVendorFilters(searchParams),
    [searchParams],
  );

  const page = useMemo(() => {
    const raw = searchParams.get('page');
    const n = raw ? Number.parseInt(raw, 10) : 1;
    return Number.isFinite(n) && n >= 1 ? n : 1;
  }, [searchParams]);

  const setVendorFilters = useCallback(
    (next: VendorFiltersState) => {
      const p = vendorFiltersToSearchParams(next, 1);
      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    },
    [router, pathname],
  );

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      const p = vendorFiltersToSearchParams(filters, pageIndex + 1);
      router.push(`${pathname}?${p.toString()}`, { scroll: true });
    },
    [filters, pathname, router],
  );

  const handleSortChange = useCallback(
    (field: VendorSortField) => {
      setVendorFilters({
        ...filters,
        ...toggleVendorSort(filters.sortBy, filters.sortOrder, field),
      });
    },
    [filters, setVendorFilters],
  );

  const handlePageSizeChange = useCallback(
    (nextSize: number) => {
      setPageSize(nextSize);
      const p = vendorFiltersToSearchParams(filters, 1);
      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    },
    [filters, pathname, router],
  );

  const { data, isLoading } = useVendorsData(page, filters, pageSize);
  const hasFilters = hasVendorSearchOrFilters(filters);
  const isEmptyUnfiltered = !data?.vendors.length && !hasFilters && !isLoading;

  const selectedCount = Object.keys(rowSelection).filter(
    (id) => rowSelection[id],
  ).length;

  if (isLoading) {
    return <VendorsSkeleton />;
  }

  if (isEmptyUnfiltered) {
    return (
      <EmptyScreen
        title="No Vendor Right Now"
        description="You have nothing on your list yet."
        subDescription="Add new vendor"
      />
    );
  }

  return (
    <div className="min-w-0 space-y-6">
      <VendorFilters filters={filters} onFiltersChange={setVendorFilters} />
      {selectedCount > 0 && (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-medium text-foreground">
            {selectedCount === 1 ? '1 selected' : `${selectedCount} selected`}
          </span>
          <Button
            variant="ghost"
            className="shrink-0 text-[#EF4444]"
            type="button"
            onClick={() => setBulkDeleteOpen(true)}
          >
            Delete
          </Button>
        </div>
      )}
      <VendorsTable
        filters={filters}
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onSortChange={handleSortChange}
        pageIndex={page - 1}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        rowSelection={rowSelection}
        onRowSelectionChange={(next, rows) => {
          setRowSelection(next);
          setSelectedVendors(rows);
        }}
      />
      <BulkDeleteVendorsModal
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        selectedVendors={selectedVendors}
        onSuccess={() => {
          setRowSelection({});
          setSelectedVendors([]);
        }}
      />
    </div>
  );
};
