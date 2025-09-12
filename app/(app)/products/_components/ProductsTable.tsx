'use client';

import { MarketplaceListing, Product, ProductTable } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Filter, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
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
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMarginColor } from '@/utils/helpers';

const ProductsTable = ({
  products,
  caption,
}: {
  products: ProductTable[];
  caption?: string;
}) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const columnHelper = createColumnHelper<ProductTable>();

  const columns = [
    columnHelper.accessor('internalSku', {
      header: 'SKU',
    }),
    columnHelper.accessor('title', {
      header: 'Nombre',
      cell: ({ getValue, row }) => {
        const value = getValue() as string;
        if (!value) return '-';
        return (
          <Link className="underline" href={`/products/${row.original.id}`}>
            {value}
          </Link>
        );
      },
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
        return category;
      },
    }),
    columnHelper.accessor('marketplaceListings', {
      header: 'Marketplaces',
      cell: ({ getValue }) => {
        const value = (getValue() as MarketplaceListing[]) ?? [
          { marketplace_type: 'Amazon' },
          { marketplace_type: 'Shopify' },
        ];
        return value.map((listing) => (
          <Badge variant="outline">{listing.marketplace_type}</Badge>
        ));
      },
    }),
    columnHelper.accessor('salesLast30Days', {
      header: 'Ventas últimos 30 días',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        if (!value) return '-';
        return (
          <div className="flex items-center gap-2">
            <span>{value}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor('margin', {
      header: 'Margen',
      cell: ({ getValue }) => {
        const value = (getValue() as number) ?? 0;
        return (
          <div className="flex items-center gap-2">
            <Badge className={getMarginColor(value)}>{value.toFixed(1)}%</Badge>
            {value > 25 && (
              <div className="text-xs text-green-600 mt-1">
                Tienes el mejor precio DH
              </div>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor('profit', {
      header: 'Ingresos',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        if (!value) return '-';
        return <span>${value.toFixed(2)}</span>;
      },
    }),
    columnHelper.accessor('updatedAt', {
      header: 'Actualizado',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <span>{formatDate(value)}</span>;
      },
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
