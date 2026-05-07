import { POStatus } from '@/types/purchaseOrders';

export interface PurchaseOrderData {
  id: number;
  poNumber: string;
  vendor: string;
  hasEmail: boolean;
  quantity: number;
  poValue: string;
  orderDate: string;
  status: POStatus;
}
