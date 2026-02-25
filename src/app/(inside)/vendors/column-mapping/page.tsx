import { VendorsColumnMapping } from '@/components/vendors-column-mapping';
import { Suspense } from 'react';

export default function VendorColumnMappingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VendorsColumnMapping />
    </Suspense>
  );
}
