"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { createProduct } from "@/app/(app)/products/new/actions"
import { useActionState } from "react"

type FormState = Awaited<ReturnType<typeof createProduct>> | null

export function ProductCreateForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [state, formAction, pending] = useActionState<FormState, FormData>(createProduct, null)

  // Dimensions helper builder (L-W-H-Unit) to JSON
  const [len, setLen] = React.useState("")
  const [wid, setWid] = React.useState("")
  const [hei, setHei] = React.useState("")
  const [unit, setUnit] = React.useState("cm")
  const [rawJson, setRawJson] = React.useState<string>("")

  React.useEffect(() => {
    if (state?.ok) {
      toast({ title: "Product created", description: `Product ID: ${state.id}` })
      router.push("/products")
    } else if (state && !state.ok) {
      toast({ title: "Failed to create product", description: state.message ?? "Please review your inputs.", variant: "destructive" })
    }
  }, [state, router, toast])

  const applyBuilderToJson = () => {
    const dims: any = {}
    if (len) dims.length = Number(len)
    if (wid) dims.width = Number(wid)
    if (hei) dims.height = Number(hei)
    if (unit) dims.unit = unit
    setRawJson(JSON.stringify(dims, null, 2))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Product</CardTitle>
        <CardDescription>Internal SKU and Title are required. Dimensions are stored as JSON.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="client_id">Client</Label>
              <select id="client_id" name="client_id" required className="h-9 rounded-md border bg-background px-3 text-sm">
                <option value="">Select client</option>
                <option value="1">1 — Acme Inc.</option>
                <option value="2">2 — Globex</option>
                <option value="3">3 — Soylent</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="internal_sku">Internal SKU</Label>
              <Input id="internal_sku" name="internal_sku" placeholder="SKU-0001" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Product title" required />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" name="brand" placeholder="Brand" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" name="model" placeholder="Model" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" placeholder="Category" />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight</Label>
              <Input id="weight" name="weight" type="number" step="0.001" placeholder="e.g. 0.500" />
              <p className="text-xs text-muted-foreground">Decimal (e.g. 0.500)</p>
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe the product..." rows={4} />
            </div>
          </div>

          <Separator />

          <div className="grid gap-3 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="mb-2 font-medium">Dimensions Builder</div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="dim_l">Length</Label>
                    <Input id="dim_l" value={len} onChange={(e) => setLen(e.target.value)} placeholder="L" />
                  </div>
                  <div>
                    <Label htmlFor="dim_w">Width</Label>
                    <Input id="dim_w" value={wid} onChange={(e) => setWid(e.target.value)} placeholder="W" />
                  </div>
                  <div>
                    <Label htmlFor="dim_h">Height</Label>
                    <Input id="dim_h" value={hei} onChange={(e) => setHei(e.target.value)} placeholder="H" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dim_unit">Unit</Label>
                  <select id="dim_unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="h-9 rounded-md border bg-background px-3 text-sm">
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="in">in</option>
                  </select>
                </div>
                <Button type="button" variant="outline" onClick={applyBuilderToJson}>Apply to JSON</Button>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="font-medium">Dimensions JSON (JSONB)</div>
                <span className="text-xs text-muted-foreground">Stored in dimensions column</span>
              </div>
              <Textarea
                id="dimensions"
                name="dimensions"
                placeholder='{"length": 10, "width": 5, "height": 2, "unit": "cm"}'
                value={rawJson}
                onChange={(e) => setRawJson(e.target.value)}
                rows={8}
              />
              <p className="mt-1 text-xs text-muted-foreground">Provide valid JSON. Use the builder or edit manually.</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-3 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="created_by">Created By</Label>
              <select id="created_by" name="created_by" className="h-9 rounded-md border bg-background px-3 text-sm" defaultValue="1">
                <option value="1">1 — admin@example.com</option>
                <option value="2">2 — ops@example.com</option>
              </select>
              <p className="text-xs text-muted-foreground">Optional. If omitted, your backend can set this server-side.</p>
            </div>
          </div>

          <CardFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between p-0 pt-2">
            <Button type="button" variant="outline" onClick={() => history.back()} disabled={pending}>Cancel</Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Create Product"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
