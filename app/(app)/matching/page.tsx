import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const matches = [
  { id: "m1", product: "Prism Tee", listing: "Amazon ABC", confidence: 86 },
  { id: "m2", product: "Nimbus Hoodie", listing: "eBay R45", confidence: 62 },
  { id: "m3", product: "Orbit Sneaker", listing: "Amazon ZZ9", confidence: 91 },
]

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Match Queue</h1>
        <Button variant="outline" asChild><Link href="/analytics/predictive">Auto-Match Settings</Link></Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((m) => (
          <Card key={m.id}>
            <CardHeader>
              <CardTitle className="text-base">{m.product}</CardTitle>
              <CardDescription>{m.listing}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="secondary">Confidence {m.confidence}%</Badge>
              <div className="flex gap-2">
                <Button size="sm" asChild><Link href={`/matching/${m.id}`}>Review</Link></Button>
                <Button size="sm" variant="outline">Reject</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
