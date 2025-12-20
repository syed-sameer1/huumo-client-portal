import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectOptionsProps } from './types';

export const SelectOptions = ({
  options,
  placeholder,
  disabled = false,
  field,
}: SelectOptionsProps) => {
  return (
    <Select
      value={field.value || undefined}
      disabled={disabled}
      onValueChange={(value) => field.onChange(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        side="bottom"
        align="start"
        className="w-full max-h-64 overflow-auto"
      >
        <SelectGroup>
          {options.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
