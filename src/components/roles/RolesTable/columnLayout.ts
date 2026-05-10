import type { CSSProperties } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '@/service/users';

export function rolesColumnWidthStyle(
  columnDef: ColumnDef<User, unknown>,
): CSSProperties | undefined {
  const w = columnDef.meta?.width;
  if (typeof w !== 'number') return undefined;
  return { width: w, minWidth: w, maxWidth: w };
}
