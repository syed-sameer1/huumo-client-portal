'use client';

import { GradientRingSpinner } from '@/components/gradient-loader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { routeUrls } from '@/constants/urls';
import {
  useImportColumn,
  useProcessImport,
  useImportVendorCSV,
} from '@/hooks/csvImports';
import { downloadMissingVendorEmailCsv } from '@/service/csv-imports/csv-imports';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { MissingVendorEmailModal } from './MissingVendorEmailModal';
import { VendorEmailColumnMappingModal } from './VendorEmailColumnMappingModal';

function getImportJobIdFromVendorCsvResponse(
  res: AxiosResponse<unknown>,
): string | null {
  const body = res.data as
    | { importJobId?: number | string; data?: { importJobId?: number } }
    | undefined;
  const id = body?.importJobId ?? body?.data?.importJobId;
  return id != null ? String(id) : null;
}

function getMissingVendorEmailCountFromProcessResponse(
  response: AxiosResponse<unknown>,
): number | undefined {
  const body = response.data as
    | {
        data?: {
          data?: {
            previewSummary?: { missingVendorEmailCount?: number };
          };
        };
      }
    | undefined;
  return body?.data?.data?.previewSummary?.missingVendorEmailCount;
}

export const AnalyticsDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) => {
  const importJobId = useSearchParams().get('import_job_id');
  const router = useRouter();
  const [showEmailMissingModal, setShowEmailMissingModal] = useState(false);
  const [missingEmailModalCount, setMissingEmailModalCount] = useState(0);
  const [vendorSupplementJobId, setVendorSupplementJobId] = useState<
    string | null
  >(null);
  const [showVendorColumnMappingModal, setShowVendorColumnMappingModal] =
    useState(false);

  const { mutate: importVendorCsv, isPending: isVendorCsvUploading } =
    useImportVendorCSV();

  const previewPollOptions = useMemo(
    () => ({
      enabled: open && !!importJobId,
      refetchInterval: (query: {
        state: { data?: { data?: { data?: { status?: string } } } };
      }) => {
        const status = query.state.data?.data?.data?.status;
        return status === 'previewReady' ? false : 2000;
      },
      staleTime: 0,
    }),
    [open, importJobId],
  );
  const { isPending, data, isFetching, isRefetching } = useImportColumn(
    importJobId as string,
    previewPollOptions,
  );
  const { mutate: processImport, isPending: isProcessing } = useProcessImport();

  const previewSummary = data?.data.data?.previewSummary;

  const handleDownloadCsv = async () => {
    if (!importJobId) return;
    try {
      const res = await downloadMissingVendorEmailCsv(importJobId);
      const blob =
        res.data instanceof Blob
          ? res.data
          : new Blob([res.data as BlobPart], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'missing-vendor-emails.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error(
        'Could not download CSV. Check the API path if this persists.',
      );
    }
  };

  const onImport = () => {
    if (!importJobId) return;
    const previewMissing = previewSummary?.missingVendorEmailCount;

    processImport(
      { id: importJobId },
      {
        onSuccess: (response) => {
          const fromResponse =
            getMissingVendorEmailCountFromProcessResponse(response);
          const missing = fromResponse ?? previewMissing ?? 0;

          onClose(false);

          if (missing > 0) {
            setMissingEmailModalCount(missing);
            setShowEmailMissingModal(true);
          } else {
            router.push(routeUrls.purchaseOrdersRoute);
          }
        },
      },
    );
  };

  const goToPurchaseOrders = () => {
    setShowEmailMissingModal(false);
    setShowVendorColumnMappingModal(false);
    setVendorSupplementJobId(null);
    router.push(routeUrls.purchaseOrdersRoute);
  };

  const handleProceedWithVendorCsv = (selectedFile: File | null) => {
    if (!selectedFile) {
      toast.error(
        'Select a CSV file to proceed, or use Continue without Email',
      );
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    importVendorCsv(formData, {
      onSuccess: (res) => {
        const jobId = getImportJobIdFromVendorCsvResponse(res);
        if (!jobId) {
          toast.error('Could not start import. Missing import job id.');
          return;
        }
        setVendorSupplementJobId(jobId);
        setShowEmailMissingModal(false);
        setShowVendorColumnMappingModal(true);
      },
      onError: () => {
        toast.error('Upload failed. Please try again.');
      },
    });
  };
  console.log('isPending', { isPending, isFetching, isRefetching });

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[520px]">
          <div>
            {isRefetching || isPending ? (
              <div className="flex items-center flex-col gap-[40px]">
                <GradientRingSpinner size={100} />
                <div className="font-semibold">PO details analyzing...</div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <div className="text-[18px] font-semibold">
                    CSV file has been analyzed{' '}
                  </div>
                  <div className="text-sm">
                    Please review below before completing the import.
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-[#3F3F46]">
                    Total Records :{' '}
                    <span className="font-semibold text-[#09090B]">
                      {previewSummary?.totalRows}
                    </span>
                  </div>
                  <div className="text-[#3F3F46]">
                    Records to Create :{' '}
                    <span className="font-semibold text-[#09090B]">
                      {previewSummary?.validRows}
                    </span>
                  </div>
                  <div className="text-[#3F3F46]">
                    Missing Vendor Emails:{' '}
                    <span className="font-semibold text-[#09090B]">
                      {previewSummary?.missingVendorEmailCount}
                    </span>
                  </div>
                  <div className="text-[#3F3F46]">
                    Duplicated Rows:{' '}
                    <span className="font-semibold text-[#09090B]">
                      {previewSummary?.invalidRows}
                    </span>
                  </div>
                  <div className="text-[#3F3F46]">
                    Overdue POs:{' '}
                    <span className="font-semibold text-[#09090B]">
                      {previewSummary?.invalidRows}
                    </span>
                  </div>
                  <div className="text-[#3F3F46]">
                    Errors :{' '}
                    <span className="font-semibold text-[#09090B]">
                      {previewSummary?.topErrors?.length ?? 0}
                    </span>
                  </div>
                </div>

                {!!previewSummary?.topErrors?.length && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="errors">
                      <AccordionTrigger className="no-underline hover:no-underline pt-0 text-md text-[#3F3F46]">
                        Errors
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          {previewSummary.topErrors.map((err, idx) => (
                            <li key={`${err}-${idx}`}>{err}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                <div className="flex justify-between gap-12">
                  <Button className="flex-1" variant="ghost">
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!importJobId || isProcessing}
                    onClick={onImport}
                  >
                    {isProcessing ? 'Importing…' : 'Import'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <MissingVendorEmailModal
        open={showEmailMissingModal}
        onOpenChange={setShowEmailMissingModal}
        missingCount={missingEmailModalCount}
        onContinueWithoutEmail={goToPurchaseOrders}
        onProceed={handleProceedWithVendorCsv}
        onDownloadCsv={handleDownloadCsv}
        isUploading={isVendorCsvUploading}
      />

      {vendorSupplementJobId && (
        <VendorEmailColumnMappingModal
          key={vendorSupplementJobId}
          open={showVendorColumnMappingModal}
          importJobId={vendorSupplementJobId}
          onOpenChange={(next) => {
            setShowVendorColumnMappingModal(next);
            if (!next) setVendorSupplementJobId(null);
          }}
          onMappingSuccess={goToPurchaseOrders}
        />
      )}
    </>
  );
};
