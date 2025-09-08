import { productsService } from '@/services/products.service';

export async function getProducts() {
  try {
    const response = await productsService.list();
    console.log('🚀 ~ getProducts ~ response:', response);
    return response.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
