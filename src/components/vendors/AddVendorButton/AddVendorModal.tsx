import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AddVendorFieldValues, addVendorSchema } from '@/schema/vendor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface AddVendorModalProps {
  onClose: () => void;
  open: boolean;
}

export const AddVendorModal = ({ onClose, open }: AddVendorModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddVendorFieldValues>({
    resolver: zodResolver(addVendorSchema),
    defaultValues: {
      vendorName: '',
      email: '',
    },
  });

  const submitHandler = (data: AddVendorFieldValues) => {
    console.log({ data });
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
            <Input placeholder="vendor@example.com" {...register('email')} />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="text-muted-foreground text-sm">
            Follow ups will be send to this email address.
          </div>

          <DialogFooter>
            <Button className="w-33 h-10 bg-background-secondary" type="submit">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
