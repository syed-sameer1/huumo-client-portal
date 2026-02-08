'use client';

import { useState } from 'react';
import OnBoardingStepper from './OnBoardingStepper';
import { WelcomeHuumoModal } from './WelcomeHuumoModal';

export const Onboarding = () => {
  const [open, setShowModal] = useState(true);

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="pt-20">
        <OnBoardingStepper />
      </div>
      <WelcomeHuumoModal onClose={onClose} open={open} />
    </>
  );
};
