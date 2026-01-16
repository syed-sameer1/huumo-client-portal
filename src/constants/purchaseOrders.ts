import { POStatus } from '@/types/purchaseOrders';

export const PurchaseOrdersStatusConfigs = {
  [POStatus.ACKNOWLEDGE]: {
    label: 'Acknowledge',
    bgColor: '#DEFFDF',
    textColor: '#10834B',
  },
  [POStatus.ESCALATED]: {
    label: 'Escalated',
    bgColor: '#FFF5EF',
    textColor: '#CB4E00',
  },
  [POStatus.REVIEW]: {
    label: 'Needs Review',
    bgColor: '#FFF4D4',
    textColor: '#916E02',
  },
  [POStatus.FOLLOW_UP]: {
    label: 'Open Follow-Ups',
    bgColor: '#ECF1FF',
    textColor: '#2A5CDA',
  },
  [POStatus.OVER_DUE]: {
    label: 'Overdue',
    bgColor: '#FFEEEE',
    textColor: '#C94040',
  },
};
