'use client';

import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table } from '@tanstack/react-table';

type Props<TData> = {
  table: Table<TData>;
  total: number;
};

export function DataTablePagination<TData>({ table, total }: Props<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;

  const pageCount = Math.ceil(total / pageSize);

  const createPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const current = pageIndex + 1;

    for (let i = 1; i <= pageCount; i++) {
      if (
        i === 1 ||
        i === pageCount ||
        (i >= current - 1 && i <= current + 1)
      ) {
        pages.push(i);
      } else if (i === current - 2 || i === current + 2) {
        pages.push('ellipsis');
      }
    }

    return [...new Set(pages)];
  };

  return (
    <div className="flex items-center justify-between py-4">
      {/* Rows per page */}
      {/* <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Rows per page:</span>

        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-[80px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[20, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      {/* Pagination */}
      <ShadPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              className={
                !table.getCanPreviousPage()
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>

          {createPageNumbers().map((page, index) =>
            page === 'ellipsis' ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={pageIndex + 1 === page}
                  onClick={() => table.setPageIndex(page - 1)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              className={
                !table.getCanNextPage() ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </ShadPagination>
    </div>
  );
}
