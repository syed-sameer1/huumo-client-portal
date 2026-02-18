'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { AdditionalFieldSection } from './AdditionalFieldSection';
import { ColumnMappingHeader } from './ColumnMappingHeader';
import { RequiredFieldSection } from './RequiredFieldSection';
import {
  MappingFormValues,
  columnMappingSchema,
} from '@/schema/columnMappingSchema';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColumnMappingFooter } from './ColumnMappingFooter';
import { useImportColumn } from '@/hooks/csvImports';
import { useSearchParams } from 'next/navigation';
import { LoaderDialog } from '@/components/loader';
import { useColumnMapping } from '@/hooks/purchaseOrders';

export const ColumnMappingTable = () => {
  const importJobId = useSearchParams().get('import_job_id');
  const { data, isPending } = useImportColumn(importJobId as string);
  const { mutate, isPending: isMappingPending } = useColumnMapping();
  const router = useRouter();

  const form = useForm<MappingFormValues>({
    resolver: zodResolver(columnMappingSchema),
    defaultValues: {
      required: {
        poNumber: '',
        orderDate: '',
        vendorName: '',
      },
      additional: {
        vendorEmail: '',
        dueDate: '',
        lineItem: '',
        quantity: '',
        confirmQty: '',
        remainingQty: '',
        unitCost: '',
      },
    },
  });

  const onSubmit = (data: MappingFormValues) => {
    mutate(
      {
        ImportJobId: Number(importJobId),
        mapping: {
          ...data.additional,
          ...data.required,
        },
      },
      {
        onSuccess: () => {
          router.push('/purchase-orders');
        },
      },
    );
  };

  if (isPending)
    return <LoaderDialog text="Columns are mapping.." open={isPending} />;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="shadow-md border border-[#E4E4E7] p-6 rounded-4xl">
          <ColumnMappingHeader />
          <RequiredFieldSection headers={data?.data?.data?.headers} />
          <AdditionalFieldSection headers={data?.data?.data?.headers} />
        </div>
        <ColumnMappingFooter isLoading={isMappingPending} />
      </form>
    </FormProvider>
  );
};
