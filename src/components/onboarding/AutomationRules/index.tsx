'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Info } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { useClientSettings } from '@/hooks/client';
import type { FollowUpFrequencyFormValues } from '@/components/onboarding/types';
import { getClientSettingsFromQueryData } from '@/lib/followUpFrequencyDefaults';

const MIN_DAYS = 1;
const MAX_DAYS = 365;
const PRESET_DAYS = [1, 2, 3];

function frequencyDayOptions(current?: number) {
  const options = new Set(PRESET_DAYS);
  if (
    typeof current === 'number' &&
    current >= MIN_DAYS &&
    current <= MAX_DAYS
  ) {
    options.add(current);
  }
  return [...options].sort((a, b) => a - b);
}

type FrequencyDaySelectProps = {
  value: number | undefined;
  onChange: (value: number) => void;
};

function FrequencyDaySelect({ value, onChange }: FrequencyDaySelectProps) {
  const options = frequencyDayOptions(value);

  return (
    <Select
      value={value?.toString()}
      onValueChange={(v) => onChange(Number(v))}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {options.map((day) => (
          <SelectItem key={day} value={String(day)}>
            {day}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export const AutomationRules = () => {
  const { control, reset } = useFormContext<FollowUpFrequencyFormValues>();
  const { data: settingsResponse, isSuccess } = useClientSettings();
  const lastHydratedSignature = useRef<string | null>(null);

  useEffect(() => {
    if (!isSuccess) return;

    const settings = getClientSettingsFromQueryData(settingsResponse);
    if (!settings) return;

    const signature = JSON.stringify([
      settings.followup1FrequencyDays,
      settings.followup2FrequencyDays,
      settings.followup3FrequencyDays,
      settings.aiConfidenceThreshold,
    ]);

    if (lastHydratedSignature.current === signature) return;
    lastHydratedSignature.current = signature;
  }, [isSuccess, settingsResponse, reset]);

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
                    <FrequencyDaySelect
                      value={field.value}
                      onChange={field.onChange}
                    />
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
                    <FrequencyDaySelect
                      value={field.value}
                      onChange={field.onChange}
                    />
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
                    <FrequencyDaySelect
                      value={field.value}
                      onChange={field.onChange}
                    />
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
