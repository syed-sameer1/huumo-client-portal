import { Info } from 'lucide-react';
import { IntegrationOption } from './IntegrationOption';
import { useGoogleIntegration } from '@/hooks/integration';

export const IntegrateEmail = () => {
  const { mutate, isPending } = useGoogleIntegration();

  const onGmailConnect = () => {
    mutate(undefined, {
      onSuccess: (res) => {
        console.log('res', res);
        window.location.href = (res as any)?.url;
      },
    });
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="text-[24px] text-[#09090B] font-semibold">
        Integrate your email to continue
      </div>
      <div className="text-[16px] text-foreground">
        Connect your email account to send, receive, and automate follow-ups
        seamlessly.
      </div>
      <div className="flex justify-between gap-5">
        <IntegrationOption
          title="Gmail"
          logo="gmail.svg"
          description="Send follow-ups, receive vendor replies, and track PO responses automatically."
          onConnect={onGmailConnect}
          loading={isPending}
        />
        <IntegrationOption
          title="Outlook"
          logo="outlook.svg"
          description="Send follow-ups, receive vendor replies, and track PO responses automatically."
          onConnect={() => null}
          loading={false}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <Info size={16} />
        <span>
          We only read vendor replies related to your POs. We never send emails
          without your approval.
        </span>
      </div>
    </div>
  );
};
