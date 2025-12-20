import { packagesMockData } from '../mockData';
import { Package } from './Package';

export const SubscriptionPackages = () => {
  return (
    <div className="flex flex-row justify-center gap-8">
      {packagesMockData.map((subscriptionPackage) => (
        <Package
          key={subscriptionPackage.id}
          subscriptionPackage={subscriptionPackage}
        />
      ))}
    </div>
  );
};
