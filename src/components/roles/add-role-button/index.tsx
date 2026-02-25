'use client';

import { Button } from '@/components/ui/button';
import { AddRoleModal } from '../add-role-modal';
import { useState } from 'react';

export const AddRoleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-background-secondary"
      >
        Add Role
      </Button>
      <AddRoleModal open={isOpen} onClose={onClose} />
    </>
  );
};
