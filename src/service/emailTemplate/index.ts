import { urls } from '@/constants/urls';
import { api } from '../api';
import { AxiosResponse } from 'axios';

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
