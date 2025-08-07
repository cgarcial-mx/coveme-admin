"use client"

import * as React from "react"
import { Bell, Box, MessageSquare, ShoppingCart, CheckCircle2, Circle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useRealtime } from "@/hooks/use-realtime"

type Notification = {
  id: string
  kind: "product" | "order" | "comment"
  title: string
  description: string
  ts: number
  read?: boolean
  href?: string
}

const initialData: Notification[] = [
  { id: "n1", kind: "comment", title: "New comment on Prism Tee", description: "“Great quality!” by Jane D.", ts: Date.now() - 1000 * 60 * 30, href: "/reviews" },
  { id: "n2", kind: "order", title: "Order #10024 paid", description: "Shopify order total $89.90", ts: Date.now() - 1000 * 60 * 90, href: "/orders" },
  { id: "n3", kind: "product", title: "Low inventory: Nimbus Hoodie", description: "Stock dropped below 10 on Amazon", ts: Date.now() - 1000 * 60 * 120, href: "/listings" },
]

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

export function NotificationsFeed() {
  const [items, setItems] = React.useState<Notification[]>(initialData)

  // Simulate realtime incoming notifications
  useRealtime(null, () => {
    const rnd = Math.random()
    const now = Date.now()
    let next: Notification | null = null
    if (rnd < 0.34) {
      next = { id: `n${now}`, kind: "comment", title: "New comment on Orbit Sneaker", description: "“Runs a bit small.” by Alex R.", ts: now, href: "/reviews" }
    } else if (rnd < 0.67) {
      next = { id: `n${now}`, kind: "order", title: "Order #10025 shipped", description: "eBay order out for delivery", ts: now, href: "/orders" }
    } else {
      next = { id: `n${now}`, kind: "product", title: "Price change synced", description: "Prism Tee updated on Amazon", ts: now, href: "/products" }
    }
    setItems((prev) => [next!, ...prev].slice(0, 30))
    return null as any
  }, 15000)

  const unreadCount = items.filter((i) => !i.read).length

  const markAllRead = () => {
    setItems((prev) => prev.map((i) => ({ ...i, read: true })))
  }
  const toggleRead = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: !i.read } : i)))
  }

  const groups: { key: "all" | Notification["kind"]; label: string }[] = [
    { key: "all", label: "All" },
    { key: "product", label: "Products" },
    { key: "order", label: "Orders" },
    { key: "comment", label: "Comments" },
  ]

  const iconFor = (k: Notification["kind"]) =>
    k === "order" ? <ShoppingCart className="size-4" /> : k === "comment" ? <MessageSquare className="size-4" /> : <Box className="size-4" />

  return (
    <Card>
      <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Product, order, and comment activity</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bell className="size-3.5" />
            <span>{unreadCount} unread</span>
          </Badge>
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCircle2 className="mr-2 size-4" />
            Mark all read
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            {groups.map((g) => (
              <TabsTrigger key={g.key} value={g.key}>
                {g.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {groups.map((g) => {
            const filtered = g.key === "all" ? items : items.filter((i) => i.kind === g.key)
            return (
              <TabsContent key={g.key} value={g.key} className="space-y-2">
                {filtered.length === 0 ? (
                  <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">No notifications</div>
                ) : (
                  filtered.map((n, idx) => (
                    <div key={n.id} className="rounded-md border p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {iconFor(n.kind)}
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{n.title}</div>
                            <div className="text-xs text-muted-foreground">{n.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!n.read ? <Circle className="size-3 text-emerald-500" /> : <span className="text-xs text-muted-foreground">Read</span>}
                          <span className="text-xs text-muted-foreground">{timeAgo(n.ts)}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        {n.href && (
                          <a href={n.href} className="text-xs underline">
                            View
                          </a>
                        )}
                        <Button size="xs" variant="outline" onClick={() => toggleRead(n.id)}>
                          {n.read ? "Mark unread" : "Mark read"}
                        </Button>
                      </div>
                      {idx < filtered.length - 1 && <Separator className="my-3" />}
                    </div>
                  ))
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </CardContent>
    </Card>
  )
}
