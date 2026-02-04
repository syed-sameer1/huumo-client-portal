export enum RISK_LEVEL {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export type VendorsData = {
  id: number;
  vendorName: string;
  email: null | string;
  totalSpend: number;
  confirmationRate: number;
  performanceScore: number;
  riskLevel: RISK_LEVEL;
};
