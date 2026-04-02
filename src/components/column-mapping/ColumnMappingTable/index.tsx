'use client';

import { useState } from 'react';
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
import { useImportColumn } from '@/hooks/csvImports';
import { useSearchParams } from 'next/navigation';
import { LoaderDialog } from '@/components/loader';
import { useColumnMapping } from '@/hooks/purchaseOrders';
import { REQUIRED_FIELDS } from './RequiredFieldSection/constants';
import { AnalyticsDialog } from './AnalyticsDialog';

export const ColumnMappingTable = ({
  headerIncluded = false,
}: {
  headerIncluded?: boolean;
}) => {
  const importJobId = useSearchParams().get('import_job_id');
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  const { data, isPending } = useImportColumn(importJobId as string);

  const { mutate, isPending: isMappingPending } = useColumnMapping();

  const form = useForm<MappingFormValues>({
    resolver: zodResolver(columnMappingSchema),
    defaultValues: {
      required: {
        poNumber: '',
        orderDate: '',
        vendorName: '',
        dueDate: '',
        lineItem: '',
        quantity: '',
      },
      additional: {
        vendorEmail: '',
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
        headerIncluded,
        mapping: {
          ...data.additional,
          ...data.required,
        },
      },
      {
        onSuccess: (res) => {
          console.log({ res });
          setPreviewDialogOpen(true);
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
          <RequiredFieldSection
            requiredFields={REQUIRED_FIELDS}
            headers={data?.data?.data?.headers}
            errors={form.formState?.errors?.required || {}}
          />
          <AdditionalFieldSection headers={data?.data?.data?.headers} />
        </div>
        <ColumnMappingFooter isLoading={isMappingPending} />
      </form>
      <AnalyticsDialog
        open={previewDialogOpen}
        onClose={setPreviewDialogOpen}
      />
    </FormProvider>
  );
};
