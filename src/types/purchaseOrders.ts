export type PurchaseOrders = {
  id: number;
  poNumber: string;
  vendor: string;
  email: string | null;
  quantity: number;
  poValue: string;
  orderDate: string;
  status: POStatus;
};

export enum POStatus {
  ACKNOWLEDGE = 'acknowledge',
  REVIEW = 'review',
  FOLLOW_UP = 'follow-up',
  OVER_DUE = 'overdue',
  ESCALATED = 'escalated',
}
