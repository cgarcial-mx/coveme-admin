import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Integrations</h1>
      <Card>
        <CardHeader>
          <CardTitle>Webhook Management</CardTitle>
          <CardDescription>Configure external integrations and delivery</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Event</Label>
            <Input defaultValue="order.created" />
          </div>
          <div className="grid gap-2">
            <Label>Destination URL</Label>
            <Input placeholder="https://example.com/webhooks" />
          </div>
          <div className="grid gap-2">
            <Label>Secret</Label>
            <Input placeholder="•••••" />
          </div>
          <div className="md:col-span-3">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Explorer</CardTitle>
          <CardDescription>Test API endpoints from the browser</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="rounded-md border p-3 text-sm">
            Try GET /api/export/orders.csv to download orders CSV.
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline"><a href="/api/export/orders.csv">GET orders.csv</a></Button>
            <Button asChild variant="outline"><a href="/api/ping">GET ping</a></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
