import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AddPurchaseOrderOptions } from '@/components/purchase-orders/AddPurchaseOrderOptions';
import { SelectImportMethodBreadcrumbs } from '@/constants/breadcrumbs';

export default function NewPurchaseOrder() {
  return (
    <div>
      <Breadcrumb breadcrumbsItem={SelectImportMethodBreadcrumbs} />
      <AddPurchaseOrderOptions />
    </div>
  );
}
