import { PageContainer } from '@/components/layout/PageContainer';
import { Title } from '@/components/layout/Title';
import { AddRoleButton } from '@/components/roles/add-role-button';
import { RolesSection } from '@/components/roles/roles-section';
import { Suspense } from 'react';

export default function RolesPage() {
  return (
    <PageContainer className="space-y-8">
      <div className="flex justify-between">
        <Title>Roles</Title>
        <AddRoleButton />
      </div>
      <Suspense fallback={<></>}>
        <RolesSection />
      </Suspense>
    </PageContainer>
  );
}
