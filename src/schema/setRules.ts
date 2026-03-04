import * as z from 'zod';

export const setRulesSchema = z.object({
  followUp1FrequencyDays: z.coerce
    .number()
    .min(1, { message: 'Please select a value' })
    .max(5),

  followUp2FrequencyDays: z.coerce
    .number()
    .min(1, { message: 'Please select a value' })
    .max(5),

  finalReminderFrequencyDays: z.coerce
    .number()
    .min(1, { message: 'Please select a value' })
    .max(5),

  aiConfidenceThreshold: z.coerce
    .number()
    .min(0, { message: 'Minimum is 0' })
    .max(100, { message: 'Maximum is 100' }),
});

export type SetRulesFormValues = z.infer<typeof setRulesSchema>;
