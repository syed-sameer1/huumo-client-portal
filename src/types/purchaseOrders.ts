import { POLineItems } from '@/components/po-line-items-table/types';

export type PurchaseOrdersResponse = {
  purchaseOrders: PurchaseOrders[];
  totalPurchaseOrders: number;
};

export type PurchaseOrders = {
  createdAt: string;
  dueDate: string;
  id: number;
  orderDate: string;
  poNumber: string;
  status: POStatus;
  vendor: {
    createdAt: string;
    email: string | null;
    id: number;
    name: string;
    updatedAt: string;
    status: VendorStatus;
  };
  items: POLineItems[];
};

export enum POStatus {
  ACKNOWLEDGE = 'acknowledge',
  REVIEW = 'review',
  FOLLOW_UP = 'follow-up',
  OVER_DUE = 'overdue',
  ESCALATED = 'escalated',
}

enum VendorStatus {
  ACTIVE = 'active',
}
