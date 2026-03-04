import { TemplateDetailHeader } from './TemplateDetailHeader';

interface TemplateDetailsSectionProps {
  templateId: string;
}

export const TemplateDetailsSection = ({
  templateId,
}: TemplateDetailsSectionProps) => {
  return (
    <div className="space-y-10">
      <TemplateDetailHeader templateId={templateId} />
      <div className="max-w-[900px] m-auto rounded-[8px] p-[16px] border border-[#E4E4E7] space-y-[20px]">
        <div>Template 2</div>
        {/* Subject */}
        <div>
          <div>Subject</div>
          <div>
            Follow-up on Purchase Order <strong>{'{PO Number}'}</strong>
          </div>
        </div>
        {/* Content */}
        <div className="space-y-4">
          <div>Body</div>
          <div>
            Dear <strong>{'{Vendor}'}</strong>,
          </div>
          <div className="space-y-4">
            <div>
              I hope this message finds you well. I am reaching out to follow up
              on our Purchase Order # {'{PO Number}'}, which was placed on{' '}
              {'{Order Date}'}. As we approach the due date of {'{Due Date}'}, I
              wanted to check in on the status of the order.
            </div>
            <div>
              Could you kindly provide us with an update on the current progress
              of the order, including the expected timeline for delivery? If
              there have been any delays or issues that might affect the
              delivery schedule, please inform us as soon as possible so we can
              adjust our planning accordingly.
            </div>
            <div>
              Additionally, we would appreciate any details regarding the PO
              Line Items, Unit Cost <strong>{'{Unit Cost}'}</strong> and PO
              Value <strong>{'{PO Value}'}</strong> if there are any
              discrepancies.
            </div>
            <div>
              Thank you for your time and consideration. Should you have any
              questions or require further assistance, please don&apos;t
              hesitate to reach out. We look forward to the opportunity of
              working with you.
            </div>
          </div>
          <div>
            <div>Best regards,</div>
            <div>
              <strong>{'{Company Signature}'}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
