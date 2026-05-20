import { z } from 'zod';

const vendorModeSchema = z.enum(['select', 'manual']);

/** DNS hostname: ASCII labels + TLD (e.g. example.com, sub.vendor.co.uk). No scheme, path, or port. */
const SITE_DOMAIN_REGEX =
  /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;

function isOptionalStrictSiteDomain(val: string): boolean {
  const t = val.trim();
  if (t.length === 0) return true;
  if (t.length > 253) return false;
  return SITE_DOMAIN_REGEX.test(t);
}

export const lineItemSchema = z.object({
  lineItem: z.string().min(1, 'Line Item name is required'),
  quantity: z.coerce.number().min(1, 'Quantity is required'),
  unitCost: z.coerce.number().min(0.01, 'Unit Cost is required'),
  dueDate: z.string().min(1, 'Due Date is required'),
});

export const manualPurchaseOrderSchema = z
  .object({
    poNumber: z.string().min(1, 'PO Number is required'),
    orderDate: z.string().min(1, 'Order Date is required'),
    site: z.string().refine(isOptionalStrictSiteDomain, {
      message: 'Enter a valid domain (e.g. example.com)',
    }),
    buyer: z.string(),
    account: z.string(),
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
