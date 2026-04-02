'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { PurchaseOrdersFilters } from '../PurchaseOrdersFilters';
import { PurchaseOrdersTable } from '../PurchaseOrdersTable';
import {
  usePurchaseOrders,
  useBulkDeletePurchaseOrder,
} from '@/hooks/purchaseOrders';
import { LoadingSkeleton } from './LoadingSkeleton';
import { NoPurchaseOrder } from '../EmptyPurchaseOrders/NoPurchaseOrder';
import { PurchaseOrderBanner } from '../PurchaseOrderHeader/PurchaseOrderBanner';
import {
  filtersToParams,
  paramsToFilters,
  type PurchaseOrderFilters as Filters,
} from '../PurchaseOrdersFilters/constants';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type RowSelectionState } from '@tanstack/react-table';

export const PurchaseOrdersSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

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

  const { mutate: bulkDelete, isPending: isDeleting } =
    useBulkDeletePurchaseOrder();

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
              variant="destructive"
              className="shrink-0"
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

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>
              {selectedPoIds.length === 1
                ? `Delete ${selectedPoIds[0]}`
                : 'Delete Purchase Orders'}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Purchase Order?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                bulkDelete(
                  { poIds: selectedPoIds, force: true },
                  {
                    onSuccess: () => {
                      toast.success('Purchase order(s) deleted');
                      queryClient.invalidateQueries({
                        queryKey: ['purchase-orders'],
                        exact: false,
                      });
                      setRowSelection({});
                      setDeleteOpen(false);
                    },
                    onError: () => {
                      toast.error('Delete failed. Please try again.');
                    },
                  },
                );
              }}
              disabled={selectedPoIds.length === 0 || isDeleting}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
