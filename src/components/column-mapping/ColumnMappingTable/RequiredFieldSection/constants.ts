import { MappingField } from '../MappingRow/types';

export const REQUIRED_FIELDS: MappingField[] = [
  { id: 'po', label: 'PO Number', required: true, sample: 'PO0023' },
  { id: 'date', label: 'Order Date', required: true, sample: '12/06/25' },
  { id: 'vendor', label: 'Vendor', required: true, sample: 'Nvidia Corp' },
];
