import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PurchaseOrdersStatusConfigs } from '@/constants/purchaseOrders';
import { POStatus } from '@/types/purchaseOrders';
import { ChevronDown } from 'lucide-react';

export const StatusActionDropdown = ({
  statusValue,
}: {
  statusValue: POStatus;
}) => {
  const selectedStatus = PurchaseOrdersStatusConfigs[statusValue] || {};
  return (
    <DropdownMenu data-no-row-click>
      <DropdownMenuTrigger asChild>
        <Button
          data-no-row-click
          className={`bg-[${selectedStatus.bgColor}] text-[${selectedStatus.textColor}] gap-1 h-6 text-[12px] py-1 px-2 rounded-full h-fit`}
          style={{
            backgroundColor: selectedStatus.bgColor,
            color: selectedStatus.textColor,
          }}
        >
          {selectedStatus.label}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-no-row-click>
        {Object.values(PurchaseOrdersStatusConfigs)
          .filter(({ label }) => label !== selectedStatus.label)
          .map(({ label }) => (
            <DropdownMenuItem key={label} data-no-row-click>
              {label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
