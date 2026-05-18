'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/LoadingButton';
import { useVendorBulkAction } from '@/hooks/vendors';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { VendorData } from '@/types/vendors';

type BulkDeleteVendorsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedVendors: VendorData[];
  onSuccess: () => void;
};

export function BulkDeleteVendorsModal({
  open,
  onOpenChange,
  selectedVendors,
  onSuccess,
}: BulkDeleteVendorsModalProps) {
  const queryClient = useQueryClient();
  const { mutate: bulkDeleteVendors, isPending } = useVendorBulkAction();

  const count = selectedVendors.length;

  const handleDelete = () => {
    if (count === 0) return;
    bulkDeleteVendors(
      {
        vendorIds: selectedVendors.map((v) => v.id),
        action: 'delete',
      },
      {
        onSuccess: () => {
          toast.success(
            count === 1 ? 'Vendor deleted' : `${count} vendors deleted`,
          );
          queryClient.invalidateQueries({
            queryKey: ['vendors-data'],
            exact: false,
          });
          onSuccess();
          onOpenChange(false);
        },
        onError: () => {
          toast.error('Could not delete vendors. Try again.');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6" data-no-row-click>
        <DialogHeader>
          <DialogTitle className="text-lg">
            Delete {count === 1 ? 'vendor' : `${count} vendors`}
          </DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground space-y-2 pb-2 text-sm">
          <p>
            {count === 1
              ? `Are you sure you want to delete ${selectedVendors[0]?.vendorName ?? 'this vendor'}?`
              : `Are you sure you want to delete ${count} selected vendors?`}
          </p>
          <p>You will not be able to send follow ups to deleted vendors.</p>
        </div>
        <DialogFooter className="border-t border-[#E4E4E7] pt-6 gap-3 sm:gap-0">
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <LoadingButton
            className="bg-[#DC2626] font-medium text-white"
            type="button"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
