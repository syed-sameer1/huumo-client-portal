import { z } from 'zod';

export const columnMappingSchema = z.object({
  required: z.object({
    poNumber: z.string().min(1),
    orderDate: z.string().min(1, { message: 'Please enter Date' }),
    vendorName: z.string().min(1, { message: 'Please enter Vendor' }),
  }),
  additional: z.record(z.string(), z.string()),
});

export const addFieldSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sample: z.string().min(1, 'Sample is required'),
});

export type AddFieldValues = z.infer<typeof addFieldSchema>;

export type MappingFormValues = z.infer<typeof columnMappingSchema>;

export const vendorColumnMappingSchema = z.object({
  vendorEmail: z.string().min(1, { message: 'Please enter Vendor Email' }),
  vendorName: z.string().min(1, { message: 'Please enter Vendor Name' }),
});

export type MappingVendorFormValues = z.infer<typeof vendorColumnMappingSchema>;
