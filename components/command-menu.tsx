"use client"

import * as React from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { Home, Users, Package, ShoppingBasket, ListChecks, ListOrdered, BarChart2, Settings, Search } from 'lucide-react'

const items = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Products", href: "/products", icon: Package },
  { label: "Listings", href: "/listings", icon: ShoppingBasket },
  { label: "Matching", href: "/matching", icon: ListChecks },
  { label: "Orders", href: "/orders", icon: ListOrdered },
  { label: "Analytics", href: "/analytics", icon: BarChart2 },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        aria-label="Open Command Menu"
      >
        <Search className="size-4" />
        <span className="hidden md:inline">Search (⌘K)</span>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, entities, actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.href}
                  onSelect={() => {
                    setOpen(false)
                    router.push(item.href)
                  }}
                >
                  <Icon className="mr-2 size-4" />
                  <span>{item.label}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
