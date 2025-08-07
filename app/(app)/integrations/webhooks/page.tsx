import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const webhooks = [
  { id: "w1", event: "order.created", url: "https://example.com/webhooks/orders", status: "Active" },
  { id: "w2", event: "inventory.low", url: "https://example.com/webhooks/inventory", status: "Active" },
]

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Webhook Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Webhook</CardTitle>
          <CardDescription>Configure external webhook delivery</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="event">Event</Label>
            <Input id="event" placeholder="order.created" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dest">Destination URL</Label>
            <Input id="dest" placeholder="https://example.com/webhooks" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="secret">Secret</Label>
            <Input id="secret" placeholder="••••••" />
          </div>
          <div className="md:col-span-3">
            <Button>Create</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configured Webhooks</CardTitle>
          <CardDescription>Active endpoints receiving events</CardDescription>
        </CardHeader>
        <CardContent className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((w) => (
                <TableRow key={w.id}>
                  <TableCell>{w.event}</TableCell>
                  <TableCell className="truncate">{w.url}</TableCell>
                  <TableCell><Badge variant="secondary">{w.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
