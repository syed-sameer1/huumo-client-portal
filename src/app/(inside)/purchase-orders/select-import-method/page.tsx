import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AddPurchaseOrderOptions } from '@/components/purchase-orders/AddPurchaseOrderOptions';
import { SelectImportMethodBreadcrumbs } from '@/constants/breadcrumbs';
import { Suspense } from 'react';

export default function NewPurchaseOrder() {
  return (
    <Suspense fallback={<></>}>
      <div>
        <Breadcrumb breadcrumbsItem={SelectImportMethodBreadcrumbs} />
        <AddPurchaseOrderOptions />
      </div>
    </Suspense>
  );
}
