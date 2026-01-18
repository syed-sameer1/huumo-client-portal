import { formatDate } from '@/lib/date';
import {
  BookUserIcon,
  BoxIcon,
  CalendarIcon,
  DollarSignIcon,
  HandCoinsIcon,
} from 'lucide-react';

export const OrderInformationConfig = {
  poNumber: {
    title: 'PO Number',
    Icon: BookUserIcon,
    formatter: (value: any) => value,
  },
  unitCost: {
    title: 'Unit Cost',
    Icon: DollarSignIcon,
    formatter: (value: number) => value.toLocaleString(),
  },
  quantity: {
    title: 'Quantity',
    Icon: HandCoinsIcon,
    formatter: (value: number) => value,
  },
  orderedAt: {
    title: 'Order Date',
    Icon: CalendarIcon,
    formatter: (value: string) => formatDate(value),
  },
  dueDate: {
    title: 'Due Date',
    Icon: CalendarIcon,
    formatter: (value: string) => formatDate(value),
  },
};
