import { z } from 'zod';

export const automationFrequencySchema = z.object({
  required: z.object({
    followup1FrequencyDays: z.string().min(1),
    followup2FrequencyDays: z.string().min(1),
    followup3FrequencyDays: z.string().min(1),
  }),
});
