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
import { MappingField } from '../column-mapping/ColumnMappingTable/MappingRow/types';
import { ColumnContainer } from '../column-mapping/ColumnContainer';
import { ColumnMappingHeader } from '../column-mapping/ColumnMappingHeader';
import { useVendorColumnMapping } from '@/hooks/vendors';

export const REQUIRED_FIELDS: MappingField[] = [
  {
    id: 'vendorEmail',
    label: 'Email Address',
    required: true,
    sample: 'vendor@gmail.com',
    name: 'vendorEmail',
  },
  {
    id: 'vendorName',
    name: 'vendorName',
    label: 'Vendor',
    required: true,
    sample: 'Nvidia Corp',
  },
];

export const VendorsColumnMapping = () => {
  const importJobId = useSearchParams().get('import_job_id');
  const { data, isPending } = useImportColumn(importJobId as string);
  const { mutate, isPending: isMappingPending } = useVendorColumnMapping();
  const router = useRouter();

  const form = useForm<MappingVendorFormValues>({
    resolver: zodResolver(vendorColumnMappingSchema),
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
          router.push('/vendors');
        },
      },
    );
  };

  if (isPending)
    return <LoaderDialog text="Columns are mapping.." open={isPending} />;

  return (
    <ColumnContainer>
      <ColumnMappingHeader />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="shadow-md border border-[#E4E4E7] p-6 rounded-4xl">
            <ColumnTableMappingHeader />
            <RequiredFieldSection
              requiredFields={REQUIRED_FIELDS}
              headers={data?.data?.data?.headers}
              errors={form.formState.errors}
            />
          </div>
          <ColumnMappingFooter isLoading={isMappingPending} />
        </form>
      </FormProvider>
    </ColumnContainer>
  );
};
