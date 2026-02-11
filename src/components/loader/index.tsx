'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';

type Props = {
  open: boolean;
  text?: string;
};

export function LoaderDialog({
  open,
  text = 'PO details extracting...',
}: Props) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-sm p-6 flex flex-col items-center gap-4 text-center [&>button]:hidden">
        <LoaderCircle className="h-10 w-10 animate-spin text-green-600" />
        <p className="text-sm font-medium">{text}</p>
      </DialogContent>
    </Dialog>
  );
}
