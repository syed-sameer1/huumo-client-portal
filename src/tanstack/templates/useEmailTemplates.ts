import { getEmailTemplates } from '@/service/emailTemplate';
import { useApiQuery } from '@/hooks/query';
import { emailTemplateKeys } from './keys';

export const useEmailTemplates = () => {
  return useApiQuery({
    queryKey: emailTemplateKeys.list(),
    queryFn: async () => {
      const res = await getEmailTemplates();
      return res.data;
    },
  });
};
