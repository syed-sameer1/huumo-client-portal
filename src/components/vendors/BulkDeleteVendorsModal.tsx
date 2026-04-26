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
import { useDeleteVendor } from '@/hooks/vendors';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState } from 'react';
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
  const { mutateAsync } = useDeleteVendor();
  const [isDeleting, setIsDeleting] = useState(false);

  const count = selectedVendors.length;

  const handleDelete = async () => {
    if (count === 0) return;
    setIsDeleting(true);
    const results = await Promise.allSettled(
      selectedVendors.map((v) => mutateAsync(String(v.id))),
    );
    setIsDeleting(false);
    const failed = results.filter((r) => r.status === 'rejected').length;
    if (failed === 0) {
      toast.success(
        count === 1 ? 'Vendor deleted' : `${count} vendors deleted`,
      );
    } else if (failed === count) {
      toast.error('Could not delete vendors. Try again.');
      return;
    } else {
      toast.message(
        `${count - failed} deleted, ${failed} failed. Refresh and retry failed rows if needed.`,
      );
    }
    queryClient.invalidateQueries({ queryKey: ['vendors-data'], exact: false });
    onSuccess();
    onOpenChange(false);
  };

  const busy = isDeleting;

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
              ? `Are you sure you want to delete ${selectedVendors[0]?.name ?? 'this vendor'}?`
              : `Are you sure you want to delete ${count} selected vendors?`}
          </p>
          <p>You will not be able to send follow ups to deleted vendors.</p>
        </div>
        <DialogFooter className="border-t border-[#E4E4E7] pt-6 gap-3 sm:gap-0">
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={busy}
          >
            Cancel
          </Button>
          <LoadingButton
            className="bg-[#DC2626] font-medium text-white"
            type="button"
            onClick={handleDelete}
            loading={busy}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
