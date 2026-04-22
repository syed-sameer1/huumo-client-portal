import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePurchaseOrderBulkAction } from '@/hooks/purchaseOrders';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { RowSelectionState } from '@tanstack/react-table';
import { LoadingButton } from '@/components/LoadingButton';
import { PurchaseOrders } from '@/types/purchaseOrders';

export const DeletePurchaseOrderModal = ({
  deleteOpen,
  setDeleteOpen,
  selectedPurchaseOrders,
  setRowSelection,
  setSelectedPurchaseOrders,
}: {
  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  selectedPurchaseOrders: PurchaseOrders[];
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  setSelectedPurchaseOrders: Dispatch<SetStateAction<PurchaseOrders[]>>;
}) => {
  const { mutate: bulkAction, isPending: isDeleting } =
    usePurchaseOrderBulkAction();
  const queryClient = useQueryClient();

  const isMultipleDelete = selectedPurchaseOrders.length > 1;

  const selectedIds = selectedPurchaseOrders.map((po) => po.id);

  return (
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <DialogContent className="sm:max-w-[520px] p-[24px]">
        <DialogHeader>
          <DialogTitle>
            {!isMultipleDelete
              ? `Delete ${selectedPurchaseOrders[0]?.poNumber ?? 'Purchase Order'}`
              : 'Delete Purchase Orders'}
          </DialogTitle>
          {isMultipleDelete ? (
            <DialogDescription className="mt-[16px]">
              Are you sure you want to delete {selectedIds.length} Purchase
              Orders?
            </DialogDescription>
          ) : (
            <DialogDescription className="mt-[16px]">
              Are you sure you want to delete this Purchase Order?
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-2 mt-[16px]">
          <Button
            type="button"
            variant="outline"
            className="h-[44px]"
            onClick={() => setDeleteOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <LoadingButton
            type="button"
            variant="destructive"
            onClick={() => {
              bulkAction(
                { poIds: selectedIds, action: 'delete' },
                {
                  onSuccess: () => {
                    toast.success('Purchase order(s) deleted');
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
                    setDeleteOpen(false);
                  },
                  onError: () => {
                    toast.error('Delete failed. Please try again.');
                  },
                },
              );
            }}
            loading={isDeleting}
            className="bg-[#DC2626] text-white hover:bg-[#DC2626]/90 h-[44px]"
            disabled={selectedIds.length === 0 || isDeleting}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
