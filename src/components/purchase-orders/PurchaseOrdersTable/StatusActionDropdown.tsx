'use client';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
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
import { usePurchaseOrderBulkAction } from '@/hooks/purchaseOrders';

export const StatusActionDropdown = ({
  poId,
  statusValue,
}: {
  poId?: number;
  statusValue: POStatus;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePurchaseOrderBulkAction();

  const selectedStatus = PurchaseOrdersStatusConfigs[statusValue] || {};
  const canChangeStatus = typeof poId === 'number' && poId > 0;

  const onSelectStatus = (nextStatus: POStatus) => {
    const id = poId;
    if (typeof id !== 'number' || id <= 0) return;
    mutate(
      { poIds: [id], action: nextStatus },
      {
        onSuccess: () => {
          toast.success('Status updated');
          queryClient.invalidateQueries({
            queryKey: ['purchase-orders'],
            exact: false,
          });
          queryClient.invalidateQueries({
            queryKey: ['purchase-orders-details'],
            exact: false,
          });
          queryClient.invalidateQueries({
            queryKey: ['client-settings'],
            exact: false,
          });
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message ?? 'Could not update status.',
          );
        },
      },
    );
  };

  const statusButton = (
    <Button
      data-no-row-click
      type="button"
      disabled={isPending && canChangeStatus}
      className={`bg-[${selectedStatus.bgColor}] text-[${selectedStatus.textColor}] gap-1 h-6 text-[12px] py-1 px-2 rounded-full h-fit`}
      style={{
        backgroundColor: selectedStatus.bgColor,
        color: selectedStatus.textColor,
      }}
    >
      {selectedStatus.label}
      {canChangeStatus ? <ChevronDown size={16} /> : null}
    </Button>
  );

  if (!canChangeStatus) {
    return statusButton;
  }

  const otherStatuses = (
    Object.keys(PurchaseOrdersStatusConfigs) as POStatus[]
  ).filter((key) => key !== statusValue);

  return (
    <DropdownMenu data-no-row-click>
      <DropdownMenuTrigger asChild>{statusButton}</DropdownMenuTrigger>
      <DropdownMenuContent data-no-row-click>
        {otherStatuses.map((status) => {
          const { label } = PurchaseOrdersStatusConfigs[status];
          return (
            <DropdownMenuItem
              key={status}
              data-no-row-click
              disabled={isPending}
              onClick={(e) => {
                e.stopPropagation();
                onSelectStatus(status);
              }}
            >
              {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
