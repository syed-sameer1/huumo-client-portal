import { PurchaseOrders } from '@/types/purchaseOrders';
import { Table } from '@tanstack/react-table';
import type {
  PurchaseOrderSortField,
  PurchaseOrderSortOrder,
} from '../PurchaseOrdersFilters/constants';

export type PurchaseOrdersTableType = Table<PurchaseOrders>;

export type PurchaseOrdersTableMeta = {
  sortBy: '' | PurchaseOrderSortField;
  sortOrder: '' | PurchaseOrderSortOrder;
  onSortChange: (field: PurchaseOrderSortField) => void;
};
