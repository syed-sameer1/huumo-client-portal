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
  vendorFiltersToSearchParams,
} from './VendorFilters/constants';
import { VendorsTable } from './VendorsTable';
import { LoadingSkeleton } from '../purchase-orders/PurchaseOrdersSection/LoadingSkeleton';

export const VendorsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

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

  if (isLoading) {
    return <LoadingSkeleton text="Loading Vendors.." />;
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
    <div className="space-y-6">
      <VendorFilters filters={filters} onFiltersChange={setVendorFilters} />
      <VendorsTable
        filters={filters}
        pageIndex={page - 1}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};
