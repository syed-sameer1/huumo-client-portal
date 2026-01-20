import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { PurchaseOrderDetailsBreadcrumbs } from './constants';
import { PurchaseOrderDetails } from '@/components/purchase-order-details';

export default function PurchaseOrderDetailsPage() {
  return (
    <div>
      <Breadcrumb breadcrumbsItem={PurchaseOrderDetailsBreadcrumbs} />
      <PurchaseOrderDetails />
    </div>
  );
}
