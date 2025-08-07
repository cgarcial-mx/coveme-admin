"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Page() {
  const [fileName, setFileName] = useState<string>("")

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Data Import & Export</h1>

      <Card>
        <CardHeader>
          <CardTitle>Import Products</CardTitle>
          <CardDescription>Upload CSV or Excel to import catalogs</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
          <Button disabled={!fileName}>Import</Button>
          {fileName && <div className="text-sm text-muted-foreground truncate">Selected: {fileName}</div>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export</CardTitle>
          <CardDescription>Download datasets for accounting and BI tools</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild variant="outline"><a href="/api/export/orders.csv">Orders CSV</a></Button>
          <Button variant="outline" disabled>Products CSV (demo)</Button>
          <Button variant="outline" disabled>Listings CSV (demo)</Button>
        </CardContent>
      </Card>
    </div>
  )
}
