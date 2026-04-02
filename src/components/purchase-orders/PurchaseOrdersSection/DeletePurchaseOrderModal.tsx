import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useBulkDeletePurchaseOrder } from '@/hooks/purchaseOrders';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { RowSelectionState } from '@tanstack/react-table';
import { LoadingButton } from '@/components/LoadingButton';

export const DeletePurchaseOrderModal = ({
  deleteOpen,
  setDeleteOpen,
  selectedPoIds,
  setRowSelection,
}: {
  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  selectedPoIds: number[];
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
}) => {
  const { mutate: bulkDelete, isPending: isDeleting } =
    useBulkDeletePurchaseOrder();
  const queryClient = useQueryClient();

  return (
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <DialogContent className="sm:max-w-[520px] p-[24px]">
        <DialogHeader>
          <DialogTitle>
            {selectedPoIds.length === 1
              ? `Delete ${selectedPoIds[0]}`
              : 'Delete Purchase Orders'}
          </DialogTitle>
          <DialogDescription className="mt-[16px]">
            Are you sure you want to delete this Purchase Order?
          </DialogDescription>
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
            loading={isDeleting}
            className="bg-[#DC2626] text-white hover:bg-[#DC2626]/90 h-[44px]"
            disabled={selectedPoIds.length === 0 || isDeleting}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
