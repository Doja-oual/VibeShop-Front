// Mock Catalog Service - Service simulé pour développement sans backend
import {
  Product,
  Category,
  Brand,
  ProductFilters,
  PaginatedResponse,
  ApiResponse,
} from '@/types';
import { mockProducts, mockCategories, mockBrands } from './mock-data';

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockCatalogService = {
  // Get products with filters and pagination
  async getProducts(
    filters: ProductFilters = {},
    page: number = 1,
    limit: number = 12,
    sort: string = 'createdAt:desc'
  ): Promise<PaginatedResponse<Product>> {
    await delay(800);

    let filtered = [...mockProducts];

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.categories?.length) {
      filtered = filtered.filter(p => filters.categories!.includes(p.categoryId));
    }

    if (filters.brands?.length) {
      filtered = filtered.filter(p => filters.brands!.includes(p.brandId));
    }

    if (filters.priceMin !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.priceMin!);
    }

    if (filters.priceMax !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.priceMax!);
    }

    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const [field, order] = sort.split(':');
      const aVal = field === 'createdAt' ? new Date(a.createdAt).getTime() :
                   field === 'price' ? a.price :
                   field === 'rating' ? a.rating :
                   a.name;
      const bVal = field === 'createdAt' ? new Date(b.createdAt).getTime() :
                   field === 'price' ? b.price :
                   field === 'rating' ? b.rating :
                   b.name;

      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);

    return {
      success: true,
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },

  // Get single product by ID
  async getProduct(id: string): Promise<Product> {
    await delay(300);
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  // Search products with autocomplete
  async searchProducts(query: string, limit: number = 5): Promise<Product[]> {
    await delay(200);
    const searchLower = query.toLowerCase();
    return mockProducts
      .filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      )
      .slice(0, limit);
  },

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    await delay(300);
    return mockProducts.filter(p => p.featured);
  },

  // Get categories
  async getCategories(): Promise<Category[]> {
    await delay(200);
    return mockCategories;
  },

  // Get brands
  async getBrands(): Promise<Brand[]> {
    await delay(200);
    return mockBrands;
  },

  // Create product (admin)
  async createProduct(data: Partial<Product>): Promise<Product> {
    await delay(500);
    const newProduct: Product = {
      id: String(mockProducts.length + 1),
      name: data.name || '',
      slug: data.slug || '',
      description: data.description || '',
      price: data.price || 0,
      images: data.images || [],
      categoryId: data.categoryId || '',
      brandId: data.brandId || '',
      stock: data.stock || 0,
      sku: data.sku || '',
      rating: 0,
      reviewCount: 0,
      featured: data.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  // Update product (admin)
  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    mockProducts[index] = {
      ...mockProducts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockProducts[index];
  },

  // Delete product (admin)
  async deleteProduct(id: string): Promise<void> {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    mockProducts.splice(index, 1);
  },
};
