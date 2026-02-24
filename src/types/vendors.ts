export type VendorData = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: null | string;
  totalSpend: string;
  confirmationRate: string;
  performanceScore: number;
  riskLevel: RISK_LEVEL;
};

export interface VendorsDataResponse {
  vendors: VendorData[];
  totalVendors: number;
  pagination: { totalPages: number };
}

export enum RISK_LEVEL {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

type VendorDetailsType = {
  createdAt: string;
  email: null | null;
  id: number;
  name: string;
  updatedAt: string;
};

export interface VendorDetailsRespone {
  vendor: VendorDetailsType;
}
