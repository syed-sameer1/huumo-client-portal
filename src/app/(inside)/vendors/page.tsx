import { PageContainer } from '@/components/layout/PageContainer';
import { Title } from '@/components/layout/Title';
import { VendorsSection } from '@/components/vendors';
import { AddVendorButton } from '@/components/vendors/AddVendorButton';

export default function VendorsPage() {
  return (
    <PageContainer className="space-y-8">
      <div className="flex justify-between">
        <Title>Vendors</Title>
        <AddVendorButton />
      </div>
      <VendorsSection />
    </PageContainer>
  );
}
