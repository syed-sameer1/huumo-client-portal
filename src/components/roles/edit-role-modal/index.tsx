'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { toast } from 'sonner';

import { LoadingButton } from '@/components/LoadingButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AddRoleFormValues, addRoleSchema } from '@/schema/role';
import { useUpdateUser } from '@/hooks/client';
import { useQueryClient } from '@tanstack/react-query';

interface EditRoleModalProps {
  open: boolean;
  onClose: () => void;
  initialName: string;
  initialEmail: string;
}

export function EditRoleModal({
  open,
  onClose,
  initialName,
  initialEmail,
}: EditRoleModalProps) {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const form = useForm<AddRoleFormValues>({
    resolver: zodResolver(addRoleSchema),
    mode: 'onChange',
    defaultValues: {
      name: initialName ?? '',
      email: initialEmail ?? '',
      role: 'admin',
    },
  });

  useEffect(() => {
    if (!open) return;
    form.reset({
      name: initialName ?? '',
      email: initialEmail ?? '',
      role: 'admin',
    });
  }, [open, initialName, initialEmail, form]);

  const onSubmit = (values: AddRoleFormValues) => {
    updateUser(
      {
        name: values.name,
        email: values.email,
        role: values.role,
        status: 'pending',
      },
      {
        onSuccess: () => {
          toast.success('Changes saved');
          queryClient.invalidateQueries({
            queryKey: ['users-data'],
            exact: false,
          });
          onClose();
        },
        onError: () => {
          toast.error('Failed to save changes, please try again');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-8 gap-0">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-semibold">Edit Role</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Big Kahuna Burger Ltd."
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="vendor@example.com"
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-foreground font-medium">
                    Role
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="admin"
                          id="edit-admin"
                          className="h-5 w-5 border-2  border-[#A1A1AA] [&_svg]:fill-[#20A665] [&_svg]:text-[#20A665] [&_svg]:w-[12px]"
                        />
                        <label
                          htmlFor="edit-admin"
                          className="flex items-center gap-1.5 cursor-pointer text-sm font-medium"
                        >
                          Admin{' '}
                          <Info className="w-4 h-4 text-muted-foreground/50" />
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="member"
                          id="edit-member"
                          className="h-5 w-5 border-2  border-[#A1A1AA] [&_svg]:fill-[#20A665] [&_svg]:text-[#20A665] [&_svg]:w-[12px]"
                        />
                        <label
                          htmlFor="edit-member"
                          className="flex items-center gap-1.5 cursor-pointer text-sm font-medium"
                        >
                          Member{' '}
                          <Info className="w-4 h-4 text-muted-foreground/50" />
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <LoadingButton
                type="submit"
                disabled={isPending}
                loading={isPending}
                className="bg-[#52a46d] hover:bg-[#438e5b] text-white px-10 h-11 transition-colors"
              >
                Save changes
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

