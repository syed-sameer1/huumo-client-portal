import type { ChangeEvent, Ref } from 'react';
import { useFormContext } from 'react-hook-form';
import { Info } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MIN_DAYS = 1;
const MAX_DAYS = 365;

type FrequencyDaysControlProps = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  onBlur: () => void;
  name: string;
  ref: Ref<HTMLInputElement>;
};

function FrequencyDaysControl({
  value,
  onChange,
  onBlur,
  name,
  ref,
}: FrequencyDaysControlProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '') {
      onChange(undefined);
      return;
    }
    const n = Number.parseInt(raw, 10);
    if (Number.isNaN(n)) return;
    onChange(Math.min(MAX_DAYS, Math.max(MIN_DAYS, n)));
  };

  const handleBlur = () => {
    if (value === undefined || value < MIN_DAYS) {
      onChange(MIN_DAYS);
    }
    onBlur();
  };

  return (
    <Input
      type="number"
      min={MIN_DAYS}
      max={MAX_DAYS}
      inputMode="numeric"
      className="w-full"
      value={value === undefined ? '' : value}
      onChange={handleInputChange}
      onBlur={handleBlur}
      name={name}
      ref={ref}
      aria-label="Days until follow-up"
    />
  );
}

export const AutomationRules = () => {
  const { control } = useFormContext();

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6 flex flex-col items-center">
        <div className="text-[24px] font-semibold">
          When should we follow up?
        </div>
        <div className="text-center">
          (The selected frequency will be effective starting from the PO
          creation date)
        </div>

        <div className="w-100 space-y-6">
          {/* Follow-up #1 */}

          <FormField
            control={control}
            name="followup1FrequencyDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-sm mb-2 block">
                  Follow-up #1 Frequency
                </FormLabel>

                <div className="flex items-center">
                  <div className="w-20 mr-2">
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
                  </div>
                  <p>day(s) from the PO creation date</p>
                </div>

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
                <FormLabel className="font-medium text-sm mb-2 block">
                  Follow-up #2 Frequency
                </FormLabel>
                <div className="flex items-center">
                  <div className="w-20 mr-2">
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
                  </div>
                  <p>day(s) from the PO creation date</p>
                </div>
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
                <FormLabel className="font-medium text-sm mb-2 block">
                  Final Reminder Frequency
                </FormLabel>
                <div className="flex items-center">
                  <div className="w-20 mr-2">
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
                  </div>
                  <p>day(s) from the PO creation date</p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="aiConfidenceThreshold"
            render={({ field }) => (
              <FormItem className="w-full max-w-[498px]">
                <div className="mb-2 flex items-center gap-1.5">
                  <FormLabel className="m-0 font-medium text-sm">
                    AI Confidence Threshold
                  </FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label="About AI confidence threshold"
                      >
                        <Info size={15} strokeWidth={2} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-xs border bg-popover px-3 py-2 text-left text-sm font-normal text-popover-foreground shadow-md"
                    >
                      POs with AI confidence below this level will be notified.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[typeof field.value === 'number' ? field.value : 0]}
                    onValueChange={([v]) => field.onChange(v)}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    trackClassName="bg-[#20A665]/20"
                    rangeClassName="bg-[#20A665]"
                    thumbClassName="border-[#20A665] focus-visible:ring-[#20A665]"
                    className="py-2"
                  />
                </FormControl>
                <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                  <span>{field.value}%</span>
                  <span>100%</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </TooltipProvider>
  );
};
