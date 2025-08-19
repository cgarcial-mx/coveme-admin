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

const ListingGridView = () => {
  const { data: listings } = useGetListings();
  console.log('🚀 ~ ListingGridView ~ listings:', listings);
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-screen-xl mx-auto">
      {listings?.results.map((l) => (
        <Card key={l.id} className="overflow-hidden flex flex-col max-w-sm">
          <div
            className="aspect-[4/3] w-full bg-muted max-h-[180px] overflow-hidden"
            role="img"
            aria-label="Listing image"
          >
            <img
              src={l.thumbnail_url}
              alt={l.title}
              className="object-cover"
              sizes="100px"
              loading="lazy"
            />
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
            <Badge variant={l.status === 'Active' ? 'default' : 'secondary'}>
              {l.status}
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
