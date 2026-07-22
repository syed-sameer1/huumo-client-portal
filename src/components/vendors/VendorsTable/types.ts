import { Table } from '@tanstack/react-table';
import { VendorData } from '../../../types/vendors';
import type {
  VendorSortField,
  VendorSortOrder,
} from '../VendorFilters/constants';

export type VendorsTableType = Table<VendorData>;

export type VendorsTableMeta = {
  sortBy: '' | VendorSortField;
  sortOrder: '' | VendorSortOrder;
  onSortChange: (field: VendorSortField) => void;
};
