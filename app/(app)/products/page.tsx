import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable, type Column } from "@/components/data-table"

type Product = {
  id: string
  sku: string
  name: string
  brand: string
  category: string
  status: "Draft" | "Active" | "Archived"
  marketplaces: string[]
  price: number
}

const rows: Product[] = [
  { id: "p1", sku: "SKU-001", name: "Prism Tee", brand: "Acme", category: "Apparel", status: "Active", marketplaces: ["Amazon", "eBay"], price: 29.99 },
  { id: "p2", sku: "SKU-002", name: "Nimbus Hoodie", brand: "Acme", category: "Apparel", status: "Active", marketplaces: ["Amazon"], price: 59.0 },
  { id: "p3", sku: "SKU-003", name: "Orbit Sneaker", brand: "Globex", category: "Footwear", status: "Draft", marketplaces: [], price: 120.0 },
]

const columns: Column<Product>[] = [
  { key: "sku", header: "SKU", sortable: true },
  { key: "name", header: "Product", sortable: true, render: (r) => <Link className="underline" href={`/products/${r.id}`}>{r.name}</Link> },
  { key: "brand", header: "Brand", sortable: true, hideOnMobile: true },
  { key: "category", header: "Category", sortable: true, hideOnMobile: true },
  { key: "status", header: "Status", sortable: true, render: (r) => <Badge variant={r.status === "Active" ? "default" : "secondary"}>{r.status}</Badge> },
  { key: "marketplaces", header: "Marketplaces", render: (r) => <div className="flex flex-wrap gap-1">{r.marketplaces.map((m) => <Badge key={m} variant="outline">{m}</Badge>)}</div>, hideOnMobile: true },
  { key: "price", header: "Price", sortable: true, render: (r) => `$${r.price.toFixed(2)}` },
]

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Products</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild><Link href="/products/bulk">Bulk Operations</Link></Button>
          <Button asChild><Link href="/products/new">Create Product</Link></Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} rows={rows} caption="Advanced filters and bulk actions supported" onBulkDelete={() => {}} />
        </CardContent>
      </Card>
    </div>
  )
}
