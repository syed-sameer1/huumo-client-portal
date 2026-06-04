import { formatDate } from '@/lib/date';
import type { EmailTemplate } from '@/types/emailTemplate';
import { formatEmailTemplateTypeLabel } from '@/types/emailTemplate';
import type { TemplateRow } from './types';

export type FollowUpFrequencySettings = {
  followup1FrequencyDays?: number;
  followup2FrequencyDays?: number;
  followup3FrequencyDays?: number;
};

const TYPE_TO_FREQUENCY_KEY: Record<string, keyof FollowUpFrequencySettings> = {
  followUp1: 'followup1FrequencyDays',
  followUp2: 'followup2FrequencyDays',
  followUp3: 'followup3FrequencyDays',
};

export function getFollowUpFrequencyLabel(
  typeKey: string,
  settings?: FollowUpFrequencySettings | null,
): string {
  const frequencyKey = TYPE_TO_FREQUENCY_KEY[typeKey];
  if (!frequencyKey || !settings) return '—';

  const days = settings[frequencyKey];
  if (days === undefined || days === null) return '—';

  return `${days}`;
}

export function emailTemplateToRow(template: EmailTemplate): TemplateRow {
  return {
    id: String(template.id),
    name: template.name,
    typeKey: template.type,
    type: formatEmailTemplateTypeLabel(template.type),
    updatedAt: formatDate(template.updatedAt, 'M/d/yy'),
  };
}
