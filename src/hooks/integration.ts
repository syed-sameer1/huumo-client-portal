import { gmailIntegration } from '@/service/integration/integration';
import { useApiMutation } from './query';

export const useGoogleIntegration = (options?: any) => {
  return useApiMutation(gmailIntegration, options);
};
