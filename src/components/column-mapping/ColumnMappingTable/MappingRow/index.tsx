'use client';

import { ArrowRight, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  sample: string;
  required?: boolean;
  onRemove?: (id: string) => void;
  showBorder?: boolean;
  id: string;
};

export function MappingRow({
  name,
  label,
  sample,
  required = false,
  onRemove,
  id,
  showBorder = true,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = required
    ? id.split('.').reduce((acc: any, key) => acc?.[key], errors.required)
    : undefined;

  return (
    <div
      className={cn(
        'grid grid-cols-[2fr_1fr_2fr_2fr_40px] items-center gap-4 py-4',
        showBorder && 'border-b',
      )}
    >
      <div className="font-medium text-sm">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </div>

      <ArrowRight className="text-green-600 ml-5" />

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => {
          const hasError = !!error;
          return (
            <>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={`${hasError ? 'border-destructive focus:ring-destructive' : ''}`}
                >
                  <SelectValue placeholder="Select Column" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="col1">Column 1</SelectItem>
                  <SelectItem value="col2">Column 2</SelectItem>
                  <SelectItem value="col3">Column 3</SelectItem>
                </SelectContent>
              </Select>
            </>
          );
        }}
      />

      <div className="text-sm text-muted-foreground text-center">{sample}</div>

      <div className="flex justify-end">
        {onRemove && (
          <Trash2
            onClick={() => onRemove(id)}
            className="h-4 w-4 text-destructive cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
