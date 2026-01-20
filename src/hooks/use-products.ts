import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { catalogService } from '@/services/catalog.service';
import { mockCatalogService } from '@/services/catalog.service.mock';
import { ProductFilters } from '@/types';
import { toast } from 'sonner';

// Use mock service if backend is not available (for development)
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
const service = USE_MOCK ? mockCatalogService : catalogService;

// Keys for query caching
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters, page: number, sort: string) =>
    [...productKeys.lists(), { filters, page, sort }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  related: (id: string) => [...productKeys.all, 'related', id] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
};

// Get products with filters
export function useProducts(
  filters: ProductFilters = {},
  page: number = 1,
  limit: number = 12,
  sort: string = 'createdAt:desc'
) {
  return useQuery({
    queryKey: productKeys.list(filters, page, sort),
    queryFn: () => service.getProducts(filters, page, limit, sort),
  });
}

// Get single product
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => service.getProduct(id),
    enabled: !!id,
  });
}

// Get featured products
export function useFeaturedProducts(limit: number = 8) {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: async () => {
      if (USE_MOCK) {
        return mockCatalogService.getFeaturedProducts();
      }
      return catalogService.getFeaturedProducts(limit);
    },
  });
}

// Get related products
export function useRelatedProducts(productId: string, limit: number = 4) {
  return useQuery({
    queryKey: productKeys.related(productId),
    queryFn: () => catalogService.getRelatedProducts(productId, limit),
    enabled: !!productId,
  });
}

// Search products
export function useSearchProducts(query: string, limit: number = 5) {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: () => catalogService.searchProducts(query, limit),
    enabled: query.length >= 2,
  });
}

// Admin: Create product
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: catalogService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      toast.success('Produit créé avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la création');
    },
  });
}

// Admin: Update product
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      catalogService.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      toast.success('Produit mis à jour avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });
}

// Admin: Delete product
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: catalogService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      toast.success('Produit supprimé avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
    },
  });
}
