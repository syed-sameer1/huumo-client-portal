import type { CSSProperties } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { PurchaseOrders } from '@/types/purchaseOrders';

export function purchaseOrderColumnWidthStyle(
  columnDef: ColumnDef<PurchaseOrders, unknown>,
): CSSProperties | undefined {
  const w = columnDef.meta?.width;
  if (typeof w !== 'number') return undefined;
  return { width: w, minWidth: w, maxWidth: w };
}
