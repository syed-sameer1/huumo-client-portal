import { Skeleton } from '@/components/ui/skeleton';
import { TableRow, TableCell } from '@/components/ui/table';

export const TableSkeletonRow = ({ columns }: { columns: number }) => {
  return (
    <TableRow>
      {Array.from({ length: columns }).map((_, i) => (
        <TableCell key={i} className="py-4">
          <Skeleton className="h-4 w-full rounded-md" />
        </TableCell>
      ))}
    </TableRow>
  );
};
