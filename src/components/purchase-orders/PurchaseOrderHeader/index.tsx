import { PurchaseOrdersActionHeader } from './PurchaseOrdersActionHeader';
import { PurchaseOrderBanner } from './PurchaseOrderBanner';

type PurchaseOrderHeaderProps = {
  onApplyOverdueFilter?: () => void;
};

export const PurchaseOrderHeader = ({
  onApplyOverdueFilter,
}: PurchaseOrderHeaderProps) => {
  return (
    <div className="space-y-4">
      <PurchaseOrdersActionHeader />
      <div className="text-muted-foreground text-sm">
        HUUMO automatically follows up on unacknowledged POs using the rules and
        templates you define.
      </div>
      <PurchaseOrderBanner onApplyOverdueFilter={onApplyOverdueFilter} />
    </div>
  );
};
