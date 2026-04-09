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
import { useUpdateVendor } from '@/hooks/vendors';
import { AddVendorFieldValues, addVendorSchema } from '@/schema/vendor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface EditVendorModalProps {
  onClose: () => void;
  open: boolean;
  vendorName: string;
  email: string | null;
  vendorId: number;
}

export const EditVendorModal = ({
  onClose,
  open,
  vendorName,
  email,
  vendorId,
}: EditVendorModalProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateVendor();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddVendorFieldValues>({
    resolver: zodResolver(addVendorSchema),
    defaultValues: {
      vendorName: vendorName,
      vendorEmail: email || '',
    },
  });

  const params = useParams();
  const orderId = params.id as string;

  const submitHandler = (data: AddVendorFieldValues) => {
    mutate(
      { payload: data, id: vendorId },
      {
        onSuccess: () => {
          toast.success('Vendor successfully updated');
          queryClient.invalidateQueries({
            queryKey: ['vendors-data'],
            exact: false,
          });
          queryClient.invalidateQueries({
            queryKey: ['purchase-orders'],
            exact: false,
          });
          queryClient.invalidateQueries({
            queryKey: ['purchase-orders-details', orderId],
            exact: false,
          });
        },
        onError: () => {
          toast.error('Something went wrong please try again');
        },
      },
    );
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-6" data-no-row-click>
        <DialogHeader>
          <DialogTitle className="text-lg">Edit Vendor Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="flex gap-2 flex-col">
            <Label htmlFor="vendorName">Vendor</Label>
            <Input
              id="vendorName"
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
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="vendor@example.com"
              {...register('vendorEmail')}
              id="email"
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
              loading={isPending}
              className="w-33 h-10 bg-background-secondary"
              type="submit"
            >
              Update
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
