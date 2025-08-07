import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings & Configuration</h1>
      <Tabs defaultValue="marketplaces">
        <TabsList>
          <TabsTrigger value="marketplaces">Marketplace Setup</TabsTrigger>
          <TabsTrigger value="sync">Sync</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplaces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Credentials</CardTitle>
              <CardDescription>Configure API keys and webhook URLs</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Amazon Key</Label>
                <Input placeholder="••••••" />
              </div>
              <div className="grid gap-2">
                <Label>Amazon Secret</Label>
                <Input placeholder="••••••" />
              </div>
              <div className="grid gap-2">
                <Label>Amazon Webhook</Label>
                <Input placeholder="https://..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sync Configuration</CardTitle>
              <CardDescription>Frequency, retries, error handling</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Frequency (mins)</Label>
                <Input defaultValue="15" />
              </div>
              <div className="grid gap-2">
                <Label>Max Retries</Label>
                <Input defaultValue="3" />
              </div>
              <div className="grid gap-2">
                <Label>Error Policy</Label>
                <Input defaultValue="Skip and alert" />
              </div>
              <div className="md:col-span-3 flex items-center justify-between rounded-md border p-3">
                <div>
                  <div className="font-medium">Realtime Updates</div>
                  <div className="text-sm text-muted-foreground">Enable live updates for price and inventory</div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Email and webhook notifications</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Ops Email</Label>
                <Input defaultValue="ops@company.com" />
              </div>
              <div className="grid gap-2">
                <Label>Webhook URL</Label>
                <Input placeholder="https://hooks..." />
              </div>
              <div className="grid gap-2">
                <Label>Alerts</Label>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary">Sync Failures</Badge>
                  <Badge variant="secondary">Low Inventory</Badge>
                  <Badge variant="secondary">New Orders</Badge>
                </div>
              </div>
              <div className="md:col-span-3"><Button>Save</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Roles, permissions, access control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">admin@example.com</div>
                  <Badge>Admin</Badge>
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">ops@example.com</div>
                  <Badge variant="secondary">Operator</Badge>
                </div>
              </div>
              <Button variant="outline">Invite User</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Defaults, display options, language</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>Default Currency</Label>
                <Input defaultValue="USD" />
              </div>
              <div className="grid gap-2">
                <Label>Timezone</Label>
                <Input defaultValue="UTC" />
              </div>
              <div className="grid gap-2">
                <Label>Language</Label>
                <Input defaultValue="English" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
