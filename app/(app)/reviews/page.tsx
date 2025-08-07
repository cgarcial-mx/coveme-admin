"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RatingStars } from "@/components/rating-stars"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Review = {
  id: string
  entityType: "Product" | "Listing"
  entity: string
  rating: number
  comment: string
  author: string
  marketplace?: string
  date: string
}

const productReviews: Review[] = [
  { id: "r1", entityType: "Product", entity: "Prism Tee", rating: 4.5, comment: "Great quality and fit!", author: "Jane D.", date: "2025-08-05" },
  { id: "r2", entityType: "Product", entity: "Nimbus Hoodie", rating: 4, comment: "Warm, a bit bulky.", author: "Erik P.", date: "2025-08-06" },
]

const listingComments: Review[] = [
  { id: "c1", entityType: "Listing", entity: "Amazon - Prism Tee", rating: 5, comment: "Fast shipping!", author: "Alex R.", marketplace: "Amazon", date: "2025-08-06" },
  { id: "c2", entityType: "Listing", entity: "eBay - Nimbus Hoodie", rating: 3.5, comment: "Box arrived dented.", author: "Mia K.", marketplace: "eBay", date: "2025-08-06" },
]

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold">Reviews & Comments</h1>
          <p className="text-sm text-muted-foreground">Check comments on product listings and ratings from marketplaces.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline"><Link href="/notifications">View Notifications</Link></Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Reviews</CardTitle>
          <CardDescription>Ratings and comments about your products</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="grid gap-1.5">
              <Label htmlFor="product">Product</Label>
              <Input id="product" placeholder="Search product..." />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="min-rating">Min Rating</Label>
              <Input id="min-rating" type="number" min={0} max={5} step={0.5} placeholder="e.g. 4" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="date-range">Date</Label>
              <Input id="date-range" placeholder="YYYY-MM-DD to YYYY-MM-DD" />
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productReviews.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="whitespace-nowrap">
                      <Link className="underline" href={`/products?p=${encodeURIComponent(r.entity)}`}>{r.entity}</Link>
                    </TableCell>
                    <TableCell><RatingStars rating={r.rating} /></TableCell>
                    <TableCell className="max-w-[420px] truncate">{r.comment}</TableCell>
                    <TableCell>{r.author}</TableCell>
                    <TableCell>{r.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listing Comments</CardTitle>
          <CardDescription>Per-marketplace comments and ratings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="grid gap-1.5">
              <Label htmlFor="listing">Listing</Label>
              <Input id="listing" placeholder="Search listing..." />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="marketplace">Marketplace</Label>
              <Input id="marketplace" placeholder="Amazon, eBay, Shopify..." />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="min-rating-2">Min Rating</Label>
              <Input id="min-rating-2" type="number" min={0} max={5} step={0.5} placeholder="e.g. 3" />
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Listing</TableHead>
                  <TableHead>Marketplace</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listingComments.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="whitespace-nowrap">{r.entity}</TableCell>
                    <TableCell><Badge variant="outline">{r.marketplace}</Badge></TableCell>
                    <TableCell><RatingStars rating={r.rating} /></TableCell>
                    <TableCell className="max-w-[420px] truncate">{r.comment}</TableCell>
                    <TableCell>{r.author}</TableCell>
                    <TableCell>{r.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline">Export</Button>
            <Button>Respond to Selected</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
