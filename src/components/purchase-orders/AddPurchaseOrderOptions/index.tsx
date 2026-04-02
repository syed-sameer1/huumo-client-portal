'use client';

import { Button } from '@/components/ui/button';
import { POOptions } from '../POOptions';
import { useState } from 'react';
import { PO_VALUES } from '../POOptions/constants';
import { useImportCSV } from '@/hooks/csvImports';
import { useRouter } from 'next/navigation';
import { routeUrls } from '@/constants/urls';
import { LoaderDialog } from '@/components/loader';
import { toast } from 'sonner';

export const AddPurchaseOrderOptions = () => {
  const router = useRouter();
  const [selectedPurchaseOption, setSelectedPurchaseOption] =
    useState<PO_VALUES>(PO_VALUES.UPLOAD_CSV);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate, isPending } = useImportCSV();

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

  return (
    <>
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
        />
        <Button
          className="justify-self-end flex bg-background-secondary w-30"
          onClick={handleContinue}
          disabled={isPending}
        >
          Continue
        </Button>
      </div>
      {isPending && <LoaderDialog open={isPending} />}
    </>
  );
};
