import { loginSchema } from '@/schema/authSchema';
import * as z from 'zod';

export type LoginFormValues = z.infer<typeof loginSchema>;
