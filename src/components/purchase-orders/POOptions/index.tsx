'use client';

import { useRef, useState } from 'react';
import { PO_OPTIONS, PO_VALUES } from './constants';
import { POOptionsCard } from './POOptionsCard';
import { useImportCSV } from '@/hooks/csvImports';
import { LoaderDialog } from '@/components/loader';
import { useRouter } from 'next/navigation';
import { routeUrls } from '@/constants/urls';

export const POOptions = () => {
  const router = useRouter();
  const [selectPurchaseOption, setPurchaseOption] = useState(
    PO_VALUES.UPLOAD_CSV,
  );
  const { mutate, isPending } = useImportCSV();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectPurchaseOption = (purchaseOption: PO_VALUES) => {
    setPurchaseOption(purchaseOption);

    if (purchaseOption === PO_VALUES.UPLOAD_CSV) {
      fileInputRef.current?.click();
    }
  };
  console.log({ isPending });
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log('file', file);
    const formData = new FormData();
    formData.append('file', file);

    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        router.push(
          `${routeUrls.columnMapping}/?import_job_id=${res.data.importJobId}`,
        );
      },
    });
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={onFileChange}
      />
      <div className="grid grid-cols-4 gap-4">
        {PO_OPTIONS.map((purchaseOption) => (
          <POOptionsCard
            key={purchaseOption.id}
            purchaseOption={purchaseOption}
            selectedPurchaseOption={selectPurchaseOption}
            onSelectPurchaseOption={onSelectPurchaseOption}
          />
        ))}
      </div>
      {isPending && <LoaderDialog open={isPending} />}
    </>
  );
};
