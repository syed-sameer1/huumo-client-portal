import { ProfileDropdown } from '@/components/layout/Header/ProfileDropdown';
import { Onboarding } from '@/components/onboarding';
import Image from 'next/image';
import { Suspense } from 'react';

export default function OnboardingPage() {
  return (
    <div>
      <div className="flex items-center py-4 px-8 h-20.5 bg-background-primary-light border-b justify-between">
        <Image
          alt="huumo"
          src="/images/subscription/huumo-subscription.svg"
          width={166}
          height={50}
        />
        <ProfileDropdown />
      </div>
      <Suspense>
        <Onboarding />
      </Suspense>
    </div>
  );
}
