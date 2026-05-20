import { formatDate } from '@/lib/date';
import type { EmailTemplate } from '@/types/emailTemplate';
import { formatEmailTemplateTypeLabel } from '@/types/emailTemplate';
import type { TemplateRow } from './types';

export function emailTemplateToRow(template: EmailTemplate): TemplateRow {
  return {
    id: String(template.id),
    name: template.name,
    type: formatEmailTemplateTypeLabel(template.type),
    followUpFrequency: template.followUpFrequency || '—',
    updatedAt: formatDate(template.updatedAt, 'M/d/yy'),
  };
}
