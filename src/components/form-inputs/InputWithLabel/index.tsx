import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';

export const InputWithLabel = ({
  label,
  isRequired = false,
  id,
  Input,
}: {
  label: string;
  isRequired?: boolean;
  id: string;
  Input: ReactNode;
}) => {
  return (
    <FormItem>
      <Label htmlFor={id} className="block mb-2">
        {label} {isRequired && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <FormControl>{Input}</FormControl>
      <FormMessage />
    </FormItem>
  );
};
