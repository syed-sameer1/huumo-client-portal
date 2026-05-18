import { useMemo, useState } from 'react';
import { usePurchaseOrderDetailsData } from '../../hooks/usePurchaseOrderDetailsData';
import { FollowUpBox } from './FollowUpBox';
import { Inbox } from './Inbox';
import { NoResultFound } from '@/components/no-results-found';

export const FollowUps = () => {
  const { data } = usePurchaseOrderDetailsData();

  const sortedFollowups = useMemo(
    () =>
      [...(data?.followups ?? [])].sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
      ),
    [data?.followups],
  );

  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    sortedFollowups[0]?.id ?? null,
  );
  const selectedFollowUp = sortedFollowups.find(
    (followup) => followup.id === selectedMessageId,
  );
  if (!data?.followups.length)
    return (
      <NoResultFound message="No follow-ups found" showDescription={false} />
    );

  return (
    <div className="flex gap-5">
      <Inbox
        selectedMessageId={selectedMessageId}
        setSelectedMessageId={setSelectedMessageId}
        followUps={sortedFollowups}
      />
      <FollowUpBox selectedFollowUp={selectedFollowUp} />
    </div>
  );
};
