import { PO_VALUES } from '../constants';
import { PurchaseOptionType } from '../types';

export interface POOptionsCardProps {
  purchaseOption: PurchaseOptionType;
  selectedPurchaseOption: PO_VALUES;
  onSelectPurchaseOption: (purchaseOption: PO_VALUES) => void;
}
