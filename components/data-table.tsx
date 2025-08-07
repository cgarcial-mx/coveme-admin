"use client"

import * as React from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Download, Filter, Trash } from 'lucide-react'

export type Column<T> = {
  key: keyof T | string
  header: string
  sortable?: boolean
  render?: (row: T) => React.ReactNode
  className?: string
  hideOnMobile?: boolean
}

export function DataTable<T extends { id: string | number }>({
  columns,
  rows,
  caption,
  onBulkDelete,
}: {
  columns: Column<T>[]
  rows: T[]
  caption?: string
  onBulkDelete?: (ids: (string | number)[]) => void
}) {
  const [selected, setSelected] = React.useState<(string | number)[]>([])
  const [query, setQuery] = React.useState("")
  const [sort, setSort] = React.useState<{ key?: string; dir: "asc" | "desc" }>({ dir: "asc" })

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase()
    return rows.filter((r) => JSON.stringify(r).toLowerCase().includes(q))
  }, [rows, query])

  const sorted = React.useMemo(() => {
    if (!sort.key) return filtered
    const sortedRows = [...filtered].sort((a: any, b: any) => {
      const av = a[sort.key as any]
      const bv = b[sort.key as any]
      if (av < bv) return sort.dir === "asc" ? -1 : 1
      if (av > bv) return sort.dir === "asc" ? 1 : -1
      return 0
    })
    return sortedRows
  }, [filtered, sort])

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? sorted.map((r) => r.id) : [])
  }
  const toggleOne = (id: string | number, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))
  }

  return (
    <div className="rounded-md border">
      <div className="flex flex-wrap items-center gap-2 p-2">
        <Input placeholder="Search..." className="h-8 w-40" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button variant="outline" size="sm">
          <Filter className="mr-2 size-4" />
          Filters
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" />
            Export
          </Button>
          {onBulkDelete && selected.length > 0 && (
            <Button variant="destructive" size="sm" onClick={() => onBulkDelete(selected)}>
              <Trash className="mr-2 size-4" />
              Delete ({selected.length})
            </Button>
          )}
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">
                <Checkbox
                  checked={selected.length === sorted.length && sorted.length > 0}
                  onCheckedChange={(c) => toggleAll(Boolean(c))}
                  aria-label="Select all"
                />
              </TableHead>
              {columns.map((c) => (
                <TableHead
                  key={String(c.key)}
                  className={c.className + (c.hideOnMobile ? " hidden md:table-cell" : "")}
                >
                  <button
                    className="inline-flex items-center gap-1"
                    onClick={() => c.sortable && setSort((s) => ({ key: String(c.key), dir: s.dir === "asc" ? "desc" : "asc" }))}
                    aria-label={c.sortable ? `Sort by ${c.header}` : undefined}
                  >
                    {c.header}
                    {sort.key === c.key && (sort.dir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                  </button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="w-8">
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onCheckedChange={(c) => toggleOne(row.id, Boolean(c))}
                    aria-label={`Select row ${row.id}`}
                  />
                </TableCell>
                {columns.map((c) => (
                  <TableCell key={String(c.key)} className={c.hideOnMobile ? "hidden md:table-cell" : ""}>
                    {c.render ? c.render(row) : String((row as any)[c.key as any] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
