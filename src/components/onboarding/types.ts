import { followUpFrequencySchema } from '@/schema/followUpFrequencySchema';
import * as z from 'zod';

export type FollowUpFrequencyFormValues = z.infer<
  typeof followUpFrequencySchema
>;
