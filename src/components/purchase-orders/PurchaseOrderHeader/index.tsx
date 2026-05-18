import { PurchaseOrdersActionHeader } from './PurchaseOrdersActionHeader';
import { PurchaseOrderBanner } from './PurchaseOrderBanner';

export const PurchaseOrderHeader = () => {
  return (
    <div className="space-y-4">
      <PurchaseOrdersActionHeader />
      <div className="text-muted-foreground text-sm">
        HUUMO automatically follows up on unacknowledged POs using the rules and
        templates you define.
      </div>
      <PurchaseOrderBanner />
    </div>
  );
};
