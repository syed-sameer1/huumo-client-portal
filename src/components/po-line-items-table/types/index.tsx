import { Table } from '@tanstack/react-table';

export type POLineItems = {
  confirmedQuantity: string;
  createdAt: string;
  id: number;
  lineItem: string;
  pendingQuantity: string;
  quantity: string;
  unitCost: string;
  updatedAt: string;
};

export type POLineItemsTableType = Table<POLineItems>;
