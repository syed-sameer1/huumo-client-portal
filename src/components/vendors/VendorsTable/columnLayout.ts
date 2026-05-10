import type { CSSProperties } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { VendorData } from '@/types/vendors';

export function vendorColumnWidthStyle(
  columnDef: ColumnDef<VendorData, unknown>,
): CSSProperties | undefined {
  const w = columnDef.meta?.width;
  if (typeof w !== 'number') return undefined;
  return { width: w, minWidth: w, maxWidth: w };
}
