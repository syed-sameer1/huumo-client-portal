import { SubscriptionType } from './subscription';

export enum ClientStatus {
  pending = 'pending',

  active = 'active',

  inActive = 'inActive',
}

export enum UserStatus {
  pending = 'pending',

  active = 'active',

  inActive = 'inActive',
}

export enum UserRole {
  owner = 'owner',

  admin = 'admin',

  member = 'member',
}

export type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  status: UserStatus;
  role: string;
  refreshTokenHash: null;
  refreshTokenExpiresAt: null;
  is_active: boolean;
  googleSheetConnected: boolean;
  microsoftSheetConnected: boolean;
  client: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    email: string;
    companyName: string;
    website: string;
    country: string;
    state: string;
    city: string;
    status: ClientStatus;
    stripCustomerId: string;
    subscriptionId: string;
    subscriptionStatus: SubscriptionType;
    activePoCount: number;
  };
};
