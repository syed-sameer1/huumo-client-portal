'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SendEmailDialog } from './SendEmailDialog';

interface ActionButtonsProps {
  templateId: string;
}

export const ActionButtons = ({ templateId }: ActionButtonsProps) => {
  const [sendTestModalOpen, setSendTestModalOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setSendTestModalOpen(open);
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <Button variant="secondary" asChild>
          <Link href={`/templates-rules/edit/${templateId}`}>
            Edit Template
          </Link>
        </Button>
        <Button onClick={() => setSendTestModalOpen(true)}>
          Send Test Email
        </Button>
      </div>
      <SendEmailDialog
        open={sendTestModalOpen}
        onOpenChange={handleOpenChange}
        templateId={templateId}
      />
    </>
  );
};
