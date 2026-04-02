'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useImportColumn } from '@/hooks/csvImports';
import { useVendorColumnMapping } from '@/hooks/vendors';
import {
  MappingVendorFormValues,
  vendorColumnMappingSchema,
} from '@/schema/columnMappingSchema';
import { RequiredFieldSection } from '@/components/column-mapping/ColumnMappingTable/RequiredFieldSection';
import { ColumnMappingHeader } from '@/components/column-mapping/ColumnMappingTable/ColumnMappingHeader';
import { ColumnMappingFooter } from '@/components/column-mapping/ColumnMappingTable/ColumnMappingFooter';
import { VENDOR_COLUMN_MAPPING_FIELDS } from '@/constants/vendorColumnMappingFields';
import { GradientRingSpinner } from '@/components/gradient-loader';
import { useQueryClient } from '@tanstack/react-query';
import { type Resolver } from 'react-hook-form';
import { toast } from 'sonner';

interface VendorEmailColumnMappingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importJobId: string;
  onMappingSuccess: () => void;
}

export function VendorEmailColumnMappingModal({
  open,
  onOpenChange,
  importJobId,
  onMappingSuccess,
}: VendorEmailColumnMappingModalProps) {
  const queryClient = useQueryClient();
  const { data, isPending: isHeadersLoading } = useImportColumn(importJobId, {
    enabled: open && !!importJobId,
  });
  const { mutate, isPending: isMappingPending } = useVendorColumnMapping();

  const form = useForm<MappingVendorFormValues>({
    resolver: zodResolver(
      vendorColumnMappingSchema,
    ) as Resolver<MappingVendorFormValues>,
    defaultValues: {
      vendorEmail: '',
      vendorName: '',
    },
  });

  const headers = data?.data?.data?.headers ?? [];

  const onSubmit = (values: MappingVendorFormValues) => {
    mutate(
      {
        ImportJobId: Number(importJobId),
        mapping: { ...values },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['purchase-orders'],
            exact: false,
          });
          queryClient.invalidateQueries({
            queryKey: ['vendors-data'],
            exact: false,
          });
          onOpenChange(false);
          onMappingSuccess();
        },
        onError: () => {
          toast.error('Could not save mapping. Please try again.');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] max-w-3xl flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="border-b px-6 py-4 text-left">
          <DialogTitle className="text-lg font-semibold">
            Column Mapping
          </DialogTitle>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          {isHeadersLoading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <GradientRingSpinner size={72} />
              <p className="text-sm font-medium text-muted-foreground">
                Loading CSV columns…
              </p>
            </div>
          ) : (
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="rounded-xl border border-[#E4E4E7] p-4 shadow-sm">
                  <ColumnMappingHeader />
                  <RequiredFieldSection
                    requiredFields={VENDOR_COLUMN_MAPPING_FIELDS}
                    headers={headers}
                    errors={form.formState.errors}
                  />
                </div>
                <ColumnMappingFooter isLoading={isMappingPending} />
              </form>
            </FormProvider>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
