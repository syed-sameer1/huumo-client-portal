import { Button } from '@/components/ui/button';
import { POOptions } from '../POOptions';

export const AddPurchaseOrderOptions = () => {
  return (
    <div className="w-238.5 mx-auto space-y-6 mt-25">
      <div className="space-y-4 text-center">
        <h3 className="text-foreground text-[24px] font-semibold">
          How You Want to Add POs
        </h3>
        <div>
          Import your PO data from a file, connect Sheets or ERP, or create a PO
          manually.
        </div>
      </div>
      <POOptions />
      <Button className="justify-self-end flex bg-background-secondary w-30">
        Continue
      </Button>
    </div>
  );
};
