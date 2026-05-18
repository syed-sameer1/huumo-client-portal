import { z } from 'zod';

const requiredNumber = z
  .union([z.number(), z.undefined()])
  .refine((val) => typeof val === 'number' && val >= 1, {
    message: 'Required',
  });

export const followUpFrequencySchema = z.object({
  followup1FrequencyDays: requiredNumber,
  followup2FrequencyDays: requiredNumber,
  followup3FrequencyDays: requiredNumber,
  /** 0–100; sent as `aiConfidenceThreshold` in the update payload */
  aiConfidenceThreshold: z
    .number()
    .min(0, { message: 'Must be at least 0' })
    .max(100, { message: 'Must be at most 100' }),
});
