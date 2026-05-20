'use client';

import { LoadingButton } from '@/components/LoadingButton';
import { useSendFollowUp } from '@/hooks/purchaseOrders';
import { toast } from 'sonner';

function messageFromFollowUpResponse(data: unknown): string {
  if (typeof data === 'string' && data.trim()) return data;
  if (data && typeof data === 'object' && 'message' in data) {
    const m = (data as { message: unknown }).message;
    if (typeof m === 'string' && m.trim()) return m;
  }
  return 'Follow-up sent.';
}

type SendFollowUpButtonProps = {
  poId: string;
};

export const SendFollowUpButton = ({ poId }: SendFollowUpButtonProps) => {
  const { mutate, isPending } = useSendFollowUp();

  const handleClick = () => {
    if (!poId) return;
    mutate(poId, {
      onSuccess: (res) => {
        toast.success(messageFromFollowUpResponse(res.data));
      },
      onError: (err) => {
        const raw = err.response?.data?.message;
        toast.error(
          typeof raw === 'string' && raw.trim()
            ? raw
            : 'Could not send follow-up. Try again.',
        );
      },
    });
  };

  return (
    <LoadingButton
      type="button"
      loading={isPending}
      disabled={!poId}
      className="rounded-md h-10 bg-background-secondary w-37.5 text-[14px]"
      onClick={handleClick}
    >
      Send Follow-Up
    </LoadingButton>
  );
};
