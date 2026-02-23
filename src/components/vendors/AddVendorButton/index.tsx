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

export const AddVendorButton = () => {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const handleAddVendor = () => {
    setOpen(true);
  };

  const handleOnCloseModal = () => {
    setOpen(false);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Example checks
    if (!file.name.endsWith('.csv')) {
      alert('Only CSV files are allowed');
      return;
    }

    // 👉 Your logic here
    console.log('File uploaded:', file);
    setFileUploadLoading(true);

    setTimeout(() => {
      setFileUploadLoading(false);
    }, 3000);

    // reset input so user can re-upload same file
    event.target.value = '';
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
        onChange={handleFileChange}
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
