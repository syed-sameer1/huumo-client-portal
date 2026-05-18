import type { ColumnDef } from '@tanstack/react-table';

export function getDataTableColumnKey<TData>(
  col: ColumnDef<TData, unknown>,
  index: number,
): string {
  if (typeof col.id === 'string' && col.id.length > 0) return col.id;
  if ('accessorKey' in col && col.accessorKey != null) {
    return String(col.accessorKey);
  }
  return `col-${index}`;
}
