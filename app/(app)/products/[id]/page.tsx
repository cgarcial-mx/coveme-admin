import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Props = { params: { id: string } }

const db = {
  p1: { id: "p1", name: "Prism Tee", status: "Active", brand: "Acme", price: 29.99 },
  p2: { id: "p2", name: "Nimbus Hoodie", status: "Active", brand: "Acme", price: 59.0 },
}

export default function Page({ params }: Props) {
  const product = (db as any)[params.id]
  if (!product) notFound()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <p className="text-sm text-muted-foreground">Full product view with price history, matches, and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge>{product.status}</Badge>
          <Button asChild variant="outline"><Link href={`/listings?product=${product.id}`}>View Listings</Link></Button>
          <Button>Edit</Button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-3">
            <Image
              alt="Product image"
              src="/placeholder.svg?height=600&width=900"
              width={900}
              height={600}
              className="aspect-[3/2] w-full rounded-md border object-cover"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>Attributes and pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Brand</span><span>{product.brand}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span>${product.price.toFixed(2)}</span></div>
            <Separator />
            <div className="flex justify-between"><span className="text-muted-foreground">SKU</span><span>SKU-XYZ</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span>Apparel</span></div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Price History</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <Card>
            <CardHeader><CardTitle>Price Over Time</CardTitle></CardHeader>
            <CardContent>
              <div className="aspect-[16/6] w-full rounded-md border bg-muted" role="img" aria-label="Price history chart placeholder"></div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>Potential Matches</CardTitle>
              <CardDescription>Confidence score and match criteria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Amazon Listing ABC</div>
                  <Badge variant="secondary">Confidence 86%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Title, Brand, SKU matched. Image similarity high.</p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="outline">Reject</Button>
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">eBay Listing XYZ</div>
                  <Badge variant="secondary">Confidence 62%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Title and Brand matched. SKU mismatch.</p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="outline">Reject</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader><CardTitle>Performance Metrics</CardTitle></CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Conversion Rate</div>
                <div className="text-2xl font-semibold">3.2%</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Profit Margin</div>
                <div className="text-2xl font-semibold">18.7%</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Avg. Position</div>
                <div className="text-2xl font-semibold">4.1</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
