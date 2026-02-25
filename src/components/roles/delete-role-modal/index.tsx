import { LoadingButton } from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteUser } from '@/hooks/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteRoleModalProps {
  onClose: () => void;
  open: boolean;
  userId: number;
}

export const DeleteRoleModal = ({
  onClose,
  open,
  userId,
}: DeleteRoleModalProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleDelete = () => {
    deleteUser(userId.toString(), {
      onSuccess: () => {
        toast.success('Role deleted');
        queryClient.invalidateQueries({
          queryKey: ['users-data'],
          exact: false,
        });
        onClose();
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
          <DialogTitle className="text-lg">Delete Role</DialogTitle>
        </DialogHeader>

        <div className="text-muted-foreground space-y-1 pb-2">
          <div>
            Are you sure you want to delete this role? User will lose all access.
          </div>
        </div>

        <DialogFooter className="border-t border-[#E4E4E7] pt-6 space-x-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            className="bg-[#DC2626] text-white font-medium"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

