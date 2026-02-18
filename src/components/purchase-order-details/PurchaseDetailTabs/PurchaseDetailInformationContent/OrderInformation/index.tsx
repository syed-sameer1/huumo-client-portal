import { BoxIcon } from 'lucide-react';
import { DetailsContentWrapper } from '../DetailsContentWrapper';
import { POLineItems } from './POLineItems';

export const OrderInformationContainer = () => {
  return (
    <DetailsContentWrapper title="Order Information" Icon={BoxIcon}>
      <POLineItems />
    </DetailsContentWrapper>
  );
};
