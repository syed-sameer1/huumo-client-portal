import { PageContainer } from '@/components/layout/PageContainer';
import { Title } from '@/components/layout/Title';
import { AddRoleButton } from '@/components/roles/add-role-button';
import { RolesSection } from '@/components/roles/roles-section';

export default function RolesPage() {
  return (
    <PageContainer className="space-y-8">
      <div className="flex justify-between">
        <Title>Roles</Title>
        <AddRoleButton />
      </div>
      <RolesSection />
    </PageContainer>
  );
}
