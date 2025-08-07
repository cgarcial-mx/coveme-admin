import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Performance Monitoring</h1>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>API Response Time</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-semibold">120ms</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Error Rate</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-semibold">0.21%</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>User Activity</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-semibold">421 online</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Data Quality</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-semibold">99.7%</div></CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>System Health Timeline</CardTitle></CardHeader>
        <CardContent>
          <div className="aspect-[16/6] w-full rounded-md border bg-muted"></div>
        </CardContent>
      </Card>
    </div>
  )
}
