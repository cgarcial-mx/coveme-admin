'use client';

import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Filter, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMemo, useState } from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Column,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';

const ProductsTable = ({
  products,
  caption,
}: {
  products: Product[];
  caption?: string;
}) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const columnHelper = createColumnHelper<Product>();

  const columns = [
    columnHelper.accessor('internalSku', {
      header: 'SKU',
    }),
    columnHelper.accessor('title', {
      header: 'Nombre',
    }),
    columnHelper.accessor('price', {
      header: 'Precio',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        if (!value) return '-';
        return `$${value}`;
      },
    }),
    columnHelper.accessor('brandName', {
      header: 'Marca',
    }),
    columnHelper.accessor('category', {
      header: 'Categoria',
      cell: ({ getValue }) => {
        const category = getValue() as string;
        if (!category) return '-';
        return <Badge variant="outline">{category}</Badge>;
      },
    }),

    columnHelper.accessor('isIvaIncluded', {
      header: 'Iva incluido?',
      cell: ({ getValue }) => {
        const value = getValue() as boolean;
        return <Checkbox checked={value} disabled className="size-4" />;
      },
    }),
    columnHelper.accessor('isSupermarket', {
      header: 'Es Supermercado?',
      cell: ({ getValue }) => {
        const value = getValue() as boolean;
        return (
          <div className="flex items-center gap-2">
            <Checkbox checked={value} disabled className="size-4 self-center" />
          </div>
        );
      },
    }),
    columnHelper.accessor('updatedAt', {
      header: 'Actualizado',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <span>{formatDate(value)}</span>;
      },
    }),
    columnHelper.display({
      id: 'actions',
      // header: 'Actions',
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            router.push(`/products/${row.original.id}`);
          }}
        >
          <Pencil className="mr-2 size-4" />
          Edit
        </Button>
      ),
    }),
  ];

  const filtered = useMemo(
    () =>
      products.filter(
        (row: Product) =>
          row.title?.toLowerCase().includes(query.toLowerCase()) ||
          row.internalSku?.toLowerCase().includes(query.toLowerCase()) ||
          row.brandName?.toLowerCase().includes(query.toLowerCase()) ||
          row.category?.toLowerCase().includes(query.toLowerCase()) ||
          row.cost?.toString().includes(query) ||
          row.isIvaIncluded?.toString().includes(query) ||
          row.isSupermarket?.toString().includes(query),
      ),
    [products, query],
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border-t rounded-b-md">
      <div className="flex flex-wrap items-center gap-2 p-4 border-b bg-card">
        <Input
          placeholder="Search..."
          className="h-8 w-40"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="outline" size="sm">
          <Filter className="mr-2 size-4" />
          Filters
        </Button>
        {/* <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 size-4" />
              Export
            </Button>
            {onBulkDelete && selected.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onBulkDelete(selected)}
              >
                <Trash className="mr-2 size-4" />
                Delete ({selected.length})
              </Button>
            )}
          </div> */}
      </div>
      <div className="min-w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap min-w-[120px]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="whitespace-nowrap min-w-[120px]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsTable;
