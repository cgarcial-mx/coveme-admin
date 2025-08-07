import Image from "next/image"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Props = { params: { id: string } }

export default function Page({ params }: Props) {
  if (!params.id) notFound()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Manual Review</h1>
        <Badge variant="secondary">Confidence 86%</Badge>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Product</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Image src="/placeholder.svg?height=400&width=600" alt="Product" width={600} height={400} className="w-full rounded-md border object-cover" />
            <div className="text-sm">
              <div><span className="text-muted-foreground">Title: </span>Prism Tee</div>
              <div><span className="text-muted-foreground">Brand: </span>Acme</div>
              <div><span className="text-muted-foreground">SKU: </span>SKU-001</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Listing</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Image src="/placeholder.svg?height=400&width=600" alt="Listing" width={600} height={400} className="w-full rounded-md border object-cover" />
            <div className="text-sm">
              <div><span className="text-muted-foreground">Title: </span>Acme Prism Tee</div>
              <div><span className="text-muted-foreground">Brand: </span>ACME</div>
              <div><span className="text-muted-foreground">SKU: </span>SKU-001</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-2">
        <Button>Approve</Button>
        <Button variant="outline">Reject</Button>
        <Button variant="secondary">Request Changes</Button>
      </div>
    </div>
  )
}
