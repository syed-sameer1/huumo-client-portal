import { useFormContext } from 'react-hook-form';
import {
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

export const AutomationRules = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="text-[24px] font-semibold">When should we follow up?</div>

      <div className="w-100 space-y-6">
        {/* Follow-up #1 */}
        <FormField
          control={control}
          name="followup1FrequencyDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold mb-2 block">
                Follow-up #1 Frequency
              </FormLabel>

              <Select
                value={field.value?.toString()}
                onValueChange={(v) => field.onChange(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Follow-up #2 */}
        <FormField
          control={control}
          name="followup2FrequencyDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold mb-2 block">
                Follow-up #2 Frequency
              </FormLabel>

              <Select
                value={field.value?.toString()}
                onValueChange={(v) => field.onChange(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Follow-up #3 */}
        <FormField
          control={control}
          name="followup3FrequencyDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold mb-2 block">
                Final Reminder Frequency
              </FormLabel>

              <Select
                value={field.value?.toString()}
                onValueChange={(v) => field.onChange(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
