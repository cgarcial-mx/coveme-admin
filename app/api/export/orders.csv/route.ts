export async function GET() {
  const rows = [
    ["order_number", "marketplace", "status", "date", "total"],
    ["#10021", "Amazon", "Pending", "2025-08-05", "89.90"],
    ["#10022", "eBay", "Shipped", "2025-08-06", "59.50"],
    ["#10023", "Shopify", "Delivered", "2025-08-06", "129.99"],
  ]
  const csv = rows.map((r) => r.join(",")).join("\n")
  return new Response(csv, {
    headers: {
      "content-type": "text/csv",
      "content-disposition": "attachment; filename=orders.csv",
    },
  })
}
