import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Info } from 'lucide-react';
import { AddRoleFormValues, addRoleSchema } from '@/schema/role';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateUser } from '@/hooks/client';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/LoadingButton';
import { useQueryClient } from '@tanstack/react-query';

interface AddRoleModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddRoleModal({ open, onClose }: AddRoleModalProps) {
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending } = useCreateUser();

  const form = useForm<AddRoleFormValues>({
    resolver: zodResolver(addRoleSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      role: 'admin',
    },
  });

  const onSubmit = (values: AddRoleFormValues) => {
    const payload = {
      name: values.name,
      email: values.email,
      password: 'HardcodedPassword123!', // hardcoded for now
      role: values.role,
    };

    createUser(payload, {
      onSuccess: () => {
        toast.success('User created successfully');
        queryClient.invalidateQueries({
          queryKey: ['users-data'],
          exact: false,
        });
        onClose();
      },
      onError: () => {
        toast.error('Failed to create user, please try again');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-8 gap-0">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-semibold">Add Role</DialogTitle>
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
                          id="admin"
                          className="h-5 w-5 border-2  border-[#A1A1AA] [&_svg]:fill-[#20A665] [&_svg]:text-[#20A665] [&_svg]:w-[12px]"
                        />
                        <label
                          htmlFor="admin"
                          className="flex items-center gap-1.5 cursor-pointer text-sm font-medium"
                        >
                          Admin{' '}
                          <Info className="w-4 h-4 text-muted-foreground/50" />
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="member"
                          id="member"
                          className="h-5 w-5 border-2  border-[#A1A1AA] [&_svg]:fill-[#20A665] [&_svg]:text-[#20A665] [&_svg]:w-[12px]"
                        />
                        <label
                          htmlFor="member"
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
                Add
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
