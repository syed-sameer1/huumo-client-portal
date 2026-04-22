'use client';

import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useExportCsvVendors } from '@/hooks/vendors';
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

export function VendorExportButton() {
  const searchParams = useSearchParams();
  const { mutate: exportCsv, isPending } = useExportCsvVendors();

  const handleExportCsv = () => {
    const presets = searchParams.getAll('preset');
    const params = {
      searchValue: searchParams.get('searchValue') || undefined,
      confirmationRateMin: searchParams.get('crMin') || undefined,
      confirmationRateMax: searchParams.get('crMax') || undefined,
      performanceScoreMin: searchParams.get('psMin') || undefined,
      performanceScoreMax: searchParams.get('psMax') || undefined,
      presets: presets.length > 0 ? presets : undefined,
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
