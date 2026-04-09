'use client';

import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoadingButton } from '@/components/LoadingButton';
import { toast } from 'sonner';
import { SetRulesFormValues, setRulesSchema } from '@/schema/setRules';

const DAY_OPTIONS = [
  { value: 1, label: '1 day' },
  { value: 2, label: '2 days' },
  { value: 3, label: '3 days' },
  { value: 4, label: '4 days' },
  { value: 5, label: '5 days' },
];

interface SetRulesModalProps {
  open: boolean;
  onClose: () => void;
}

export const SetRulesModal = ({ open, onClose }: SetRulesModalProps) => {
  const form = useForm<SetRulesFormValues>({
    resolver: zodResolver(setRulesSchema) as Resolver<SetRulesFormValues>,
    mode: 'onChange',
    defaultValues: {
      followUp1FrequencyDays: undefined,
      followUp2FrequencyDays: undefined,
      finalReminderFrequencyDays: undefined,
      aiConfidenceThreshold: 50,
    },
  });

  const onSubmit = (_values: SetRulesFormValues) => {
    toast.success('Rules saved successfully');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-8 gap-0">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-semibold">
            Set Rules
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Follow-up #1 Frequency */}
            <FormField<SetRulesFormValues, 'followUp1FrequencyDays'>
              control={form.control}
              name="followUp1FrequencyDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Follow-up #1 Frequency
                  </FormLabel>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DAY_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value.toString()}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Follow-up #2 Frequency */}
            <FormField<SetRulesFormValues, 'followUp2FrequencyDays'>
              control={form.control}
              name="followUp2FrequencyDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Follow-up #2 Frequency
                  </FormLabel>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DAY_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value.toString()}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Final Reminder Frequency */}
            <FormField<SetRulesFormValues, 'finalReminderFrequencyDays'>
              control={form.control}
              name="finalReminderFrequencyDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Final Reminder Frequency
                  </FormLabel>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DAY_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value.toString()}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* AI Confidence Threshold */}
            <FormField<SetRulesFormValues, 'aiConfidenceThreshold'>
              control={form.control}
              name="aiConfidenceThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    AI Confidence Threshold
                  </FormLabel>
                  <FormControl>
                    <Slider
                      value={[field.value]}
                      onValueChange={(v) => field.onChange(v[0])}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </FormControl>
                  <div className="text-sm text-muted-foreground">
                    {field.value}%
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Save Changes Button */}
            <div className="flex justify-end pt-4">
              <LoadingButton
                type="submit"
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
