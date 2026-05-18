import { MappingField } from '@/components/column-mapping/ColumnMappingTable/MappingRow/types';

/** Vendor CSV column mapping (Vendor → Email) — used on vendors page and PO missing-email flow */
export const VENDOR_COLUMN_MAPPING_FIELDS: MappingField[] = [
  {
    id: 'vendorName',
    name: 'vendorName',
    label: 'Vendor',
    required: true,
    sample: 'Nvidia Corp',
  },
  {
    id: 'vendorEmail',
    name: 'vendorEmail',
    label: 'Email Address',
    required: true,
    sample: 'vendor@gmail.com',
  },
];
