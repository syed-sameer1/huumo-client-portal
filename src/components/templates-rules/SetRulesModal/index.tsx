'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoadingButton } from '@/components/LoadingButton';
import { toast } from 'sonner';
import { followUpFrequencySchema } from '@/schema/followUpFrequencySchema';
import type { FollowUpFrequencyFormValues } from '@/components/onboarding/types';
import { AutomationRules } from '@/components/onboarding/AutomationRules';
import { useClientUpdateFrequency } from '@/hooks/client';

interface SetRulesModalProps {
  open: boolean;
  onClose: () => void;
}

export const SetRulesModal = ({ open, onClose }: SetRulesModalProps) => {
  const { mutate, isPending } = useClientUpdateFrequency();

  const form = useForm<FollowUpFrequencyFormValues>({
    resolver: zodResolver(followUpFrequencySchema),
    mode: 'onChange',
    defaultValues: {
      followup1FrequencyDays: 1,
      followup2FrequencyDays: 1,
      followup3FrequencyDays: 1,
      aiConfidenceThreshold: 0,
    },
  });

  const onSubmit = (values: FollowUpFrequencyFormValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success('Rules saved successfully');
        onClose();
      },
      onError: () => {
        toast.error('Failed to save rules');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-8 gap-0">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-semibold">Set Rules</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AutomationRules />
            <div className="flex justify-end pt-2">
              <LoadingButton
                type="submit"
                loading={isPending}
                className="bg-[#52a46d] hover:bg-[#438e5b] text-white px-10 h-11 transition-colors"
              >
                Save Changes
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
