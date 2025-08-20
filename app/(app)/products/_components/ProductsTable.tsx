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
    columnHelper.accessor('internal_sku', {
      header: 'SKU',
    }),
    columnHelper.accessor('title', {
      header: 'Nombre',
    }),
    columnHelper.accessor('cost', {
      header: 'Precio',
      cell: ({ getValue }) => {
        const value = getValue() as number | undefined;
        if (!value) return '-';
        return `$${value.toFixed(2)}`;
      },
    }),
    columnHelper.accessor('brand_name', {
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

    columnHelper.accessor('is_iva_included', {
      header: 'Iva incluido?',
      cell: ({ getValue }) => {
        const value = getValue() as boolean;
        return <Checkbox checked={value} disabled className="size-4" />;
      },
    }),
    columnHelper.accessor('is_supermarket', {
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
    columnHelper.accessor('updated_at', {
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
          row.internal_sku?.toLowerCase().includes(query.toLowerCase()) ||
          row.brand_name?.toLowerCase().includes(query.toLowerCase()) ||
          row.category?.toLowerCase().includes(query.toLowerCase()) ||
          row.cost?.toString().includes(query) ||
          row.is_iva_included?.toString().includes(query) ||
          row.is_supermarket?.toString().includes(query),
      ),
    [products, query],
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <div className="flex flex-wrap items-center gap-2 p-2">
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
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="w-8">
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
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
