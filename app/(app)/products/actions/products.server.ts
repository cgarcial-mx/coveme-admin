import { productsService } from '@/services/products.service';

export async function getProducts() {
  try {
    const response = await productsService.list();
    return response.results;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
