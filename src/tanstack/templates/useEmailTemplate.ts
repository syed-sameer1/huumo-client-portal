import { getEmailTemplate } from '@/service/emailTemplate';
import { useApiQuery } from '@/hooks/query';
import { emailTemplateKeys } from './keys';

export const useEmailTemplate = (templateId: string) => {
  return useApiQuery({
    queryKey: emailTemplateKeys.detail(templateId),
    queryFn: async () => {
      const res = await getEmailTemplate(templateId);
      return res.data;
    },
    enabled: Boolean(templateId),
  });
};
