import Image from 'next/image';

export const NoPurchaseOrder = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 mt-13.5">
      <Image
        src="/images/purchase-orders/empty-po.svg"
        alt="empty-po"
        width={392}
        height={312}
      />
      <div className="text-center w-64.75 space-y-3">
        <div className="text-foreground text-xl font-semibold">
          No PO Right Now
        </div>
        <div className="text-secondary-foreground text-sm">
          You have nothing on your list yet. Import or create new sheet
        </div>
      </div>
    </div>
  );
};
