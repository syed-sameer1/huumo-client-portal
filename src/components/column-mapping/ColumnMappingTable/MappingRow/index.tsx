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
import { humanizeHeader } from './helpers';

type Props = {
  name: string;
  label: string;
  sample: string;
  required?: boolean;
  onRemove?: (id: string) => void;
  showBorder?: boolean;
  id: string;
  headers: any;
  errors?: any;
};

export function MappingRow({
  name,
  label,
  sample,
  required = false,
  onRemove,
  id,
  showBorder = true,
  headers,
  errors,
}: Props) {
  const { control } = useFormContext();

  const error = required ? errors[id] : undefined;
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
              <Select onValueChange={field.onChange} {...field}>
                <SelectTrigger
                  className={`${hasError ? 'border-destructive focus:ring-destructive' : ''}`}
                >
                  <SelectValue placeholder="Select Column" />
                </SelectTrigger>
                <SelectContent className="max-h-64 overflow-auto">
                  {headers.map((val: string) => {
                    return (
                      <SelectItem key={val} value={val}>
                        {humanizeHeader(val)}
                      </SelectItem>
                    );
                  })}
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
