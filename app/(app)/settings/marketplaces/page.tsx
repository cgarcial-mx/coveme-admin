import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Marketplace Credentials</h1>
      <Card>
        <CardHeader>
          <CardTitle>API Credentials</CardTitle>
          <CardDescription>Configure keys and webhook URLs per marketplace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { name: "Amazon" },
            { name: "eBay" },
            { name: "Shopify" },
          ].map((m) => (
            <div key={m.name} className="rounded-md border p-3">
              <div className="mb-3 text-sm font-medium">{m.name}</div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor={`${m.name}-key`}>API Key</Label>
                  <Input id={`${m.name}-key`} placeholder="••••••" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${m.name}-secret`}>API Secret</Label>
                  <Input id={`${m.name}-secret`} placeholder="••••••" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${m.name}-webhook`}>Webhook URL</Label>
                  <Input id={`${m.name}-webhook`} placeholder="https://..." />
                </div>
                <div className="md:col-span-3">
                  <Button variant="outline">Test Connection</Button>
                </div>
              </div>
            </div>
          ))}
          <Button>Save All</Button>
        </CardContent>
      </Card>
    </div>
  )
}
