import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { SelectValue } from '@radix-ui/react-select';
import { InfoIcon } from 'lucide-react';

export const AutomationRules = () => {
  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="text-[24px] text-[#09090B] font-semibold">
        When should we follow up?
      </div>
      <div className="text-[16px] text-foreground">
        We’ll handle reminders automatically. AI can read and scan emails.
      </div>
      <div className="w-100 space-y-6">
        <Field className="gap-2">
          <FieldLabel className="font-semibold">
            Follow-up #1 Frequency
          </FieldLabel>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field className="gap-2">
          <FieldLabel className="font-semibold">
            Follow-up #2 Frequency
          </FieldLabel>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field className="gap-2">
          <FieldLabel className="font-semibold">
            Final Reminder Frequency
          </FieldLabel>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>
            <div className="flex gap-2 items-center">
              AI Confidence Threshold <InfoIcon size={18} />
            </div>
          </FieldLabel>
          <div className="w-full space-y-2">
            <Slider
              defaultValue={[30]}
              max={100}
              step={1}
              className="
          [&_.bg-secondary]:bg-[#E4E4E7]
          [&_.bg-primary]:bg-[#20A665]
          **:[[role=slider]]:h-5
          **:[[role=slider]]:w-5
          **:[[role=slider]]:bg-[#20A665]
          **:[[role=slider]]:border-none
        "
            />

            {/* Labels */}
            <div className="flex justify-between text-sm text-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </Field>
      </div>
    </div>
  );
};
