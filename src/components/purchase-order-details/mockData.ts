import { POStatus } from '@/types/purchaseOrders';

export const mockData = {
  status: POStatus.ACKNOWLEDGE,
  poNumber: 'PO1120',
  vendor: 'ABC Supplier Ltd.',
  deliverDate: '2025-12-28T18:45:30Z',
  dueDate: '2025-12-28T18:45:30Z',
  lastFollowUpDate: '2025-12-20T10:30:00Z',
  vendorResponseDate: '2025-12-22T14:15:00Z',
  unitCost: '13702.63',
  quantity: 24,
  orderedAt: '2025-12-28T18:45:30Z',
  confirmedQuantity: 24,
  remainingQuantity: 24,
  lineItem: 'Plastic',
};
