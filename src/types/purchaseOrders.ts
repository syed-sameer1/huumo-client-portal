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
  items: {
    confirmedQuantity: string;
    createdAt: string;
    id: number;
    lineItem: string;
    pendingQuantity: string;
    quantity: string;
    unitCost: string;
    updatedAt: string;
  };
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
