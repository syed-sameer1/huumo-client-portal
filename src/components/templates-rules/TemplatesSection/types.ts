export interface TemplateRow {
  id: string;
  name: string;
  /** Raw API type, e.g. `followUp1` */
  typeKey: string;
  /** Display label, e.g. `Follow-up 1` */
  type: string;
  updatedAt: string;
}

export type {
  EmailTemplate,
  EmailTemplatesResponse,
} from '@/types/emailTemplate';
