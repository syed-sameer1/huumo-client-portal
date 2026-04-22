import { BookUserIcon, MailIcon, UserRound } from 'lucide-react';
import { DetailsContentWrapper } from '../DetailsContentWrapper';
import { usePurchaseOrderDetailsData } from '@/components/purchase-order-details/hooks/usePurchaseOrderDetailsData';
import { PurchaseOrders, PurchaseOrderVendor } from '@/types/purchaseOrders';
import { EmailCell } from '@/components/purchase-orders/PurchaseOrdersTable/TableHeader';

const vendorInformationDetails: {
  title: string;
  Icon: typeof BookUserIcon;
  key: keyof PurchaseOrderVendor;
}[] = [
  {
    title: 'Vendor',
    Icon: BookUserIcon,
    key: 'name',
  },
  {
    title: 'Email Address',
    Icon: MailIcon,
    key: 'email',
  },
];

export const VendorInformation = () => {
  const { data } = usePurchaseOrderDetailsData();
  const renderValue = (key: keyof PurchaseOrderVendor) => {
    if (key === 'email') {
      if (data?.vendor?.email) return data?.vendor?.[key];
      return (
        <EmailCell
          row={
            {
              vendorEmail: data?.vendor?.email,
              vendorName: data?.vendor?.name,
              vendorId: data?.vendor?.id,
            } as PurchaseOrders
          }
        />
      );
    }
    return data?.vendor?.[key] ?? '-';
  };
  return (
    <DetailsContentWrapper title="Vendor Information" Icon={UserRound}>
      <div>
        {vendorInformationDetails.map(({ title, Icon, key }) => (
          <div className="flex items-start gap-3 pt-2 pb-5" key={key}>
            <Icon size={20} className="text-background-secondary" />
            <div className="space-y-2">
              <div className="leading-none text-muted-foreground">{title}</div>
              <div className="font-medium">{renderValue(key)}</div>
            </div>
          </div>
        ))}
      </div>
    </DetailsContentWrapper>
  );
};
