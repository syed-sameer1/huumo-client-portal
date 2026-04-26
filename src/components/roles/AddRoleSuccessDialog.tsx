'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Check } from 'lucide-react';

interface AddRoleSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

export function AddRoleSuccessDialog({
  open,
  onOpenChange,
  email,
}: AddRoleSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-8 gap-0">
        <div className="text-center space-y-4">
          <div className="w-[88px] h-[88px] rounded-full bg-[#20A6650D] flex items-center justify-center mx-auto">
            <Check className="w-11 h-11 text-[#20A665]" strokeWidth={3} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Invitation sent
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An email invitation has been sent to{' '}
              <span className="font-semibold text-foreground">{email}</span> so
              they can finish setting up their account.
            </p>
          </div>
          <Button
            type="button"
            className="w-full mt-2 bg-[#52a46d] hover:bg-[#438e5b] text-white h-11"
            onClick={() => onOpenChange(false)}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
