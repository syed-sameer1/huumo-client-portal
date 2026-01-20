import { OrderInformationContainer } from './OrderInformation';
import { SystemInformation } from './SystemInformation';
import { VendorInformation } from './VendorInformation';

export const PurchaseDetailInformationContent = () => {
  return (
    <div className="space-y-5">
      <OrderInformationContainer />
      <div className="grid grid-cols-2 gap-5">
        <VendorInformation />
        <SystemInformation />
      </div>
    </div>
  );
};
