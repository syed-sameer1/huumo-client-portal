export interface TemplateRow {
  id: string;
  name: string;
  type: string;
  followUpFrequency: string;
  updatedAt: string;
}

export type {
  EmailTemplate,
  EmailTemplatesResponse,
} from '@/types/emailTemplate';
