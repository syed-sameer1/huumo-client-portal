'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { PurchaseOrdersFilters } from '../PurchaseOrdersFilters';
import { PurchaseOrdersTable } from '../PurchaseOrdersTable';
import { usePurchaseOrders } from '@/hooks/purchaseOrders';
import { LoadingSkeleton } from './LoadingSkeleton';
import { NoPurchaseOrder } from '../EmptyPurchaseOrders/NoPurchaseOrder';
import { PurchaseOrderBanner } from '../PurchaseOrderHeader/PurchaseOrderBanner';
import {
  filtersToParams,
  paramsToFilters,
  type PurchaseOrderFilters as Filters,
} from '../PurchaseOrdersFilters/constants';
import { Button } from '@/components/ui/button';
import { type RowSelectionState } from '@tanstack/react-table';
import { DeletePurchaseOrderModal } from './DeletePurchaseOrderModal';

export const PurchaseOrdersSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filters: Filters = useMemo(
    () => paramsToFilters(searchParams),
    [searchParams],
  );

  const setFilters = useCallback(
    (next: Filters) => {
      const params = filtersToParams(next);
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router, pathname],
  );

  const filterParams = {
    searchValue: filters.searchValue || undefined,
    orderDateFrom: filters.orderDateFrom || undefined,
    orderDateTo: filters.orderDateTo || undefined,
    dueDateFrom: filters.dueDateFrom || undefined,
    dueDateTo: filters.dueDateTo || undefined,
    status: filters.status || undefined,
  };

  const { data, loading } = usePurchaseOrders(1, filterParams);
  console.log('loading', loading);

  const selectedPoIds = useMemo(() => {
    return Object.entries(rowSelection)
      .filter(([, v]) => !!v)
      .map(([k]) => Number(k))
      .filter((n) => Number.isFinite(n));
  }, [rowSelection]);

  if (loading) {
    return <LoadingSkeleton text="Loading Purchase Orders.." />;
  }

  const hasAnyFilter =
    filters.searchValue ||
    filters.status ||
    filters.quickFilters.length > 0 ||
    filters.secondaryFlags.length > 0;

  if (data?.purchaseOrders.length === 0 && !hasAnyFilter) {
    return <NoPurchaseOrder />;
  }

  return (
    <div className="space-y-4">
      <div className="text-muted-foreground text-sm">
        HUUMO automatically follows up on unacknowledged POs using the rules and
        templates you define.
      </div>
      <PurchaseOrderBanner />
      <PurchaseOrdersFilters
        filters={filters}
        onFiltersChange={setFilters}
        actionsBeforeFilters={
          selectedPoIds.length > 0 ? (
            <Button
              variant="ghost"
              className="shrink-0 text-[#EF4444]"
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>
          ) : null
        }
      />
      <PurchaseOrdersTable
        filterParams={filterParams}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />
      <DeletePurchaseOrderModal
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedPoIds={selectedPoIds}
        setRowSelection={setRowSelection}
      />
    </div>
  );
};
