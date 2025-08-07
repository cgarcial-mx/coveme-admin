import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plug, CheckCircle2, XCircle } from 'lucide-react'

const connectors = [
  { id: "c-amz", name: "Amazon SP-API", status: "Connected" as const },
  { id: "c-ebay", name: "eBay Sell API", status: "Not Connected" as const },
  { id: "c-shop", name: "Shopify Admin API", status: "Connected" as const },
]

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Connectors</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {connectors.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Plug className="size-4" /> {c.name}
              </CardTitle>
              <CardDescription>
                {c.status === "Connected" ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="size-4" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-600">
                    <XCircle className="size-4" /> Not Connected
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant={c.status === "Connected" ? "default" : "secondary"}>{c.status}</Badge>
              {c.status === "Connected" ? (
                <Button variant="outline" size="sm">Disconnect</Button>
              ) : (
                <Button size="sm">Connect</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
