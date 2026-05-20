import { urls } from '@/constants/urls';
import type {
  EmailTemplateDetailResponse,
  EmailTemplatesResponse,
  UpdateEmailTemplatePayload,
} from '@/types/emailTemplate';
import { api } from '../api';
import { AxiosResponse } from 'axios';

export const getEmailTemplates = (): Promise<
  AxiosResponse<EmailTemplatesResponse>
> => {
  return api.get(urls.emailTemplates);
};

export const getEmailTemplate = (
  id: string,
): Promise<AxiosResponse<EmailTemplateDetailResponse>> => {
  const path = urls.emailTemplate.replace('{id}', id);
  return api.get(path);
};

export const updateEmailTemplate = (
  payload: UpdateEmailTemplatePayload,
): Promise<AxiosResponse<EmailTemplateDetailResponse>> => {
  return api.patch(urls.emailTemplates, payload);
};

export type SendTestEmailPayload = {
  templateId: string;
  email: string;
};

export const sendTestEmail = ({
  templateId,
  email,
}: SendTestEmailPayload): Promise<AxiosResponse<unknown>> => {
  const path = urls.sendTestEmail.replace('{templateId}', templateId);
  return api.post(path, { email });
};
