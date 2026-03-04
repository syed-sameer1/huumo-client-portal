'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
import Link from 'next/link';

const sendTestEmailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

type SendTestEmailFormValues = z.infer<typeof sendTestEmailSchema>;

interface ActionButtonsProps {
  templateId: string;
}

export const ActionButtons = ({ templateId }: ActionButtonsProps) => {
  const [sendTestModalOpen, setSendTestModalOpen] = useState(false);

  const form = useForm<SendTestEmailFormValues>({
    resolver: zodResolver(sendTestEmailSchema),
    defaultValues: { email: '' },
  });

  const handleOpenChange = (open: boolean) => {
    setSendTestModalOpen(open);
    if (!open) form.reset();
  };

  const handleSendTestSubmit = (_values: SendTestEmailFormValues) => {
    // TODO: call API when ready
    setSendTestModalOpen(false);
    form.reset();
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <Button variant="secondary" asChild>
          <Link href={`/templates-rules/edit/${templateId}`}>
            Edit Template
          </Link>
        </Button>
        <Button onClick={() => setSendTestModalOpen(true)}>
          Send Test Email
        </Button>
      </div>

      <Dialog open={sendTestModalOpen} onOpenChange={handleOpenChange}>
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
                <Button type="submit">Send</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
