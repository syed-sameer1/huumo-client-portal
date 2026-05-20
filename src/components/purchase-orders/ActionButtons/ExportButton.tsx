'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSearchParams } from 'next/navigation';
import { useExportCsvPurchaseOrders } from '@/hooks/purchaseOrders';
import { toast } from 'sonner';

function filenameFromContentDisposition(header: string | undefined) {
  if (!header) return null;
  const match = /filename\*?=(?:UTF-8''|")?([^\";]+)"?/i.exec(header);
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export const ExporetButton = () => {
  const searchParams = useSearchParams();
  const { mutate: exportCsv, isPending } = useExportCsvPurchaseOrders();

  const handleExportCsv = () => {
    const statusList = searchParams.getAll('status');
    const sortBy = searchParams.get('sortBy') || undefined;
    const sortOrderRaw = searchParams.get('sortOrder') ?? '';
    const sortOrderUpper = sortOrderRaw.toUpperCase();
    const sortOrder: 'ASC' | 'DESC' | undefined =
      sortBy && sortOrderUpper === 'DESC'
        ? 'DESC'
        : sortBy
          ? 'ASC'
          : undefined;
    const params = {
      searchValue: searchParams.get('searchValue') || undefined,
      orderDateFrom: searchParams.get('orderDateFrom') || undefined,
      orderDateTo: searchParams.get('orderDateTo') || undefined,
      dueDateFrom: searchParams.get('dueDateFrom') || undefined,
      dueDateTo: searchParams.get('dueDateTo') || undefined,
      statuses: statusList.length > 0 ? statusList : undefined,
      sortBy,
      sortOrder,
    };

    exportCsv(params, {
      onSuccess: (res) => {
        const blob =
          res.data instanceof Blob
            ? res.data
            : new Blob([res.data as unknown as BlobPart], {
                type: 'text/csv',
              });

        const contentDisposition =
          (res.headers as Record<string, string | undefined>)?.[
            'content-disposition'
          ] ??
          (res.headers as Record<string, string | undefined>)?.[
            'Content-Disposition'
          ];

        const filename =
          filenameFromContentDisposition(contentDisposition) ??
          'purchase-orders.csv';

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      onError: () => {
        toast.error('Export failed. Please try again.');
      },
    });
  };

  return (
    <Button
      onClick={handleExportCsv}
      className="bg-[#FAFAFA] text-[#20A665] hover:bg-background-secondary/90 hover:text-white"
    >
      Export
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-md  h-10 bg-background-primary-light text-accent-foreground"
          size="sm"
          disabled={isPending}
        >
          {isPending ? 'Exporting…' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-49" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-secondary-foreground text-sm py-1.5 h-8.25">
            Export Sample File
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-secondary-foreground text-sm py-1.5 h-8.25"
            onClick={handleExportCsv}
          >
            Export PO data as CSV
          </DropdownMenuItem>
          <DropdownMenuItem className="text-secondary-foreground text-sm py-1.5 h-8.25">
            Export PO data as PDF
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
