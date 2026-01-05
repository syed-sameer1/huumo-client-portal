import { Title } from '@/components/layout/Title';
import { ActionButtons } from '../../ActionButtons';

export const PurchaseOrdersActionHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <Title>Purchase Orders</Title>
      <ActionButtons />
    </div>
  );
};
