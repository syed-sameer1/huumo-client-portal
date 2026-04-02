'use client';

import { useRef } from 'react';
import { PO_OPTIONS, PO_VALUES } from './constants';
import { POOptionsCard } from './POOptionsCard';

export const POOptions = ({
  selectedPurchaseOption,
  setSelectedPurchaseOption,
  selectedFile,
  onFileSelected,
}: {
  selectedPurchaseOption: PO_VALUES;
  setSelectedPurchaseOption: (purchaseOption: PO_VALUES) => void;
  selectedFile: File | null;
  onFileSelected: (file: File | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectPurchaseOption = (purchaseOption: PO_VALUES) => {
    setSelectedPurchaseOption(purchaseOption);

    if (purchaseOption === PO_VALUES.UPLOAD_CSV) {
      fileInputRef.current?.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onFileSelected(file ?? null);
    // allow re-selecting same file
    e.target.value = '';
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
            selectedPurchaseOption={selectedPurchaseOption}
            onSelectPurchaseOption={onSelectPurchaseOption}
          />
        ))}
      </div>
      {selectedPurchaseOption === PO_VALUES.UPLOAD_CSV && selectedFile && (
        <div className="text-sm text-muted-foreground">
          Selected file:{' '}
          <span className="font-medium">{selectedFile.name}</span>
        </div>
      )}
    </>
  );
};
