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
      value={field.value}
      disabled={disabled}
      onValueChange={(value) => field.onChange(value)}
    >
      <SelectTrigger className="m-0">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
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
