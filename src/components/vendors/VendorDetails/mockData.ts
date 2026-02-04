import { POStatus } from '@/types/purchaseOrders';

export const mockData = [
  {
    id: 1,
    poNumber: 'INV001',
    poValue: 240,
    orderDate: '2025-12-28T18:45:30Z',
    status: POStatus.ACKNOWLEDGE,
  },
  {
    id: 2,
    poNumber: 'INV001',
    poValue: 600,
    orderDate: '2025-12-28T18:45:30Z',
    status: POStatus.REVIEW,
  },
  {
    id: 3,
    poNumber: 'INV001',
    poValue: 850,
    orderDate: '2025-12-28T18:45:30Z',
    status: POStatus.ACKNOWLEDGE,
  },
  {
    id: 4,
    poNumber: 'INV001',
    poValue: 240,
    orderDate: '2025-12-28T18:45:30Z',
    status: POStatus.REVIEW,
  },
];
