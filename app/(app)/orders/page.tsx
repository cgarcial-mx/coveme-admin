import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable, type Column } from "@/components/data-table"

type Order = {
  id: string
  number: string
  marketplace: string
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled"
  date: string
  total: number
}

const rows: Order[] = [
  { id: "o1", number: "#10021", marketplace: "Amazon", status: "Pending", date: "2025-08-05", total: 89.9 },
  { id: "o2", number: "#10022", marketplace: "eBay", status: "Shipped", date: "2025-08-06", total: 59.5 },
  { id: "o3", number: "#10023", marketplace: "Shopify", status: "Delivered", date: "2025-08-06", total: 129.99 },
]

const columns: Column<Order>[] = [
  { key: "number", header: "Order", sortable: true, render: (r) => <Link className="underline" href={`/orders/${r.id}`}>{r.number}</Link> },
  { key: "marketplace", header: "Marketplace", sortable: true },
  { key: "status", header: "Status", sortable: true, render: (r) => <Badge variant="secondary">{r.status}</Badge> },
  { key: "date", header: "Date", sortable: true, hideOnMobile: true },
  { key: "total", header: "Total", sortable: true, render: (r) => `$${r.total.toFixed(2)}` },
]

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Orders</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild><a href="/api/export/orders.csv">Export</a></Button>
          <Button asChild><Link href="/analytics">Order Analytics</Link></Button>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle>Order List</CardTitle></CardHeader>
        <CardContent>
          <DataTable columns={columns} rows={rows} caption="Filter by marketplace, status, and date range" onBulkDelete={() => {}} />
        </CardContent>
      </Card>
    </div>
  )
}
