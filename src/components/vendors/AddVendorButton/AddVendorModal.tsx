import { LoadingButton } from '@/components/LoadingButton';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddVendor } from '@/hooks/vendors';
import { AddVendorFieldValues, addVendorSchema } from '@/schema/vendor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface AddVendorModalProps {
  onClose: () => void;
  open: boolean;
}

export const AddVendorModal = ({ onClose, open }: AddVendorModalProps) => {
  const { mutate, isPending } = useAddVendor();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddVendorFieldValues>({
    resolver: zodResolver(addVendorSchema),
    defaultValues: {
      vendorName: '',
      vendorEmail: '',
    },
  });

  const submitHandler = (data: AddVendorFieldValues) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Vendor added success');
        queryClient.invalidateQueries({
          queryKey: ['vendors-data'],
          exact: false,
        });
      },
      onError: () => {
        toast.error('Something went wrong please try again');
      },
    });
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-lg">Add Vendor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="flex gap-2 flex-col">
            <Label htmlFor="name">Vendor</Label>
            <Input
              id="name"
              placeholder="Big Kahuna Burger Ltd."
              {...register('vendorName')}
            />
            {errors.vendorName && (
              <p className="text-sm text-destructive mt-1">
                {errors.vendorName.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 flex-col">
            <Label htmlFor="name">Email</Label>
            <Input
              placeholder="vendor@example.com"
              {...register('vendorEmail')}
            />
            {errors.vendorEmail && (
              <p className="text-sm text-destructive mt-1">
                {errors.vendorEmail.message}
              </p>
            )}
          </div>
          <div className="text-muted-foreground text-sm">
            Follow ups will be send to this email address.
          </div>

          <DialogFooter>
            <LoadingButton
              className="w-33 h-10 bg-background-secondary"
              type="submit"
              loading={isPending}
            >
              Add
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
