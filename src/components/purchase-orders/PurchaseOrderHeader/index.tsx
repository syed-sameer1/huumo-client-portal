import { Alert, AlertTitle } from '@/components/ui/alert';
import { PurchaseOrdersActionHeader } from './PurchaseOrdersActionHeader';
import { AlertCircleIcon } from 'lucide-react';

export const PurchaseOrderHeader = () => {
  return (
    <div className="space-y-4">
      <PurchaseOrdersActionHeader />
      <div className="text-muted-foreground text-sm">
        HUUMO automatically follows up on unacknowledged POs using the rules and
        templates you define.
      </div>
      <Alert className="h-12 flex items-center rounded-2xl p-3 gap-3 bg-[#EAB3081F] border-none">
        <div className="flex items-center">
          <AlertCircleIcon size={22} />
        </div>

        <AlertTitle className="m-0 text-sm font-medium leading-tight">
          4 POs need attention — 2 missing emails, 1 overdue
        </AlertTitle>
      </Alert>
    </div>
  );
};
