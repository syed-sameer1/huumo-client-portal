import { Suspense } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Title } from '@/components/layout/Title';
import { SetRulesButton } from '@/components/templates-rules/SetRulesButton';
import { TemplatesSection } from '@/components/templates-rules/TemplatesSection';

export default function TemplatesPage() {
  return (
    <PageContainer className="space-y-8">
      <div className="space-y-[16px]">
        <div className="flex justify-between">
          <Title>Templates</Title>
          <SetRulesButton />
        </div>
        <div className="text-sm">
          HUUMO automatically follows up on unacknowledged POs using the rules
          and templates you define.
        </div>
      </div>
      <Suspense fallback={null}>
        <TemplatesSection />
      </Suspense>
    </PageContainer>
  );
}
