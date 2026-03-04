'use client';

import { useState } from 'react';
import OnBoardingStepper from './OnBoardingStepper';
import { WelcomeHuumoModal } from './WelcomeHuumoModal';
import { useSearchParams } from 'next/navigation';

export const Onboarding = () => {
  const searchParams = useSearchParams();
  const gmailStatus = searchParams.get('gmail');

  const [open, setShowModal] = useState(gmailStatus ? false : true);

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
