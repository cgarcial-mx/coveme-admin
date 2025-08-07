import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Globe, KeyRound, LinkIcon, SignalHigh } from 'lucide-react'

type Props = { params: { id: string } }

const client = {
  id: "c1",
  name: "Acme Inc.",
  plan: "Enterprise",
  status: "Active",
  email: "ops@acme.com",
  phone: "+1 555-0123",
  marketplaces: [
    { name: "Amazon", status: "Connected", latency: "210ms" },
    { name: "eBay", status: "Connected", latency: "160ms" },
    { name: "Shopify", status: "Pending", latency: "-" },
  ],
}

export default function Page({ params }: Props) {
  if (params.id !== client.id) {
    notFound()
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold">{client.name}</h1>
          <p className="text-sm text-muted-foreground">Client details, credentials, and analytics</p>
        </div>
        <Badge variant="secondary">{client.plan}</Badge>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="credentials">Marketplace Credentials</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>View or edit basic profile & subscription</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input defaultValue={client.name} />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input defaultValue={client.email} />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input defaultValue={client.phone} />
              </div>
              <div className="grid gap-2">
                <Label>Plan</Label>
                <Input defaultValue={client.plan} />
              </div>
              <div className="md:col-span-2">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credentials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys per Marketplace</CardTitle>
              <CardDescription>Manage credentials for each marketplace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {client.marketplaces.map((mkt) => (
                <div key={mkt.name} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="size-4" />
                      <span className="font-medium">{mkt.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={mkt.status === "Connected" ? "default" : "secondary"}>{mkt.status}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <SignalHigh className="size-3" />
                        <span>{mkt.latency}</span>
                      </Badge>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="grid gap-1.5">
                      <Label>API Key</Label>
                      <Input placeholder="•••••••" defaultValue="" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label>API Secret</Label>
                      <Input placeholder="•••••••" defaultValue="" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Webhook URL</Label>
                      <div className="flex gap-2">
                        <Input defaultValue={`https://webhooks.example.com/${client.id}/${mkt.name.toLowerCase()}`} />
                        <Button variant="outline" size="icon" title="Test Connection" aria-label="Test Connection">
                          <KeyRound className="size-4" />
                        </Button>
                        <Button variant="outline" size="icon" title="Copy URL" aria-label="Copy URL">
                          <LinkIcon className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Revenue, conversions, and inventory turnover</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Revenue (30d)</div>
                <div className="text-2xl font-semibold">$92,310</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Conversion Rate</div>
                <div className="text-2xl font-semibold">3.4%</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Inventory Turnover</div>
                <div className="text-2xl font-semibold">6.2x</div>
              </div>
              <div className="md:col-span-3">
                <div className="aspect-[16/6] w-full rounded-md border bg-muted" role="img" aria-label="Analytics Chart Placeholder"></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
