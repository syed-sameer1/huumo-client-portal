export const getPOLineItemsBreadcrumbs = (id: string) => [
  {
    href: '/purchase-orders',
    label: 'Purchase Orders',
  },
  {
    href: `/purchase-orders/${id}`,
    label: 'Purchase Order Details',
  },
  {
    href: `/purchase-orders/${id}/po-line-items`,
    label: 'PO Line Items',
  },
];
