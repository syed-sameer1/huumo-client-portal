import { Table } from '@tanstack/react-table';

export type POLineItems = {
  name: string;
  quantity: number;
  confirmedQuantity: number;
  remainingQuantity: number;
  value: string;
  dueDate: string;
};

export type POLineItemsTableType = Table<POLineItems>;
