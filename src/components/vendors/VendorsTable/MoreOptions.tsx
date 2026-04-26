import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { EditVendorModal } from '../EditVendorModal';
import { DeleteVendorModal } from '../DeleteVendorModal';

interface MoreOptionsProps {
  email: string | null;
  vendorName: string;
  vendorId: number;
}

export const MoreOptions = ({
  email,
  vendorName,
  vendorId,
}: MoreOptionsProps) => {
  const [editVendor, setEditVendor] = useState(false);
  const [deleteVendor, setDeleteVendor] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            data-no-row-click
            onClick={(e) => e.stopPropagation()}
          >
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-49 mr-4 mt-5">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setEditVendor(true);
              }}
              className="text-secondary-foreground text-sm py-1.5 h-8.25"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setDeleteVendor(true);
              }}
              className="text-secondary-foreground text-sm py-1.5 h-8.25"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditVendorModal
        onClose={() => setEditVendor(false)}
        open={editVendor}
        email={email}
        vendorName={vendorName}
        vendorId={vendorId}
      />
      <DeleteVendorModal
        onClose={() => setDeleteVendor(false)}
        open={deleteVendor}
        vendorName={vendorName}
        vendorId={vendorId}
      />
    </>
  );
};
