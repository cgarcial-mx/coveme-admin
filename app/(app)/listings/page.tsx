import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const listings = [
  { id: "l1", marketplace: "Amazon", title: "Prism Tee", price: 29.99, inventory: 124, status: "Active" },
  { id: "l2", marketplace: "eBay", title: "Nimbus Hoodie", price: 59.0, inventory: 42, status: "Active" },
  { id: "l3", marketplace: "Shopify", title: "Orbit Sneaker", price: 120.0, inventory: 0, status: "Out of Stock" },
]

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Listings</h1>
        <Link href="/listings/new" className="text-sm underline">Create listing</Link>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Switch view</div>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <Card key={l.id} className="overflow-hidden">
                <div className="aspect-[4/3] w-full bg-muted" role="img" aria-label="Listing image"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{l.title}</CardTitle>
                  <CardDescription>{l.marketplace}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium">${l.price.toFixed(2)}</div>
                    <div className="text-muted-foreground">Stock: {l.inventory}</div>
                  </div>
                  <Badge variant={l.status === "Active" ? "default" : "secondary"}>{l.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle>Listings (List View)</CardTitle>
              <CardDescription>Includes thumbnail, marketplace, price, inventory, and status</CardDescription>
            </CardHeader>
            <CardContent className="w-full overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-muted-foreground">
                  <tr className="border-b">
                    <th className="py-2 pr-2 text-left">Item</th>
                    <th className="py-2 px-2 text-left">Marketplace</th>
                    <th className="py-2 px-2 text-left">Price</th>
                    <th className="py-2 px-2 text-left">Inventory</th>
                    <th className="py-2 pl-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((l) => (
                    <tr key={l.id} className="border-b last:border-0">
                      <td className="py-2 pr-2">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 overflow-hidden rounded border bg-muted">
                            <Image
                              src="/placeholder.svg?height=64&width=96"
                              alt="Thumbnail"
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate font-medium">{l.title}</div>
                            <div className="text-xs text-muted-foreground">ID: {l.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-2">{l.marketplace}</td>
                      <td className="py-2 px-2">${l.price.toFixed(2)}</td>
                      <td className="py-2 px-2">{l.inventory}</td>
                      <td className="py-2 pl-2">
                        <Badge variant={l.status === "Active" ? "default" : "secondary"}>{l.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
