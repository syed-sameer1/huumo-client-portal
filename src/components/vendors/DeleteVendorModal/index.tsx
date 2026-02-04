import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeleteVendorModalProps {
  onClose: () => void;
  open: boolean;
  vendorName: string;
}

export const DeleteVendorModal = ({
  onClose,
  open,
  vendorName,
}: DeleteVendorModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-6">
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
          <Button className="bg-[#DC2626] text-white font-medium">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
