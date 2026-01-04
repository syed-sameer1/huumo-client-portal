import { POOptions } from '@/components/purchase-orders/POOptions';

export const PurchaseOrders = () => {
  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="text-[24px] text-[#09090B] font-semibold">
        How would you like to add purchase orders?
      </div>
      <div className="text-[16px] text-foreground">
        Import purchase orders from a file, connect Google Sheets or your ERP,
        or add them manually.
      </div>
      <POOptions />
    </div>
  );
};
