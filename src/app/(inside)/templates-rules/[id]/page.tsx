import { PageContainer } from '@/components/layout/PageContainer';
import { TemplateDetailsSection } from '@/components/templates-rules/TemplateDetailsSection';

export default async function TemplateDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageContainer className="space-y-8">
      <TemplateDetailsSection templateId={id} />
    </PageContainer>
  );
}
