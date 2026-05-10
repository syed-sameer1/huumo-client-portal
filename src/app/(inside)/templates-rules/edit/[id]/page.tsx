import { PageContainer } from '@/components/layout/PageContainer';
import { EditTemplateForm } from '@/components/templates-rules/EditTemplateForm';

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageContainer className="space-y-8">
      <EditTemplateForm templateId={id} />
    </PageContainer>
  );
}
