import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getPOLineItemsBreadcrumbs } from '@/components/layout/Breadcrumb/helpers/breadcrumbs';
import { POLineItems } from '@/components/po-line-items';

export default async function POLineItemsPage({ params }) {
  const { id } = await params;

  const breadcrumbs = getPOLineItemsBreadcrumbs(id);
  return (
    <div>
      <Breadcrumb breadcrumbsItem={breadcrumbs} />
      <POLineItems />
    </div>
  );
}
