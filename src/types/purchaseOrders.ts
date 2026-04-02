import { POLineItems } from '@/components/po-line-items-table/types';

export type PurchaseOrdersResponse = {
  purchaseOrders: PurchaseOrders[];
  totalPurchaseOrders: number;
};

export type PurchaseOrders = {
  createdAt: string;
  dueDate: string;
  dueIn: string;
  lastUpdate: string;
  overdueBy: string | null;
  id: number;
  orderDate: string;
  poNumber: string;
  poValue: number;
  quantity: number;
  site?: string | null;
  status: POStatus;
  vendorEmail: string | null;
  vendorId: number;
  vendorName: string;
  items: POLineItems[];
};

export enum POStatus {
  ACKNOWLEDGE = 'acknowledge',
  REVIEW = 'review',
  FOLLOW_UP = 'follow-up',
  OVER_DUE = 'overdue',
  ESCALATED = 'escalated',
  CREATED = 'created',
}
