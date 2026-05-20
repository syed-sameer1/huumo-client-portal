/** Known template `type` values from GET /email-template */
export const EMAIL_TEMPLATE_TYPES = {
  followUp1: 'followUp1',
  followUp2: 'followUp2',
  followUp3: 'followUp3',
  acknowledgement: 'acknowledgement',
} as const;

export type EmailTemplateType =
  | (typeof EMAIL_TEMPLATE_TYPES)[keyof typeof EMAIL_TEMPLATE_TYPES]
  | string;

export interface EmailTemplate {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  type: EmailTemplateType;
  subject: string;
  body: string;
  metaData: string;
  followUpFrequency: string;
}

export interface EmailTemplatesResponse {
  templates: EmailTemplate[];
}

export interface EmailTemplateDetailResponse {
  template: EmailTemplate;
}

export interface UpdateEmailTemplatePayload {
  id: number;
  name: string;
  body: string;
  subject: string;
  metaData: string;
}

export function formatEmailTemplateTypeLabel(type: string): string {
  const match = /^followUp(\d+)$/i.exec(type);
  if (match) return `Follow-up ${match[1]}`;
  if (type.toLowerCase().includes('ack')) return 'Acknowledgement';
  return type;
}
