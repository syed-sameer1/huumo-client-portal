import { ActionButtons } from './ActionButtons';

interface TemplateDetailHeaderProps {
  templateId: string;
}

export const TemplateDetailHeader = ({
  templateId,
}: TemplateDetailHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-[24px] font-semibold">Purchase Order Details</div>
      <ActionButtons templateId={templateId} />
    </div>
  );
};
