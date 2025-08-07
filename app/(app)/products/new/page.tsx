import { ProductCreateForm } from "@/components/product-create-form"

export default function Page() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Create Product</h1>
        <p className="text-sm text-muted-foreground">Add a new catalog item. Fields align with your database schema.</p>
      </div>
      <ProductCreateForm />
    </div>
  )
}
