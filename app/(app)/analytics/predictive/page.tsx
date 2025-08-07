import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Predictive Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Auto-Match Settings</CardTitle>
          <CardDescription>Configure thresholds for automated product matching</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Min Confidence (%)</Label>
            <Input defaultValue="80" />
          </div>
          <div className="grid gap-2">
            <Label>Max Title Distance</Label>
            <Input defaultValue="0.2" />
          </div>
          <div className="grid gap-2">
            <Label>Require SKU Match</Label>
            <Input defaultValue="true" />
          </div>
          <div className="md:col-span-3">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
