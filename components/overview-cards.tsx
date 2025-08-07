"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, DollarSign, Package, ShoppingCart, Zap } from 'lucide-react'

type MetricCardProps = {
  title: string
  value: string | number
  change?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function MetricCard({ title, value, change, icon: Icon = Zap }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && <p className="text-xs text-muted-foreground">{change}</p>}
      </CardContent>
    </Card>
  )
}

export function OverviewCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard title="Total Products" value="12,342" change="+2.1% from last week" icon={Package} />
      <MetricCard title="Active Listings" value="8,941" change="+1.3% from yesterday" icon={ShoppingCart} />
      <MetricCard title="Recent Orders" value="1,204" change="+8.4% from last week" icon={ArrowUpRight} />
      <MetricCard title="Revenue (30d)" value="$324,210" change="+5.6% from last month" icon={DollarSign} />
    </div>
  )
}
