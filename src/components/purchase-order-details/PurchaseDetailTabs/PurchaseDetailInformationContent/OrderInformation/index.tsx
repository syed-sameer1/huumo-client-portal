import { BoxIcon } from 'lucide-react';
import { mockData } from '../../../mockData';
import { OrderInformationCard } from './OrderInformationCard';
import { OrderInformationConfig } from './orderInformationConfig';
import { DetailsContentWrapper } from '../DetailsContentWrapper';
import { POLineItems } from './POLineItems';

export const OrderInformationContainer = () => {
  return (
    <DetailsContentWrapper title="Order Information" Icon={BoxIcon}>
      <div className="grid grid-cols-5 gap-4">
        {Object.entries(OrderInformationConfig).map(([key]) =>
          OrderInformationConfig[key] ? (
            <OrderInformationCard key={key} id={key} value={mockData[key]} />
          ) : null,
        )}
      </div>
      <POLineItems />
    </DetailsContentWrapper>
  );
};
