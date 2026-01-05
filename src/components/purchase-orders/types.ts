export enum PurchaseOrderStatus {
  ACKNOWLEDGE = 'acknowledge',
  REVIEW = 'review',
  FOLLOW_UP = 'follow-up',
  OVER_DUE = 'overdue',
  ESCALATED = 'escalated',
}

export interface PurchaseOrderData {
  id: number;
  poNumber: string;
  vendor: string;
  hasEmail: boolean;
  quantity: number;
  poValue: string;
  orderDate: string;
  status: PurchaseOrderStatus;
}
