import type { FollowUpFrequencyFormValues } from '@/components/onboarding/types';

export type ClientSettingsData = {
  followup1FrequencyDays?: number;
  followup2FrequencyDays?: number;
  followup3FrequencyDays?: number;
  aiConfidenceThreshold?: number;
};

type ClientSettingsApiBody = ClientSettingsData & {
  settings?: ClientSettingsData;
};

/** Axios query result from `useClientSettings` → nested `data.settings`. */
export function getClientSettingsFromQueryData(
  queryData: unknown,
): ClientSettingsData | undefined {
  const body = (queryData as { data?: ClientSettingsApiBody } | undefined)
    ?.data;
  if (!body) return undefined;
  return body.settings ?? body;
}

function frequencyDayOrDefault(value: number | undefined): number {
  return typeof value === 'number' && value >= 1 ? value : 1;
}

export function followUpFrequencyFormDefaults(
  settings?: ClientSettingsData | null,
): FollowUpFrequencyFormValues {
  return {
    followup1FrequencyDays: frequencyDayOrDefault(
      settings?.followup1FrequencyDays,
    ),
    followup2FrequencyDays: frequencyDayOrDefault(
      settings?.followup2FrequencyDays,
    ),
    followup3FrequencyDays: frequencyDayOrDefault(
      settings?.followup3FrequencyDays,
    ),
    aiConfidenceThreshold:
      typeof settings?.aiConfidenceThreshold === 'number'
        ? settings.aiConfidenceThreshold
        : 0,
  };
}
