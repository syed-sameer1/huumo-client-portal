export interface MissingVendorEmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  missingCount: number;
  /** PO import job id — used for missing-vendor-email CSV export */
  importJobId: string;
  onContinueWithoutEmail: () => void;
  onProceed: (file: File | null) => void;
  isUploading?: boolean;
}
