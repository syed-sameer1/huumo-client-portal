import { useMemo, useState } from 'react';
import { usePurchaseOrderDetailsData } from '../../hooks/usePurchaseOrderDetailsData';
import { FollowUpBox } from './FollowUpBox';
import { Inbox } from './Inbox';

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
