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
import { addFieldSchema, AddFieldValues } from '@/schema/columnMappingSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AdditionalFieldDialogProps } from './types';

export const AdditionalFieldDialog = ({
  open,
  onClose,
  onAddField,
}: AdditionalFieldDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddFieldValues>({
    resolver: zodResolver(addFieldSchema),
    defaultValues: {
      name: '',
      sample: '',
    },
  });
  const submitHandler = (data: AddFieldValues) => {
    onAddField(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-lg">Add Field</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="flex gap-2 flex-col">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Total cost" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 flex-col">
            <Label htmlFor="name">Sample</Label>
            <Input placeholder="Sample" {...register('sample')} />
            {errors.sample && (
              <p className="text-sm text-destructive mt-1">
                {errors.sample.message}
              </p>
            )}
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
