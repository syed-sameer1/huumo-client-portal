'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { AddVendorModal } from './AddVendorModal';

export const AddVendorButton = () => {
  const [open, setOpen] = useState(false);
  const handleAddVendor = () => {
    setOpen(true);
  };

  const handleOnCloseModal = () => {
    setOpen(false);
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
            <DropdownMenuItem className="text-secondary-foreground text-sm py-1.5 h-8.25">
              Import CSV file
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddVendorModal open={open} onClose={handleOnCloseModal} />
    </>
  );
};
