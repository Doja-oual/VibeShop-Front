import apiClient from './api-client';
import {
  Product,
  Category,
  Brand,
  ProductFilters,
  PaginatedResponse,
  ApiResponse,
} from '@/types';

export const catalogService = {
  // Get products with filters and pagination
  async getProducts(
    filters: ProductFilters = {},
    page: number = 1,
    limit: number = 12,
    sort: string = 'createdAt:desc'
  ): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort,
    });

    // Add filters
    if (filters.search) params.append('search', filters.search);
    if (filters.categories?.length) {
      filters.categories.forEach(cat => params.append('categories[]', cat));
    }
    if (filters.brands?.length) {
      filters.brands.forEach(brand => params.append('brands[]', brand));
    }
    if (filters.priceMin !== undefined) params.append('priceMin', filters.priceMin.toString());
    if (filters.priceMax !== undefined) params.append('priceMax', filters.priceMax.toString());
    if (filters.inStock !== undefined) params.append('inStock', filters.inStock.toString());

    const response = await apiClient.get<PaginatedResponse<Product>>(
      `/products?${params.toString()}`
    );
    return response.data;
  },

  // Get single product by ID
  async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },

  // Search products with autocomplete
  async searchProducts(query: string, limit: number = 5): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products/search', {
      params: { q: query, limit },
    });
    return response.data.data;
  },

  // Get featured products
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products/featured', {
      params: { limit },
    });
    return response.data.data;
  },

  // Get categories
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  },

  // Get category by slug
  async getCategory(slug: string): Promise<Category> {
    const response = await apiClient.get<ApiResponse<Category>>(`/categories/${slug}`);
    return response.data.data;
  },

  // Get brands
  async getBrands(): Promise<Brand[]> {
    const response = await apiClient.get<ApiResponse<Brand[]>>('/brands');
    return response.data.data;
  },

  // Get related products
  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      `/products/${productId}/related`,
      { params: { limit } }
    );
    return response.data.data;
  },

  // Admin: Create product
  async createProduct(data: FormData): Promise<Product> {
    const response = await apiClient.post<ApiResponse<Product>>('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  // Admin: Update product
  async updateProduct(id: string, data: FormData): Promise<Product> {
    const response = await apiClient.patch<ApiResponse<Product>>(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  // Admin: Delete product
  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },
};
