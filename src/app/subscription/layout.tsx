import Image from 'next/image';
import { ReactNode } from 'react';

export default function SubscriptionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <div className="border-b border-border py-4 flex justify-center">
        <Image
          src="/images/subscription/huumo-subscription.svg"
          alt="subscription"
          width={242}
          height={73}
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
