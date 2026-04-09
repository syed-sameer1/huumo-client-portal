'use client';

import { Button } from '@/components/ui/button';
import { POOptions } from '../POOptions';
import { Suspense, useState } from 'react';
import { PO_VALUES } from '../POOptions/constants';
import { useGoogleSheetCSVImport, useImportCSV } from '@/hooks/csvImports';
import { useGoogleSheetFiles, useGoogleSheetTabs } from '@/hooks/importPo';
import { useRouter, useSearchParams } from 'next/navigation';
import { routeUrls } from '@/constants/urls';
import { LoaderDialog } from '@/components/loader';
import { toast } from 'sonner';
import {
  ImportPOModal,
  type GoogleSheetFile,
  type GoogleSheetTab,
} from './ImportPOModal';
import { ImportCSVResponse } from '@/service/csv-imports/types';
import { AxiosResponse } from 'axios';

export const AddPurchaseOrderOptions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPurchaseOption, setSelectedPurchaseOption] =
    useState<PO_VALUES>(PO_VALUES.UPLOAD_CSV);
  const [isImportCsvModalOpen, setIsImportCsvModalOpen] = useState(
    () => searchParams.get('google_sheet_connected') === 'true',
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate, isPending } = useImportCSV();
  const [sheetFiles, setSheetFiles] = useState<GoogleSheetFile[] | undefined>();
  const [sheetTabs, setSheetTabs] = useState<GoogleSheetTab[] | undefined>();
  const [selectedSpreadsheetId, setSelectedSpreadsheetId] = useState<
    string | null
  >(null);
  const { mutate: fetchSheetFiles, isPending: isFetchingSheetFiles } =
    useGoogleSheetFiles();
  const { mutate: fetchSheetTabs, isPending: isFetchingTabs } =
    useGoogleSheetTabs();
  const {
    mutate: fetchGoogleSheetPurchaseOrder,
    isPending: isFetchingGoogleSheetPurchaseOrder,
  } = useGoogleSheetCSVImport();

  const continueActions: Record<PO_VALUES, () => void> = {
    [PO_VALUES.UPLOAD_CSV]: () => {
      if (!selectedFile) {
        toast.error('Please select a CSV file');
        return;
      }
      const formData = new FormData();
      formData.append('file', selectedFile);
      mutate(formData, {
        onSuccess: (res) => {
          router.push(
            `${routeUrls.columnMapping}/?import_job_id=${res.data.importJobId}`,
          );
        },
      });
    },
    [PO_VALUES.TEXT_MANUAL]: () => {
      router.push(routeUrls.manualPurchaseOrder);
    },
    [PO_VALUES.GOOGLE_SHEET]: () => {
      // TODO: route to google sheets import flow when ready
      toast.message('Google Sheets import coming soon');
    },
    [PO_VALUES.ERP_INTEGRATION]: () => {
      // TODO: route to ERP integration flow when ready
      toast.message('ERP integration coming soon');
    },
  };

  const handleContinue = () => {
    continueActions[selectedPurchaseOption]?.();
  };

  const onTabSelect = (tab: GoogleSheetTab) => {
    if (!selectedSpreadsheetId) return;
    fetchGoogleSheetPurchaseOrder(
      { spreadsheetId: selectedSpreadsheetId, sheetName: tab.title },
      {
        onSuccess: (res: AxiosResponse<ImportCSVResponse>) => {
          router.push(
            `${routeUrls.columnMapping}/?import_job_id=${res.data.importJobId}`,
          );
        },
        onError: () => {
          toast.error('Could not fetch sheet preview. Please try again.');
        },
      },
    );
  };

  return (
    <Suspense fallback={<></>}>
      <div className="w-238.5 mx-auto space-y-6 mt-25">
        <div className="space-y-4 text-center">
          <h3 className="text-foreground text-[24px] font-semibold">
            How You Want to Add POs
          </h3>
          <div>
            Import your PO data from a file, connect Sheets or ERP, or create a
            PO manually.
          </div>
        </div>
        <POOptions
          selectedPurchaseOption={selectedPurchaseOption}
          setSelectedPurchaseOption={(opt) => {
            setSelectedPurchaseOption(opt);
            if (opt !== PO_VALUES.UPLOAD_CSV) setSelectedFile(null);
          }}
          selectedFile={selectedFile}
          onFileSelected={setSelectedFile}
          onImportCsvClick={() => setIsImportCsvModalOpen(true)}
        />
        <Button
          className="justify-self-end flex bg-background-secondary w-30"
          onClick={handleContinue}
          disabled={isPending}
        >
          Continue
        </Button>
      </div>
      <ImportPOModal
        open={isImportCsvModalOpen}
        onOpenChange={(next) => {
          setIsImportCsvModalOpen(next);
          if (!next) {
            setSheetFiles(undefined);
            setSheetTabs(undefined);
            setSelectedSpreadsheetId(null);
          }
        }}
        isFetchingFiles={isFetchingSheetFiles}
        sheetFiles={sheetFiles}
        onContinue={(selectedOption) => {
          if (selectedOption === 'google-sheets') {
            fetchSheetFiles(undefined, {
              onSuccess: (res) => {
                setSheetFiles(res.data as GoogleSheetFile[]);
              },
              onError: () => {
                toast.error(
                  'Could not fetch Google Sheet files. Please try again.',
                );
              },
            });
            return;
          }
          toast.message('Microsoft Sheet import coming soon');
        }}
        onFileSelect={(file) => {
          setSelectedSpreadsheetId(file.id);
          fetchSheetTabs(file.id, {
            onSuccess: (res) => {
              setSheetTabs(res.data as GoogleSheetTab[]);
            },
            onError: () => {
              toast.error('Could not fetch sheet tabs. Please try again.');
            },
          });
        }}
        onClearFiles={() => {
          setSheetFiles(undefined);
          setSheetTabs(undefined);
          setSelectedSpreadsheetId(null);
        }}
        isFetchingTabs={isFetchingTabs}
        sheetTabs={sheetTabs}
        onTabSelect={onTabSelect}
        onClearTabs={() => setSheetTabs(undefined)}
        isFetchingPreview={isFetchingGoogleSheetPurchaseOrder}
      />
      {isPending && <LoaderDialog open={isPending} />}
    </Suspense>
  );
};
