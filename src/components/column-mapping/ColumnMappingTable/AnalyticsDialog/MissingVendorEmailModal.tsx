'use client';

import { useCallback, useRef, useState } from 'react';
import { Trash2, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/LoadingButton';

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface MissingVendorEmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  missingCount: number;
  onContinueWithoutEmail: () => void;
  onProceed: (file: File | null) => void;
  onDownloadCsv?: () => void;
  isUploading?: boolean;
}

export function MissingVendorEmailModal({
  open,
  onOpenChange,
  missingCount,
  onContinueWithoutEmail,
  onProceed,
  onDownloadCsv,
  isUploading = false,
}: MissingVendorEmailModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetFile = useCallback(() => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next) resetFile();
    onOpenChange(next);
  };

  const pickFile = (f: File | null) => {
    if (!f) return;
    if (!f.name.toLowerCase().endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }
    const maxMb = 50;
    if (f.size > maxMb * 1024 * 1024) {
      toast.error(`File must be ${maxMb} MB or smaller`);
      return;
    }
    setFile(f);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    pickFile(e.target.files?.[0] ?? null);
    e.target.value = '';
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    pickFile(e.dataTransfer.files?.[0] ?? null);
  };

  const totalStr = file ? formatFileSize(file.size) : '';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[560px] gap-0 p-0 overflow-hidden [&>button]:hidden">
        <div className="flex items-start justify-between gap-4 border-b px-6 py-4">
          <DialogHeader className="flex-1 space-y-0 p-0 text-left">
            <DialogTitle className="text-lg font-semibold leading-snug pr-2">
              {missingCount} PO
              {missingCount === 1 ? ' has' : 's have'} missing vendor email ID
            </DialogTitle>
          </DialogHeader>
          <Button
            type="button"
            variant="secondary"
            className="shrink-0 bg-zinc-700 text-white hover:bg-zinc-800"
            disabled={isUploading}
            onClick={() => {
              if (onDownloadCsv) onDownloadCsv();
              else
                toast.info('Download will be available when the API is wired');
            }}
          >
            Download CSV file
          </Button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <p className="text-sm text-muted-foreground">
            A CSV file with vendors listed is ready for you. Download it, fill
            and upload here again.
          </p>

          <div className="space-y-2">
            <span className="text-sm font-medium">Upload</span>
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={onInputChange}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              disabled={isUploading}
              className={cn(
                'flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 px-6 py-10 text-center transition-colors',
                isDragging && 'border-primary bg-primary/5',
                isUploading && 'pointer-events-none opacity-60',
              )}
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Drag & Drop or{' '}
                <span className="font-medium text-foreground underline-offset-2 hover:underline">
                  Choose Files
                </span>{' '}
                to upload
              </span>
              <span className="text-xs text-muted-foreground">
                CSV up to 50 MB
              </span>
            </button>

            {file && (
              <div className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#52a46d]/15 text-xs font-bold text-[#52a46d]">
                  CSV
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="truncate text-sm font-medium">
                    {file.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {totalStr} of {totalStr}
                  </div>
                </div>
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={(e) => {
                    e.stopPropagation();
                    resetFile();
                  }}
                  className="shrink-0 rounded-md p-2 text-destructive hover:bg-destructive/10"
                  aria-label="Remove file"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <Button
            type="button"
            variant="outline"
            className="font-semibold"
            disabled={isUploading}
            onClick={() => {
              handleOpenChange(false);
              onContinueWithoutEmail();
            }}
          >
            Continue without Email
          </Button>
          <LoadingButton
            type="button"
            className="bg-background-secondary px-6"
            loading={isUploading}
            disabled={isUploading}
            onClick={() => onProceed(file)}
          >
            Proceed
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
