'use server';

import { z } from 'zod';

const productSchema = z.object({
  client_id: z.coerce.number().int().positive(),
  internal_sku: z.string().min(1).max(100),
  title: z.string().min(1).max(500),
  description: z.string().optional().nullable(),
  brand: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  weight: z.coerce.number().finite().nonnegative().optional().nullable(),
  created_by: z.coerce.number().int().positive().optional().nullable(),
});

type CreateResult =
  | { ok: true; id: number; message?: string }
  | { ok: false; message?: string; issues?: string[] };

export async function createProduct(formData: FormData): Promise<CreateResult> {
  try {
    const parsed = productSchema.safeParse({
      client_id: formData.get('client_id'),
      internal_sku: formData.get('internal_sku'),
      title: formData.get('title'),
      description: formData.get('description') || undefined,
      brand: formData.get('brand') || undefined,
      model: formData.get('model') || undefined,
      category: formData.get('category') || undefined,
      weight: formData.get('weight')
        ? Number(formData.get('weight'))
        : undefined,
      created_by: formData.get('created_by') || undefined,
    });

    if (!parsed.success) {
      const issues = parsed.error.issues.map(
        (i) => `${i.path.join('.')}: ${i.message}`,
      );
      return { ok: false, message: 'Error de validación', issues };
    }

    // Simulate successful creation with a random ID
    const fakeId = Math.floor(Math.random() * 100000) + 1;

    // Add a small delay to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { ok: true, id: fakeId, message: 'Producto creado exitosamente' };
  } catch (error: any) {
    return { ok: false, message: error?.message || 'Error inesperado' };
  }
}
