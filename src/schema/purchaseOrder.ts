import { z } from 'zod';

const vendorModeSchema = z.enum(['select', 'manual']);

export const lineItemSchema = z.object({
  lineItem: z.string().min(1, 'Line Item name is required'),
  quantity: z.coerce.number().min(1, 'Quantity is required'),
  unitCost: z.coerce.number().min(0.01, 'Unit Cost is required'),
});

export const manualPurchaseOrderSchema = z
  .object({
    poNumber: z.string().min(1, 'PO Number is required'),
    orderDate: z.string().min(1, 'Order Date is required'),
    dueDate: z.string().optional(),
    vendorMode: vendorModeSchema,
    vendorId: z.string().optional(),
    vendorName: z.string().optional(),
    vendorEmail: z.string().optional(),
    items: z.array(lineItemSchema).min(1, 'Add at least one line item'),
  })
  .superRefine((val, ctx) => {
    if (val.vendorMode === 'select') {
      if (!val.vendorId) {
        ctx.addIssue({
          code: 'custom',
          path: ['vendorId'],
          message: 'Vendor is required',
        });
      }
      return;
    }

    // manual
    if (!val.vendorName || val.vendorName.trim().length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['vendorName'],
        message: 'Vendor Name is required',
      });
    }
    if (!val.vendorEmail || val.vendorEmail.trim().length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['vendorEmail'],
        message: 'Vendor Email is required',
      });
    } else {
      const emailResult = z.string().email().safeParse(val.vendorEmail);
      if (!emailResult.success) {
        ctx.addIssue({
          code: 'custom',
          path: ['vendorEmail'],
          message: 'Please enter a valid email',
        });
      }
    }
  });

export type ManualPurchaseOrderFormValues = z.infer<
  typeof manualPurchaseOrderSchema
>;
export type LineItemValues = z.infer<typeof lineItemSchema>;

export type ManualPurchaseOrderValues = Omit<
  z.infer<typeof manualPurchaseOrderSchema>,
  'vendorMode' | 'vendorId'
> & {
  vendorId?: number;
};
