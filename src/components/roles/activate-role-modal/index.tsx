import { LoadingButton } from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useClientActivate } from '@/hooks/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface ActivateRoleModalProps {
  onClose: () => void;
  open: boolean;
  token: string;
}

export const ActivateRoleModal = ({
  onClose,
  open,
  token,
}: ActivateRoleModalProps) => {
  const queryClient = useQueryClient();
  const { mutate: activateClient, isPending } = useClientActivate();

  const handleActivate = () => {
    activateClient(
      {
        token,
        password: 'HardcodedPassword123!',
      },
      {
        onSuccess: () => {
          toast.success('Role activated');
          queryClient.invalidateQueries({
            queryKey: ['users-data'],
            exact: false,
          });
          onClose();
        },
        onError: () => {
          toast.error('Something went wrong please try again');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose} data-no-row-click>
      <DialogContent className="p-6" data-no-row-click>
        <DialogHeader>
          <DialogTitle className="text-lg">Activate Role</DialogTitle>
        </DialogHeader>

        <div className="text-muted-foreground space-y-1 pb-2">
          <div>Are you sure you want to activate this role?</div>
        </div>

        <DialogFooter className="border-t border-[#E4E4E7] pt-6 space-x-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            className="bg-[#22C55E] text-white font-medium"
            onClick={handleActivate}
            loading={isPending}
          >
            Activate
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

