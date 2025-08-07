import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Sync Center</h1>
      <Card>
        <CardHeader>
          <CardTitle>Sync Configuration</CardTitle>
          <CardDescription>Frequency, retry settings, and error handling</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="frequency">Frequency (mins)</Label>
            <Input id="frequency" defaultValue="15" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="retries">Max Retries</Label>
            <Input id="retries" defaultValue="3" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="policy">Error Policy</Label>
            <Input id="policy" defaultValue="Skip and alert" />
          </div>
          <div className="md:col-span-3 flex items-center justify-between rounded-md border p-3">
            <div>
              <div className="font-medium">Realtime Updates</div>
              <div className="text-sm text-muted-foreground">Enable live updates for price and inventory</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="md:col-span-3">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
