'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRef, useState } from 'react';
import { AddVendorModal } from './AddVendorModal';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useImportVendorCSV } from '@/hooks/csvImports';
import { routeUrls } from '@/constants/urls';
import { useRouter } from 'next/navigation';

export const AddVendorButton = () => {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate } = useImportVendorCSV();
  const router = useRouter();

  const handleAddVendor = () => {
    setOpen(true);
  };

  const handleOnCloseModal = () => {
    setOpen(false);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    mutate(formData, {
      onSuccess: (res) => {
        router.push(
          `${routeUrls.vendorColumnMapping}/?import_job_id=${res.data.importJobId}`,
        );
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-background-secondary">Add Vendor</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-49 mr-4 mt-5">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="text-secondary-foreground text-sm py-1.5 h-8.25"
              onClick={handleAddVendor}
            >
              Add Manually
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-secondary-foreground text-sm py-1.5 h-8.25"
              onClick={handleImportClick}
            >
              Import CSV file
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={onFileChange}
      />
      <AddVendorModal open={open} onClose={handleOnCloseModal} />
      {false && (
        <Dialog open={true}>
          <DialogContent className="p-6">
            <Spinner />
            <div className="font-semibold text-[18px]">
              Vendor details extracting...
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
