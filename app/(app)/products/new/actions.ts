"use server"

import { z } from "zod"

const productSchema = z.object({
  client_id: z.coerce.number().int().positive(),
  internal_sku: z.string().min(1).max(100),
  title: z.string().min(1).max(500),
  description: z.string().optional().nullable(),
  brand: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  weight: z.coerce.number().finite().nonnegative().optional().nullable(),
  dimensions: z.string().optional().nullable(),
  created_by: z.coerce.number().int().positive().optional().nullable(),
})

type CreateResult =
  | { ok: true; id: number; message?: string }
  | { ok: false; message?: string; issues?: string[] }

export async function createProduct(prevState: any, formData: FormData): Promise<CreateResult> {
  const parsed = productSchema.safeParse({
    client_id: formData.get("client_id"),
    internal_sku: formData.get("internal_sku"),
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    brand: formData.get("brand") || undefined,
    model: formData.get("model") || undefined,
    category: formData.get("category") || undefined,
    weight: formData.get("weight") || undefined,
    dimensions: formData.get("dimensions") || undefined,
    created_by: formData.get("created_by") || undefined,
  })

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
    return { ok: false, message: "Validation failed", issues }
  }

  // Validate dimensions JSON if provided
  let dimensionsObj: any = null
  if (parsed.data.dimensions) {
    try {
      dimensionsObj = JSON.parse(parsed.data.dimensions)
    } catch {
      return { ok: false, message: "Dimensions must be valid JSON" }
    }
  }

  // Attempt to insert into Neon if DATABASE_URL exists
  const hasDb = !!process.env.DATABASE_URL
  if (hasDb) {
    try {
      const { neon } = await import("@neondatabase/serverless")
      const sql = neon(process.env.DATABASE_URL as string)

      // Unique(client_id, internal_sku) enforced by DB; we can still try to pre-check if desired
      const result = await sql<
        { id: number }[]
      >`
        INSERT INTO products
          (client_id, internal_sku, title, description, brand, model, category, weight, dimensions, created_by)
        VALUES
          (
            ${parsed.data.client_id},
            ${parsed.data.internal_sku},
            ${parsed.data.title},
            ${parsed.data.description ?? null},
            ${parsed.data.brand ?? null},
            ${parsed.data.model ?? null},
            ${parsed.data.category ?? null},
            ${parsed.data.weight ?? null},
            ${dimensionsObj ? JSON.stringify(dimensionsObj) : null},
            ${parsed.data.created_by ?? null}
          )
        RETURNING id;
      `
      const id = result[0]?.id ?? 0
      return { ok: true, id, message: "Inserted into database" }
    } catch (err: any) {
      // Surface DB error but keep the UI responsive
      return { ok: false, message: err?.message || "Database error" }
    }
  }

  // Fallback: simulate ID when no DB configured
  const fakeId = Math.floor(Math.random() * 100000) + 1
  return { ok: true, id: fakeId, message: "Simulated create (no DATABASE_URL set)" }
}
