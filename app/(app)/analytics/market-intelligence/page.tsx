import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Market Intelligence</h1>
      <Card>
        <CardHeader><CardTitle>Competitor Price Heatmap</CardTitle></CardHeader>
        <CardContent>
          <div className="aspect-[16/9] w-full rounded-md border bg-muted" role="img" aria-label="Heatmap placeholder"></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Geographic Sales Distribution</CardTitle></CardHeader>
        <CardContent>
          <div className="aspect-[16/9] w-full rounded-md border bg-muted" role="img" aria-label="Map placeholder"></div>
        </CardContent>
      </Card>
    </div>
  )
}
