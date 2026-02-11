import {
  activateClient,
  updateFollowUpFrequency,
} from '@/service/client/client';
import { useApiMutation } from './query';

export const useClientActivate = (options?: any) => {
  return useApiMutation(activateClient, options);
};

export const useClientUpdateFrequency = (options?: any) => {
  return useApiMutation(updateFollowUpFrequency, options);
};
