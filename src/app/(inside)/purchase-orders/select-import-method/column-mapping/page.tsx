import { ColumnMapping } from '@/components/column-mapping';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ColumnMappingBreadcrumbs } from '@/constants/breadcrumbs';

export default function ColumnMappingPage() {
  return (
    <div>
      <Breadcrumb breadcrumbsItem={ColumnMappingBreadcrumbs} />
      <ColumnMapping />
    </div>
  );
}
