'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { AdditionalFieldSection } from './AdditionalFieldSection';
import { ColumnMappingHeader } from './ColumnMappingHeader';
import { RequiredFieldSection } from './RequiredFieldSection';
import {
  MappingFormValues,
  columnMappingSchema,
} from '@/schema/columnMappingSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColumnMappingFooter } from './ColumnMappingFooter';

export const ColumnMappingTable = () => {
  const form = useForm<MappingFormValues>({
    resolver: zodResolver(columnMappingSchema),
    defaultValues: {
      required: {
        po: '',
        date: '',
        vendor: '',
      },
      additional: {},
    },
  });

  const onSubmit = (data: MappingFormValues) => {
    console.log('SUBMIT DATA:', data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="shadow-md border border-[#E4E4E7] p-6 rounded-4xl">
          <ColumnMappingHeader />
          <RequiredFieldSection />
          <AdditionalFieldSection />
        </div>
        <ColumnMappingFooter />
      </form>
    </FormProvider>
  );
};
