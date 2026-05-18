'use client';

import { useImportColumn } from '@/hooks/csvImports';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { LoaderDialog } from '../loader';
import { ColumnMappingFooter } from '../column-mapping/ColumnMappingTable/ColumnMappingFooter';
import {
  MappingVendorFormValues,
  vendorColumnMappingSchema,
} from '@/schema/columnMappingSchema';
import { ColumnMappingHeader as ColumnTableMappingHeader } from '@/components/column-mapping/ColumnMappingTable/ColumnMappingHeader';
import { zodResolver } from '@hookform/resolvers/zod';
import { RequiredFieldSection } from '../column-mapping/ColumnMappingTable/RequiredFieldSection';
import { ColumnContainer } from '../column-mapping/ColumnContainer';
import { useVendorColumnMapping } from '@/hooks/vendors';
import { VENDOR_COLUMN_MAPPING_FIELDS } from '@/constants/vendorColumnMappingFields';
import { type Resolver } from 'react-hook-form';
import { useState } from 'react';
import { AnalyticsDialog } from '@/components/column-mapping/ColumnMappingTable/AnalyticsDialog';

export const VendorsColumnMapping = () => {
  const importJobId = useSearchParams().get('import_job_id');
  const { data, isPending } = useImportColumn(importJobId as string);
  const { mutate, isPending: isMappingPending } = useVendorColumnMapping();
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  const form = useForm<MappingVendorFormValues>({
    resolver: zodResolver(
      vendorColumnMappingSchema,
    ) as Resolver<MappingVendorFormValues>,
    defaultValues: {
      vendorEmail: '',
      vendorName: '',
    },
  });

  const onSubmit = (data: MappingVendorFormValues) => {
    mutate(
      {
        ImportJobId: Number(importJobId),
        mapping: {
          ...data,
        },
      },
      {
        onSuccess: () => {
          setPreviewDialogOpen(true);
        },
      },
    );
  };

  if (isPending)
    return <LoaderDialog text="Columns are mapping.." open={isPending} />;

  return (
    <ColumnContainer>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="shadow-md border border-[#E4E4E7] p-6 rounded-4xl">
            <ColumnTableMappingHeader />
            <RequiredFieldSection
              requiredFields={VENDOR_COLUMN_MAPPING_FIELDS}
              headers={data?.data?.data?.headers ?? []}
              errors={form.formState.errors}
            />
          </div>
          <ColumnMappingFooter isLoading={isMappingPending} />
        </form>
      </FormProvider>
      <AnalyticsDialog
        open={previewDialogOpen}
        onClose={setPreviewDialogOpen}
        flow="vendor"
      />
    </ColumnContainer>
  );
};
