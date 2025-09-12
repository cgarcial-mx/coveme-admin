import { productsService } from '@/services/products.service';

export async function getProducts() {
  try {
    const response = await productsService.list();
    return response.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string) {
  const response = await productsService.getById(id);
  return response;
}
