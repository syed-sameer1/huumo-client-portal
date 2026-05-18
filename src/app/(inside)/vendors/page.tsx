import { Suspense } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Title } from '@/components/layout/Title';
import { VendorsSection } from '@/components/vendors';
import { AddVendorButton } from '@/components/vendors/AddVendorButton';
import { VendorExportButton } from '@/components/vendors/VendorExportButton';
import { Button } from '@/components/ui/button';

export default function VendorsPage() {
  return (
    <PageContainer className="space-y-8">
      <div className="flex justify-between">
        <Title>Vendors</Title>
        <div className="flex items-center gap-2">
          <Suspense
            fallback={
              <Button
                type="button"
                disabled
                className="bg-[#FAFAFA] text-[#20A665]"
              >
                Export
              </Button>
            }
          >
            <VendorExportButton />
          </Suspense>
          <AddVendorButton />
        </div>
      </div>
      <Suspense fallback={<></>}>
        <VendorsSection />
      </Suspense>
    </PageContainer>
  );
}
