'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SetRulesModal } from '../SetRulesModal';

export const SetRulesButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-md h-10 bg-[#516C6E] w-37.5 text-[14px]"
      >
        Set Rules
      </Button>
      <SetRulesModal open={isOpen} onClose={onClose} />
    </>
  );
};
