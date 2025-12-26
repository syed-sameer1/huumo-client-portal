import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AddPurchaseOrderOptions } from '@/components/purchase-orders/AddPurchaseOrderOptions';

const items = [
  {
    href: 'purchase-orders',
    label: 'Purchase Orders',
  },
  {
    href: 'new-purchase-order',
    label: 'New PO',
  },
  {
    href: 'select-import-method',
    label: 'Select Import Method',
  },
];

export default function NewPurchaseOrder() {
  return (
    <div>
      <Breadcrumb breadcrumbsItem={items} />
      <AddPurchaseOrderOptions />
    </div>
  );
}
