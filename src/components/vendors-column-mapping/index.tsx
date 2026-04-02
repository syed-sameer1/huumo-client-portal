'use client';

import { useImportColumn } from '@/hooks/csvImports';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { ColumnMappingHeader } from '../column-mapping/ColumnMappingHeader';
import { useVendorColumnMapping } from '@/hooks/vendors';
import { VENDOR_COLUMN_MAPPING_FIELDS } from '@/constants/vendorColumnMappingFields';
import { type Resolver } from 'react-hook-form';
import { useState } from 'react';

export const VendorsColumnMapping = () => {
  const importJobId = useSearchParams().get('import_job_id');
  const { data, isPending } = useImportColumn(importJobId as string);
  const { mutate, isPending: isMappingPending } = useVendorColumnMapping();
  const router = useRouter();
  const [headerIncluded, setHeaderIncluded] = useState(false);

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
        headerIncluded,
        mapping: {
          ...data,
        },
      },
      {
        onSuccess: () => {
          router.push('/vendors');
        },
      },
    );
  };

  if (isPending)
    return <LoaderDialog text="Columns are mapping.." open={isPending} />;

  return (
    <ColumnContainer>
      <ColumnMappingHeader
        headerIncluded={headerIncluded}
        onHeaderIncludedChange={setHeaderIncluded}
      />
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
    </ColumnContainer>
  );
};
