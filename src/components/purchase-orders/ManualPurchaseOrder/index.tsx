'use client';

import { useMemo, useState } from 'react';
import {
  useFieldArray,
  useForm,
  useWatch,
  type Resolver,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useVendorsData } from '@/hooks/vendors';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { DatePicker } from '@/components/form-inputs/date-picker';
import {
  lineItemSchema,
  LineItemValues,
  manualPurchaseOrderSchema,
} from '@/schema/purchaseOrder';
import { ManualPurchaseOrderFormValues } from '@/schema/purchaseOrder';
import { useCreatePurchaseOrder } from '@/hooks/purchaseOrders';
import { LoadingButton } from '@/components/LoadingButton';
import { useRouter } from 'next/navigation';
import { routeUrls } from '@/constants/urls';

export const ManualPurchaseOrder = () => {
  const { data, isLoading } = useVendorsData(1);
  const vendorOptions = useMemo(() => data?.vendors ?? [], [data?.vendors]);
  const [lineItemModalOpen, setLineItemModalOpen] = useState(false);
  const [vendorSearchOpen, setVendorSearchOpen] = useState(false);
  const [vendorSearch, setVendorSearch] = useState('');
  const { mutate, isPending } = useCreatePurchaseOrder();
  const router = useRouter();

  const form = useForm<ManualPurchaseOrderFormValues>({
    resolver: zodResolver(
      manualPurchaseOrderSchema,
    ) as Resolver<ManualPurchaseOrderFormValues>,
    defaultValues: {
      poNumber: '',
      orderDate: '',
      site: '',
      buyer: '',
      account: '',
      vendorMode: 'select',
      vendorId: undefined,
      vendorName: '',
      vendorEmail: '',
      items: [],
    },
  });

  const vendorMode = useWatch({ control: form.control, name: 'vendorMode' });
  const selectedVendorId = useWatch({
    control: form.control,
    name: 'vendorId',
  });

  const filteredVendors = useMemo(() => {
    const q = vendorSearch.trim().toLowerCase();
    if (!q) return vendorOptions;
    return vendorOptions.filter((v) => v.vendorName.toLowerCase().includes(q));
  }, [vendorOptions, vendorSearch]);

  const lineItemForm = useForm<LineItemValues>({
    resolver: zodResolver(lineItemSchema) as Resolver<LineItemValues>,
    defaultValues: { lineItem: '', quantity: 1, unitCost: 1, dueDate: '' },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const toMMDDYYYY = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-');
    return `${m}/${d}/${y}`;
  };

  const onSubmit = (values: ManualPurchaseOrderFormValues) => {
    const orderDate = toMMDDYYYY(values.orderDate);
    const items = values.items.map((item) => ({
      ...item,
      dueDate: toMMDDYYYY(item.dueDate),
    }));

    const siteTrimmed = values.site.trim();
    const sitePayload = siteTrimmed ? { site: siteTrimmed } : {};
    const buyer = values.buyer;
    const buyerPayload = buyer ? { buyer } : {};
    const account = values.account;
    const accountPayload = account ? { account } : {};
    const optionalFields = {
      ...sitePayload,
      ...buyerPayload,
      ...accountPayload,
    };

    const payload =
      values.vendorMode === 'select'
        ? {
            poNumber: values.poNumber,
            orderDate,
            ...optionalFields,
            vendorId: Number(values.vendorId),
            items,
          }
        : {
            poNumber: values.poNumber,
            orderDate,
            ...optionalFields,
            vendorName: values.vendorName?.trim(),
            vendorEmail: values.vendorEmail?.trim(),
            items,
          };

    mutate(payload as any, {
      onSuccess: () => {
        toast.success('Manual purchase order created successfully');
        router.push(routeUrls.purchaseOrdersRoute);
      },
      onError: (error) => {
        toast.error(error.response?.data.message);
      },
    });
  };

  const onBack = () => {
    router.push(routeUrls.purchaseOrdersRoute);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-[20px] font-semibold">Add PO</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="poNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium mb-3 block">
                      PO Number <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="PO1095" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="orderDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium mb-3 block">
                      Order Date <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(d) => {
                          field.onChange(d ? d.toISOString().slice(0, 10) : '');
                        }}
                        placeholder="mm/dd/yyyy"
                        format="short"
                        inputClassName="h-11 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="site"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium mb-3 block">
                      Site
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example.com"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="buyer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium mb-3 block">
                      Buyer (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Buyer name"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium mb-3 block">
                      Account (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Account name"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3">
              <div className="font-medium">
                Vendor <span className="text-destructive">*</span>
              </div>

              <FormField
                control={form.control}
                name="vendorMode"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={(v) => {
                          field.onChange(v);
                          if (v === 'select') {
                            form.setValue('vendorName', '');
                            form.setValue('vendorEmail', '');
                          } else {
                            form.setValue('vendorId', undefined);
                          }
                        }}
                        className="gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="select"
                            id="vendor-select"
                            className="h-5 w-5 border-2  border-[#A1A1AA] [&_svg]:fill-[#20A665] [&_svg]:text-[#20A665] [&_svg]:w-[12px]"
                          />
                          <Label htmlFor="vendor-select" className="text-sm">
                            Choose from vendor list
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="manual"
                            id="vendor-manual"
                            className="h-5 w-5 border-2  border-[#A1A1AA] [&_svg]:fill-[#20A665] [&_svg]:text-[#20A665] [&_svg]:w-[12px]"
                          />
                          <Label htmlFor="vendor-manual" className="text-sm">
                            Add vendor manually
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {vendorMode === 'select' ? (
                <FormField
                  control={form.control}
                  name="vendorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover
                          open={vendorSearchOpen}
                          onOpenChange={(open) => {
                            setVendorSearchOpen(open);
                            if (!open) setVendorSearch('');
                          }}
                        >
                          <PopoverAnchor asChild>
                            <div className="relative w-full">
                              <PopoverTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="h-11 w-full justify-between font-normal"
                                  disabled={isLoading}
                                >
                                  <span className="truncate">
                                    {selectedVendorId
                                      ? (vendorOptions.find(
                                          (v) =>
                                            String(v.id) === selectedVendorId,
                                        )?.vendorName ?? 'Select vendor')
                                      : isLoading
                                        ? 'Loading vendors…'
                                        : 'Select vendor'}
                                  </span>
                                  <span className="text-muted-foreground">
                                    ▾
                                  </span>
                                </Button>
                              </PopoverTrigger>
                            </div>
                          </PopoverAnchor>
                          <PopoverContent
                            className="w-[var(--radix-popover-trigger-width)] p-2"
                            align="start"
                            side="bottom"
                            sideOffset={6}
                          >
                            <Input
                              value={vendorSearch}
                              onChange={(e) => setVendorSearch(e.target.value)}
                              placeholder="Search vendor…"
                              className="h-9"
                              autoFocus
                            />
                            <div className="mt-2 max-h-56 overflow-auto ">
                              {filteredVendors.length === 0 ? (
                                <div className="p-3 text-sm text-muted-foreground">
                                  No vendors found.
                                </div>
                              ) : (
                                filteredVendors.map((v) => (
                                  <button
                                    key={v.id}
                                    type="button"
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent"
                                    onClick={() => {
                                      field.onChange(String(v.id));
                                      setVendorSearchOpen(false);
                                      setVendorSearch('');
                                    }}
                                  >
                                    {v.vendorName}
                                  </button>
                                ))
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="vendorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium mb-3 block">
                          Vendor Name
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nvidia Corp"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vendorEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium mb-3 block">
                          Email Address{' '}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="nvidia@hotmail.com"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              className="text-background-secondary justify-start px-0 hover:bg-transparent"
              onClick={() => {
                lineItemForm.reset({
                  lineItem: '',
                  quantity: 1,
                  unitCost: 1,
                  dueDate: '',
                });
                setLineItemModalOpen(true);
              }}
            >
              + Add Line Item
            </Button>

            <div className="space-y-3">
              <div className="font-medium">Line Items</div>
              {form.formState.errors.items?.message && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {String(form.formState.errors.items.message)}
                </p>
              )}
              {fields.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No line items added yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {fields.map((li, idx) => (
                    <div
                      key={li.id}
                      className="flex items-center justify-between rounded-md border border-input p-3"
                    >
                      <div className="text-sm">
                        <div className="font-medium">{li.lineItem}</div>
                        <div className="text-muted-foreground">
                          Qty: {li.quantity} · Unit cost: {li.unitCost}
                          {li.dueDate
                            ? ` · Due: ${toMMDDYYYY(li.dueDate)}`
                            : ''}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => remove(idx)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-border p-6 flex justify-end">
            <LoadingButton
              type="submit"
              className="bg-background-secondary px-10 h-11"
              loading={isPending}
              disabled={isPending}
            >
              Add
            </LoadingButton>
          </div>
        </form>
      </Form>

      <Dialog open={lineItemModalOpen} onOpenChange={setLineItemModalOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Add Line Item</DialogTitle>
          </DialogHeader>
          <Form {...lineItemForm}>
            <form
              onSubmit={lineItemForm.handleSubmit((values) => {
                append(values);
                setLineItemModalOpen(false);
              })}
              className="space-y-4 pt-2"
            >
              <FormField
                control={lineItemForm.control}
                name="lineItem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium mb-3 block">
                      Line Item name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Plastic"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={lineItemForm.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium mb-3 block">
                      Due Date <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(d) => {
                          field.onChange(d ? d.toISOString().slice(0, 10) : '');
                        }}
                        placeholder="mm/dd/yyyy"
                        format="short"
                        inputClassName="h-11 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={lineItemForm.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium mb-3 block">
                        Quantity <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-11"
                          min={1}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={lineItemForm.control}
                  name="unitCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium mb-3 block">
                        Unit Cost <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-11"
                          min={0}
                          step={0.01}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setLineItemModalOpen(false)}
                  className="w-[100px]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-background-secondary w-[100px]"
                >
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
