'use client';

import { Button } from '@/components/ui/button';
import { useGetListings } from '../hooks/queries/useGetListings';
import { MarketplaceListing } from '@/types/marketplace';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';

const ListingListView = () => {
  const { data: listings } = useGetListings();

  const columnHelper = createColumnHelper<MarketplaceListing>();

  const columns = [
    columnHelper.accessor('thumbnail_url', {
      header: 'Thumbnail',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <img src={value} alt="Thumbnail" className="w-10 h-10" />;
      },
    }),
    columnHelper.accessor('marketplace_id', {
      header: 'SKU',
    }),
    columnHelper.accessor('title', {
      header: 'Title',
    }),
    columnHelper.accessor('marketplace_type', {
      header: 'Marketplace',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <Badge variant="outline">{value}</Badge>;
      },
    }),
    columnHelper.accessor('price', {
      header: 'Precio',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <span>${Number(value).toFixed(2)}</span>;
      },
    }),
    columnHelper.accessor('inventory_quantity', {
      header: 'Stock',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        if (value === 0) {
          return <Badge variant="destructive">Sin stock</Badge>;
        }
        return <span>{value}</span>;
      },
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <Badge variant="default">{value}</Badge>;
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
      header: 'Actions',
      cell: ({ row }) => {
        return <Button variant="outline">View</Button>;
      },
    }),
  ];

  const table = useReactTable({
    data: listings?.results ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listings (Vista Lista)</CardTitle>
        <CardDescription>
          Incluye imagen, marketplace, precio, stock y estado
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full overflow-x max-w-screen-xl mx-auto">
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
      </CardContent>
    </Card>
  );
};

export default ListingListView;
