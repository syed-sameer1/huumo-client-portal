import { MappingField } from '../MappingRow/types';

export const REQUIRED_FIELDS: MappingField[] = [
  {
    id: 'poNumber',
    name: 'required.poNumber',
    label: 'PO Number',
    required: true,
    sample: 'PO0023',
  },
  {
    id: 'orderDate',
    name: 'required.orderDate',
    label: 'Order Date',
    required: true,
    sample: '12/06/25',
  },
  {
    id: 'vendorName',
    name: 'required.vendorName',
    label: 'Vendor',
    required: true,
    sample: 'Nvidia Corp',
  },
  {
    id: 'dueDate',
    name: 'required.dueDate',
    label: 'Due Date',
    required: true,
    sample: '12/06/25',
  },
  {
    id: 'lineItem',
    name: 'required.lineItem',
    label: 'Line Item',
    required: true,
    sample: 'Plastic',
  },
  {
    id: 'unitCost',
    label: 'Unit Cost',
    required: true,
    sample: '$678',
    name: 'required.unitCost',
  },
  {
    id: 'quantity',
    name: 'required.quantity',
    label: 'Quantity',
    required: true,
    sample: '12',
  },
];
