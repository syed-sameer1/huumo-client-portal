import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { EditVendorModal } from '../EditVendorModal';
import { DeleteVendorModal } from '../DeleteVendorModal';

interface MoreOptionsProps {
  email: string | null;
  vendorName: string;
}

export const MoreOptions = ({ email, vendorName }: MoreOptionsProps) => {
  const [editVendor, setEditVendor] = useState(false);
  const [deleteVendor, setDeleteVendor] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical />
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
      />
      <DeleteVendorModal
        onClose={() => setDeleteVendor(false)}
        open={deleteVendor}
        vendorName={vendorName}
      />
    </>
  );
};
