import { ReactNode } from 'react';
import { ActionButtons } from './ActionButtons';

interface TemplateDetailHeaderProps {
  templateId: string;
  title?: ReactNode;
}

export const TemplateDetailHeader = ({
  templateId,
  title = 'Template Details',
}: TemplateDetailHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-[24px] font-semibold">{title}</div>
      <ActionButtons templateId={templateId} />
    </div>
  );
};
