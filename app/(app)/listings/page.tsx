import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ListingGridView from './_components/ListingGridView';
import ListingListView from './_components/ListingListView';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export default async function Page() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Listings</h1>
        {/* <Link href="/listings/new" className="text-sm underline">
          Create listing
        </Link> */}
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 size-4" />
              Filter
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">Switch view</div>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="grid" className="mt-3">
          <ListingGridView />
        </TabsContent>

        <TabsContent value="list" className="mt-3">
          <ListingListView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
