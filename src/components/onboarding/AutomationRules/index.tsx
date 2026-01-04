import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const options = [
  { label: '2 days', value: '2' },
  { label: '3 days', value: '3', isDefault: true },
  { label: '5 days', value: '5' },
  { label: '7 days', value: '7' },
];

export const AutomationRules = () => {
  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="text-[24px] text-[#09090B] font-semibold">
        When should we follow up?
      </div>
      <div className="text-[16px] text-foreground">
        We’ll handle reminders automatically.
      </div>
      <div className="w-100">
        <RadioGroup defaultValue="3" className="space-y-2">
          {options.map((option) => (
            <label
              key={option.value}
              htmlFor={option.value}
              className={cn(
                'flex items-center gap-4 rounded-lg border px-4 py-5 cursor-pointer transition',
                'hover:bg-muted/50',
              )}
            >
              <RadioGroupItem value={option.value} id={option.value} />

              <div className="flex items-center gap-3">
                <span className="text-base font-medium">{option.label}</span>

                {option.isDefault && option.value === '3' && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    Default
                  </span>
                )}
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
