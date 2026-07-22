import { updateEmailTemplate } from '@/service/emailTemplate';
import { useApiMutation } from '@/hooks/query';
import type { MutationOptions } from '@/types/query';
import type { UpdateEmailTemplatePayload } from '@/types/emailTemplate';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/hooks/auth';
import type { EmailTemplateDetailResponse } from '@/types/emailTemplate';

export const useUpdateEmailTemplate = (
  options?: MutationOptions<
    EmailTemplateDetailResponse,
    AxiosError<ApiErrorResponse>,
    UpdateEmailTemplatePayload
  >,
) => {
  return useApiMutation(updateEmailTemplate, options);
};
