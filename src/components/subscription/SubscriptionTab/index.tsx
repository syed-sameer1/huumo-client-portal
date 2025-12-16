import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SubscriptionTab = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-100 h-[40]">
        <TabsList className="w-100">
          <TabsTrigger className="w-full" value="account">
            Monthly
          </TabsTrigger>
          <TabsTrigger className="w-full" value="password">
            Anually
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
