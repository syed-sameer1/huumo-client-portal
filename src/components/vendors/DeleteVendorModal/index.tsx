import { LoadingButton } from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteVendor } from '@/hooks/vendors';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteVendorModalProps {
  onClose: () => void;
  open: boolean;
  vendorName: string;
  vendorId: number;
}

export const DeleteVendorModal = ({
  onClose,
  open,
  vendorName,
  vendorId,
}: DeleteVendorModalProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteVendor, isPending } = useDeleteVendor();
  const handleDeleteVendor = () => {
    deleteVendor(vendorId.toString(), {
      onSuccess: () => {
        toast.success('Vendor deleted');
        queryClient.invalidateQueries({
          queryKey: ['vendors-data'],
          exact: false,
        });
      },
      onError: () => {
        toast.error('Something went wrong please try again');
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={onClose} data-no-row-click>
      <DialogContent className="p-6" data-no-row-click>
        <DialogHeader>
          <DialogTitle className="text-lg">Delete Vendor Details</DialogTitle>
        </DialogHeader>

        <div className="text-muted-foreground space-y-1 pb-2">
          <div>
            {`Are you sure you want to delete this email associated with ${vendorName}?`}
          </div>
          <div>You will not be able to send follow ups after deletion.</div>
        </div>

        <DialogFooter className="border-t border-[#E4E4E7] pt-6 space-x-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            className="bg-[#DC2626] text-white font-medium"
            onClick={handleDeleteVendor}
            loading={isPending}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
