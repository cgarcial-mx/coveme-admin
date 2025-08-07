import { OverviewCards } from "@/components/overview-cards"
import { SalesChart, TopProductsChart } from "@/components/charts/sales-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, ArrowRight, RefreshCw, ShoppingCart, UploadCloud } from 'lucide-react'
import Link from "next/link"

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Overview of products, listings, orders, and sync health.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/products/new">
              <UploadCloud className="mr-2 size-4" />
              Create Product
            </Link>
          </Button>
          <Button asChild>
            <Link href="/settings/sync">
              <RefreshCw className="mr-2 size-4" />
              Sync Marketplaces
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/orders">
              <ShoppingCart className="mr-2 size-4" />
              View Orders
            </Link>
          </Button>
        </div>
      </div>

      <OverviewCards />

      <div className="grid gap-3 lg:grid-cols-3">
        <SalesChart />
        <TopProductsChart />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sync Alerts</CardTitle>
            <CardDescription>Actions needed to keep data in sync.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Alert>
              <AlertTriangle className="size-4" />
              <AlertTitle>Pending Credentials</AlertTitle>
              <AlertDescription>3 clients missing Shopify API keys.</AlertDescription>
            </Alert>
            <Alert>
              <AlertTriangle className="size-4" />
              <AlertTitle>Failed Jobs</AlertTitle>
              <AlertDescription>2 sync jobs failed in the last hour.</AlertDescription>
            </Alert>
            <Button asChild variant="outline">
              <Link href="/settings/sync">
                Review Sync Center
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button asChild variant="outline">
              <Link href="/matching">Review Matches</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/listings">Manage Listings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">Bulk Price Update</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/analytics/reports">Build Report</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
