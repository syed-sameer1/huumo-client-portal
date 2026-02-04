import { z } from 'zod';

export const addVendorSchema = z.object({
  vendorName: z.string().min(1, 'Vendor name is required'),
  email: z.email({ message: 'Invalid email address' }),
});

export type AddVendorFieldValues = z.infer<typeof addVendorSchema>;
