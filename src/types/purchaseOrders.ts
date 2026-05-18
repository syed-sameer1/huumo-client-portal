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
  CLOSED = 'closed',
}

export type PurchaseOrderRawData = {
  site?: string;
  items?: {
    lineItem: string;
    quantity: number;
    unitCost: number | null;
  }[];
  dueDate?: string;
  poNumber?: string;
  orderDate?: string;
  vendorName?: string;
};

export type PurchaseOrderVendor = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  status: string;
  confirmationRate: number;
  totalSpend: number;
  performanceScore: number;
  riskLevel: string;
};

export type PurchaseOrderClientSettings = {
  id: number;
  createdAt: string;
  updatedAt: string;
  followup1FrequencyDays: number;
  followup2FrequencyDays: number;
  followup3FrequencyDays: number;
};

export type PurchaseOrderClient = {
  id: number;
  createdAt: string;
  updatedAt: string;
  stripeCustomerId: string;
  name: string;
  email: string;
  companyName: string;
  status: string;
  settings: PurchaseOrderClientSettings;
};

export type PurchaseOrderUser = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  status: string;
  role: string;
  refreshTokenHash: string | null;
  refreshTokenExpiresAt: string | null;
  gmailConnected: boolean;
  googleSheetConnected: boolean;
  client: PurchaseOrderClient;
};

export type PurchaseOrderFollowup = {
  id: number;
  emailTemplate: {
    body: string;
    createdAt: string;
    metaData: string;
    name: string;
    subject: string;
    type: string;
    updatedAt: string;
  };
  followUpNumber: number;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
  sentAt: string | null;
  status: string;
};

export type PurchaseOrderDetail = {
  id: number;
  createdAt: string;
  updatedAt: string;
  poNumber: string;
  orderDate: string;
  site?: string | null;
  dueDate: string;
  status: POStatus;
  rawData: PurchaseOrderRawData;
  followupCount: number;
  nextActionAt: string | null;
  lastActionAt: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  lastFollowupSentAt: string | null;
  followupsCreated: boolean;
  items: POLineItems[];
  vendor: PurchaseOrderVendor;
  user: PurchaseOrderUser;
  followups: PurchaseOrderFollowup[];
  overdueBy: number;
};

export type PurchaseOrdersDetailsResponse = {
  purchaseOrder: PurchaseOrderDetail;
};
