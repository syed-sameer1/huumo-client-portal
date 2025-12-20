import { SubscriptionPackages } from '@/components/subscription/Packages';
import { SubscriptionTab } from '@/components/subscription/SubscriptionTab';

export default function SubscriptionPage() {
  return (
    <div className="space-[32px] py-10  flex flex-col items-center space-y-8">
      <div className="text-[36px] font-bold">
        Find the pricing plan that fits your organization
      </div>
      <SubscriptionTab />
      <SubscriptionPackages />
    </div>
  );
}
