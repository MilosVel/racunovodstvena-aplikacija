import { type Row, type Table, flexRender } from '@tanstack/react-table';

import {
  Table as ReactTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table';
import { cn } from '@/utils/theme';

type DataTableProps<TData> = {
  table: Table<TData>;
  onRowClick?: (data: Row<TData>) => void;
  className?: string | undefined;
  noResultsInfo?: string | React.ReactNode;
};

export function DataTable<TData>({
  table,
  onRowClick,
  className,
  noResultsInfo = 'No results for selected filters',
}: DataTableProps<TData>) {
  return (
    <div
      className={`${cn('border-t bg-popover', {
        'border-b': table.getRowModel().rows?.length > 0,
      })}`}
    >
      {table.getRowModel().rows?.length > 0 ? (
        <ReactTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.column.columnDef.meta?.headerClassName,
                        'text-[12px]',
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => onRowClick?.(row)}
                className={cn(className)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      cell.column.columnDef.meta?.cellClassName,
                      'text-[13.5px]',
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </ReactTable>
      ) : (
        <div>
          {typeof noResultsInfo === 'string' ? (
            <p className="text-md pb-2 pt-8 text-center">{noResultsInfo}</p>
          ) : (
            noResultsInfo
          )}
        </div>
      )}
    </div>
  );
}
