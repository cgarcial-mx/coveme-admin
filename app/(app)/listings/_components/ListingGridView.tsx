'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { useGetListings } from '../hooks/queries/useGetListings';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const ListingGridView = () => {
  const { data: listings, isLoading } = useGetListings();
  console.log('🚀 ~ ListingGridView ~ listings:', listings);

  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-screen-xl mx-auto">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden flex flex-col max-w-sm">
            <Skeleton className="aspect-[4/3] w-full max-h-[180px]" />
            <CardHeader className="flex-1">
              <Skeleton className="h-6 w-20 mb-2" />
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-24 mt-2" />
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-6 w-16" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-16" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-screen-xl mx-auto">
      {listings?.results.map((l) => (
        <Card key={l.id} className="overflow-hidden flex flex-col max-w-sm">
          <div
            className="aspect-[4/3] w-full bg-muted max-h-[180px] overflow-hidden"
            role="img"
            aria-label="Listing image"
          >
            {l.thumbnail_url ? (
              <img
                src={l.thumbnail_url}
                alt={l.title || 'Listing image'}
                className="object-cover w-full h-full"
                sizes="100px"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                No image
              </div>
            )}
          </div>
          <CardHeader className="flex-1">
            <Badge>{l.marketplace_type}</Badge>
            <CardTitle>SKU: {l.marketplace_id}</CardTitle>
            <CardDescription className="text-base">{l.title}</CardDescription>
            <CardDescription className="text-sm text-muted-foreground mt-2">
              {l.inventory_quantity && l.inventory_quantity > 0
                ? `Stock: ${l.inventory_quantity}`
                : 'Sin stock'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium">
                ${l.price ? Number(l.price).toFixed(2) : 'N/A'}
              </div>
              {/* <div className="text-muted-foreground">Stock: {l.}</div> */}
            </div>
            <Badge variant={l.status === 'active' ? 'default' : 'secondary'}>
              {l.status || 'Unknown'}
            </Badge>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href={`/listings/${l.id}`}>View</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ListingGridView;
