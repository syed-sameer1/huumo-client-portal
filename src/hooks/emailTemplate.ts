import { sendTestEmail } from '@/service/emailTemplate';
import { useApiMutation } from './query';

export const useSendTestEmail = (options?: any) => {
  return useApiMutation(sendTestEmail, options);
};
