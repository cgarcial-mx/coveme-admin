"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", amazon: 12000, ebay: 8000, shopify: 6000 },
  { month: "Feb", amazon: 14500, ebay: 9000, shopify: 7000 },
  { month: "Mar", amazon: 16000, ebay: 9500, shopify: 8500 },
  { month: "Apr", amazon: 18000, ebay: 11000, shopify: 9000 },
  { month: "May", amazon: 21000, ebay: 13000, shopify: 10000 },
  { month: "Jun", amazon: 24000, ebay: 15000, shopify: 12000 },
]

export function SalesChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue by Marketplace</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer
          config={{
            amazon: { label: "Amazon", color: "hsl(var(--chart-1))" },
            ebay: { label: "eBay", color: "hsl(var(--chart-2))" },
            shopify: { label: "Shopify", color: "hsl(var(--chart-3))" },
          }}
          className="h-[320px]"
        >
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="amazon" stroke="var(--color-amazon)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ebay" stroke="var(--color-ebay)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="shopify" stroke="var(--color-shopify)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function TopProductsChart() {
  const bars = [
    { name: "Tee", sales: 4200 },
    { name: "Hoodie", sales: 3600 },
    { name: "Sneaker", sales: 3100 },
    { name: "Backpack", sales: 2700 },
    { name: "Cap", sales: 2300 },
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{ sales: { label: "Sales", color: "hsl(var(--chart-4))" } }}
          className="h-[320px]"
        >
          <ResponsiveContainer>
            <BarChart data={bars}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="sales" fill="var(--color-sales)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
