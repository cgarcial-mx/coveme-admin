import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Brands</h1>
        <Button variant="outline">Add Brand</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Manage Brands & Sub-brands</CardTitle></CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Brand</Label>
            <Input placeholder="Acme" defaultValue="Acme" />
          </div>
          <div className="grid gap-2">
            <Label>Sub-brand</Label>
            <Input placeholder="Acme Sports" />
          </div>
          <div className="grid gap-2">
            <Label>Owner</Label>
            <Input placeholder="Brand Owner Inc." />
          </div>
          <div className="md:col-span-3">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
