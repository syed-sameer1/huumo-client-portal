'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PurchaseOrdersFilters } from '../PurchaseOrdersFilters';
import { PurchaseOrdersTable } from '../PurchaseOrdersTable';
import {
  PAGE_SIZE,
  usePurchaseOrders,
  usePurchaseOrderBulkAction,
} from '@/hooks/purchaseOrders';
import { NoPurchaseOrder } from '../EmptyPurchaseOrders/NoPurchaseOrder';
import { PurchaseOrderBanner } from '../PurchaseOrderHeader/PurchaseOrderBanner';
import {
  filtersToParams,
  paramsToFilters,
  type PurchaseOrderFilters as Filters,
} from '../PurchaseOrdersFilters/constants';
import { Button } from '@/components/ui/button';
import { type RowSelectionState } from '@tanstack/react-table';
import type { PurchaseOrders } from '@/types/purchaseOrders';
import { DeletePurchaseOrderModal } from './DeletePurchaseOrderModal';
import { cn } from '@/lib/utils';
import { PurchaseOrdersSkeleton } from '../PurchaseOrdersTable/PurchaseOrderSkeleton';

function filterMatchMessage(totalPurchaseOrders: number): string {
  if (totalPurchaseOrders === 1) {
    return '1 purchase order matches your filters';
  }
  return `${totalPurchaseOrders} purchase orders match your filters`;
}

export const PurchaseOrdersSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { mutate: bulkAction, isPending: isBulkClosing } =
    usePurchaseOrderBulkAction();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedPurchaseOrders, setSelectedPurchaseOrders] = useState<
    PurchaseOrders[]
  >([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

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
    statuses: filters.statuses.length > 0 ? filters.statuses : undefined,
    secondaryFlags:
      filters.secondaryFlags.length > 0 ? filters.secondaryFlags : undefined,
  };

  const { data, loading, isFetching } = usePurchaseOrders(
    1,
    filterParams,
    pageSize,
  );

  const selectedPoIds = useMemo(
    () =>
      Object.keys(rowSelection)
        .filter((id) => rowSelection[id])
        .map(Number),
    [rowSelection],
  );

  const handleRowSelectionChange = useCallback(
    (selection: RowSelectionState, selectedRows: PurchaseOrders[]) => {
      setRowSelection(selection);
      setSelectedPurchaseOrders(selectedRows);
    },
    [],
  );

  if (loading) {
    return <PurchaseOrdersSkeleton />;
  }

  const hasAnyFilter =
    filters.searchValue ||
    filters.statuses.length > 0 ||
    filters.quickFilters.length > 0 ||
    filters.secondaryFlags.length > 0 ||
    filters.orderDateFrom ||
    filters.orderDateTo ||
    filters.dueDateFrom ||
    filters.dueDateTo;

  if (data?.purchaseOrders.length === 0 && !hasAnyFilter) {
    return <NoPurchaseOrder />;
  }

  return (
    <div className="space-y-4 min-w-0">
      <div className="text-muted-foreground text-sm">
        HUUMO automatically follows up on unacknowledged POs using the rules and
        templates you define.
      </div>
      <PurchaseOrderBanner />
      <PurchaseOrdersFilters filters={filters} onFiltersChange={setFilters} />
      {(hasAnyFilter || selectedPoIds.length > 0) && (
        <div
          className={cn(
            'text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-sm',
            selectedPoIds.length > 0 && hasAnyFilter && 'justify-between',
          )}
        >
          {hasAnyFilter && !isFetching && !!data?.totalPurchaseOrders && (
            <span>{filterMatchMessage(data?.totalPurchaseOrders ?? 0)}</span>
          )}
          {hasAnyFilter && selectedPoIds.length > 0 && (
            <span aria-hidden className="text-muted-foreground/70">
              ·
            </span>
          )}
          {selectedPoIds.length > 0 && (
            <div>
              <span className="font-medium text-foreground mr-3">
                {selectedPoIds.length === 1
                  ? '1 selected'
                  : `${selectedPoIds.length} selected`}
              </span>

              <Button
                variant="ghost"
                className="shrink-0 text-[#EF4444]"
                disabled={isBulkClosing}
                onClick={() => setDeleteOpen(true)}
              >
                Delete
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="shrink-0 text-[#71717A]"
                disabled={selectedPoIds.length === 0 || isBulkClosing}
                onClick={() => {
                  bulkAction(
                    { poIds: selectedPoIds, action: 'close' },
                    {
                      onSuccess: () => {
                        toast.success('Purchase order(s) marked as closed');
                        queryClient.invalidateQueries({
                          queryKey: ['purchase-orders'],
                          exact: false,
                        });
                        queryClient.invalidateQueries({
                          queryKey: ['client-settings'],
                          exact: false,
                        });
                        setRowSelection({});
                        setSelectedPurchaseOrders([]);
                      },
                      onError: () => {
                        toast.error('Could not mark as closed. Try again.');
                      },
                    },
                  );
                }}
              >
                {isBulkClosing ? 'Closing…' : 'Mark as closed'}
              </Button>
            </div>
          )}
        </div>
      )}
      <PurchaseOrdersTable
        filterParams={filterParams}
        rowSelection={rowSelection}
        onRowSelectionChange={handleRowSelectionChange}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
      {deleteOpen && (
        <DeletePurchaseOrderModal
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedPurchaseOrders={selectedPurchaseOrders}
          setRowSelection={setRowSelection}
          setSelectedPurchaseOrders={setSelectedPurchaseOrders}
        />
      )}
    </div>
  );
};
