import { LoadingButton } from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUpdateUser } from '@/hooks/client';
import type { User } from '@/service/users';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeactivateRoleModal {
  onClose: () => void;
  open: boolean;
  user: User;
}

export const DeactivateRoleModal = ({
  onClose,
  open,
  user,
}: DeactivateRoleModal) => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleDeactivate = () => {
    updateUser(
        {
          name: user.name,
          email: user.email,
          role: user.role,
          status: 'inActive',
        },
        {
          onSuccess: () => {
            toast.success('Role deactivated');
            queryClient.invalidateQueries({
              queryKey: ['users-data'],
              exact: false,
            });
          },
          onError: () => {
            toast.error('Failed to update role status, please try again');
          },
        },
      );
  };

  return (
    <Dialog open={open} onOpenChange={onClose} data-no-row-click>
      <DialogContent className="p-6" data-no-row-click>
        <DialogHeader>
          <DialogTitle className="text-lg">Deactivate Role</DialogTitle>
        </DialogHeader>

        <div className="text-muted-foreground space-y-1 pb-2">
          <div>
          Are you sure you want to deactivate this role? User will lose all access.
          </div>
        </div>

        <DialogFooter className="border-t border-[#E4E4E7] pt-6 space-x-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            className="bg-[#DC2626] text-white font-medium"
            onClick={handleDeactivate}
            loading={isPending}
          >
            Deactivate
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

