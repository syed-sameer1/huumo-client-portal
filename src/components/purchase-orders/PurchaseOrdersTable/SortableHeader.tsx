import { Column } from '@tanstack/react-table';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

export function SortableHeader({
  column,
  title,
}: {
  column: Column<any, any>;
  title: string;
}) {
  const sorted = column.getIsSorted();

  return (
    <button
      onClick={() => column.toggleSorting(sorted === 'asc')}
      className="flex items-center gap-2 font-medium"
    >
      {title}
      {!sorted && <ArrowUpDown className="h-4 w-4 text-muted-foreground" />}
      {sorted === 'asc' && <ArrowUp className="h-4 w-4" />}
      {sorted === 'desc' && <ArrowDown className="h-4 w-4" />}
    </button>
  );
}
