import * as z from 'zod';

export const addRoleSchema = z.object({
  // Required string, minimum 2 characters to avoid single-letter typos
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .min(2, { message: 'Name must be at least 2 characters' }),

  // Built-in email validation (checks for @ and domain)
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),

  // Enforces selecting one of the two specific options
  role: z.enum(['admin', 'member'], {
    message: 'Please select a role',
  }),
});

// This type helps with TypeScript intellisense in your components
export type AddRoleFormValues = z.infer<typeof addRoleSchema>;
