import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Help & Support</h1>
      <Card>
        <CardHeader>
          <CardTitle>Guided Tours</CardTitle>
          <CardDescription>Learn best practices and workflows</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-3">
          <div className="rounded-md border p-3 text-sm">Onboarding tour</div>
          <div className="rounded-md border p-3 text-sm">Creating listings</div>
          <div className="rounded-md border p-3 text-sm">Bulk operations</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>Submit issues and feature requests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button>Open Ticket</Button>
          <div className="text-sm text-muted-foreground">For human support, open a ticket at vercel.com/help.</div>
        </CardContent>
      </Card>
    </div>
  )
}
