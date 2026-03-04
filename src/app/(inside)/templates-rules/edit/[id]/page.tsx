import { PageContainer } from '@/components/layout/PageContainer';
import { EditTemplateForm } from '@/components/templates-rules/EditTemplateForm';

export default function EditTemplatePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <PageContainer className="space-y-8">
      <EditTemplateForm templateId={params.id} />
    </PageContainer>
  );
}
