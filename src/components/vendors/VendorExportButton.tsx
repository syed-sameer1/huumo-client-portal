'use client';

import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useExportCsvVendors } from '@/hooks/vendors';
import { toast } from 'sonner';
import {
  searchParamsToVendorFilters,
  vendorFiltersToApiQuery,
} from '@/components/vendors/VendorFilters/constants';

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

export function VendorExportButton() {
  const searchParams = useSearchParams();
  const { mutate: exportCsv, isPending } = useExportCsvVendors();

  const handleExportCsv = () => {
    const filters = searchParamsToVendorFilters(
      new URLSearchParams(searchParams.toString()),
    );
    const api = vendorFiltersToApiQuery(filters);
    const params = {
      searchValue: api.searchValue,
      confirmationRateMin:
        api.confirmationRateMin !== undefined
          ? String(api.confirmationRateMin)
          : undefined,
      confirmationRateMax:
        api.confirmationRateMax !== undefined
          ? String(api.confirmationRateMax)
          : undefined,
      performanceScoreMin:
        api.performanceScoreMin !== undefined
          ? String(api.performanceScoreMin)
          : undefined,
      performanceScoreMax:
        api.performanceScoreMax !== undefined
          ? String(api.performanceScoreMax)
          : undefined,
      riskLevel: api.riskLevel,
      sortBy: api.sortBy,
      missingEmail: api.missingEmail,
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
          filenameFromContentDisposition(contentDisposition) ?? 'vendors.csv';

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
      type="button"
      disabled={isPending}
      onClick={handleExportCsv}
      className="bg-[#FAFAFA] text-[#20A665] hover:bg-background-secondary/90 hover:text-white"
    >
      {isPending ? 'Exporting…' : 'Export'}
    </Button>
  );
}
