import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Providers</h1>
        <Button variant="outline">Add Provider</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Supplier Information</CardTitle></CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input placeholder="Globex Supply" defaultValue="Globex Supply" />
          </div>
          <div className="grid gap-2">
            <Label>Contact</Label>
            <Input placeholder="supplier@globex.com" defaultValue="supplier@globex.com" />
          </div>
          <div className="grid gap-2">
            <Label>Phone</Label>
            <Input placeholder="+1 555 0123" />
          </div>
          <div className="md:col-span-3">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
