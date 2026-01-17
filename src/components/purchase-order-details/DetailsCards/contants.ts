import { distanceFromNow, formatDate } from '@/lib/date';
import {
  BookUserIcon,
  CalendarIcon,
  MessageCircle,
  NotepadText,
  ScrollTextIcon,
} from 'lucide-react';

export const PurchaseDetailCardConfig = {
  poNumber: {
    title: 'PO Number',
    Icon: ScrollTextIcon,
    iconBg: '#DBF7FB',
    iconColor: '#048CA3',
    formatter: (value: string) => value,
  },
  vendor: {
    title: 'Vendor',
    Icon: BookUserIcon,
    iconBg: '#F8E2FF',
    iconColor: '#9925BD',
    formatter: (value: string) => value,
  },
  deliverDate: {
    title: 'Due In',
    Icon: CalendarIcon,
    iconBg: '#BD21C31A',
    iconColor: '#BD21C3',
    formatter: (value: string) => {
      console.log('value', value);
      return distanceFromNow(value);
    },
  },
  lastFollowUpDate: {
    title: 'Last Follow-Up Sent',
    Icon: NotepadText,
    iconBg: '#7CA6201A',
    iconColor: '#7CA620',
    formatter: (value: string) => formatDate(value),
  },
  vendorResponseDate: {
    title: 'Last Vendor Response',
    Icon: MessageCircle,
    iconBg: '#A656201A',
    iconColor: '#A65620',
    formatter: (value: string) => formatDate(value),
  },
};
