'use client';

import { Button } from '@/components/ui/button';
import { useGetListings } from '../hooks/queries/useGetListings';
import { MarketplaceListing } from '@/types/marketplace';
import Link from 'next/link';
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
import { Skeleton } from '@/components/ui/skeleton';

const ListingListView = () => {
  const { data: listings, isLoading } = useGetListings();

  const columnHelper = createColumnHelper<MarketplaceListing>();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Listings (Vista Lista)</CardTitle>
          <CardDescription>
            Incluye imagen, marketplace, precio, stock y estado
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full max-w-screen-xl mx-auto">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-28" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-10 w-10 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-10 w-16" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  const columns = [
    columnHelper.accessor('thumbnail_url', {
      header: 'Thumbnail',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        if (value) {
          return (
            <img
              src={value}
              alt="Thumbnail"
              className="w-10 h-10 rounded object-cover"
            />
          );
        }
        return (
          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
            No img
          </div>
        );
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
        if (value) {
          return <span>${Number(value).toFixed(2)}</span>;
        }
        return <span className="text-muted-foreground">N/A</span>;
      },
    }),
    columnHelper.accessor('inventory_quantity', {
      header: 'Stock',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        if (value === undefined || value === null) {
          return <span className="text-muted-foreground">N/A</span>;
        }
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
        if (!value) {
          return <Badge variant="secondary">Unknown</Badge>;
        }
        return <Badge variant="secondary">{value}</Badge>;
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
        return (
          <Button variant="outline" asChild>
            <Link href={`/listings/${row.original.id}`}>View</Link>
          </Button>
        );
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
      <CardContent className="w-full max-w-screen-xl mx-auto">
        <div className="overflow-x-auto">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingListView;
