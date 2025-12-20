import { SubscriptionType } from '@/types/subscription';
import { UserStatus } from '@/types/user';

export interface AuthResponse {
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    status: string;
    role: string;
    refreshTokenHash: null;
    refreshTokenExpiresAt: null;
    is_active: true;
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
      status: UserStatus;
      stripCustomerId: string;
      subscriptionId: string;
      subscriptionStatus: SubscriptionType;
      activePoCount: number;
    };
  };
  accessToken: string;
}
