import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { LoadingButton } from '@/components/LoadingButton';
import { useSendTestEmail } from '@/hooks/emailTemplate';
import { toast } from 'sonner';

const sendTestEmailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

type SendTestEmailFormValues = z.infer<typeof sendTestEmailSchema>;

interface SendEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string;
}

export const SendEmailDialog = ({
  open,
  onOpenChange,
  templateId,
}: SendEmailDialogProps) => {
  const { mutate, isPending } = useSendTestEmail();

  const form = useForm<SendTestEmailFormValues>({
    resolver: zodResolver(sendTestEmailSchema),
    defaultValues: { email: '' },
  });

  const handleSendTestSubmit = (values: SendTestEmailFormValues) => {
    mutate(
      { templateId, email: values.email },
      {
        onSuccess: () => {
          toast.success('Test email sent');
          onOpenChange(false);
          form.reset();
        },
        onError: () => {
          toast.error('Could not send test email. Please try again.');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Send Test Email</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSendTestSubmit)}
            className="space-y-4 pt-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <LoadingButton type="submit" loading={isPending}>
                Send
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
