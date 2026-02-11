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
});
