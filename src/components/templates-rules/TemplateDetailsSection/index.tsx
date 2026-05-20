'use client';

import { useEmailTemplate } from '@/tanstack/templates/useEmailTemplate';
import { formatEmailTemplateTypeLabel } from '@/types/emailTemplate';
import { TemplateDetailHeader } from './TemplateDetailHeader';
import { TemplateDetailsSkeleton } from './TemplateDetailsSkeleton';

interface TemplateDetailsSectionProps {
  templateId: string;
}

export const TemplateDetailsSection = ({
  templateId,
}: TemplateDetailsSectionProps) => {
  const { data, isLoading, isError } = useEmailTemplate(templateId);

  if (isLoading) {
    return <TemplateDetailsSkeleton templateId={templateId} />;
  }

  if (isError || !data?.template) {
    return (
      <div className="space-y-10">
        <TemplateDetailHeader templateId={templateId} />
        <p className="text-sm text-destructive">
          Unable to load template. Please try again later.
        </p>
      </div>
    );
  }

  const { template } = data;

  return (
    <div className="space-y-10">
      <TemplateDetailHeader templateId={templateId} title={template.name} />
      <div className="m-auto max-w-[900px] space-y-[20px] rounded-[8px] border border-[#E4E4E7] p-[16px]">
        <div className="font-medium">
          {formatEmailTemplateTypeLabel(template.type)}
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Subject</div>
          <div className="mt-1">{template.subject}</div>
        </div>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">Body</div>
          <div
            className="prose prose-sm max-w-none font-normal [&_p]:mb-4 [&_p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: template.body }}
          />
        </div>
      </div>
    </div>
  );
};
