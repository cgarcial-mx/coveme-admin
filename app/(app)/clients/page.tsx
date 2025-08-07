import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataTable, type Column } from "@/components/data-table"

type Client = {
  id: string
  name: string
  plan: "Free" | "Pro" | "Enterprise"
  status: "Active" | "Suspended" | "Trial"
  createdAt: string
  marketplaces: number
}

const rows: Client[] = [
  { id: "c1", name: "Acme Inc.", plan: "Enterprise", status: "Active", createdAt: "2024-10-12", marketplaces: 6 },
  { id: "c2", name: "Globex", plan: "Pro", status: "Active", createdAt: "2025-01-09", marketplaces: 4 },
  { id: "c3", name: "Soylent", plan: "Pro", status: "Trial", createdAt: "2025-05-23", marketplaces: 3 },
  { id: "c4", name: "Initech", plan: "Free", status: "Suspended", createdAt: "2025-06-12", marketplaces: 1 },
]

const columns: Column<Client>[] = [
  { key: "name", header: "Client", sortable: true, render: (r) => <Link className="underline" href={`/clients/${r.id}`}>{r.name}</Link> },
  { key: "plan", header: "Plan", sortable: true, render: (r) => <Badge variant="outline">{r.plan}</Badge> },
  { key: "status", header: "Status", sortable: true, render: (r) => <Badge className={r.status === "Active" ? "bg-emerald-600" : r.status === "Trial" ? "bg-amber-500" : "bg-rose-600"}>{r.status}</Badge>, hideOnMobile: true },
  { key: "marketplaces", header: "Marketplaces", sortable: true, hideOnMobile: true },
  { key: "createdAt", header: "Created", sortable: true, hideOnMobile: true },
]

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Clients</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/clients/new">Add Client</Link>
          </Button>
          <Button asChild>
            <Link href="/settings/marketplaces">Manage Credentials</Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} rows={rows} caption="Clients across plans, statuses, and marketplaces" onBulkDelete={() => {}} />
        </CardContent>
      </Card>
    </div>
  )
}
