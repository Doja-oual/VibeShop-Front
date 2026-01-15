'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/use-products';
import { ProductGrid } from '@/components/features/product/product-grid';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/main-layout';
import { ProductFilters } from '@/types';

export default function HomePage() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('createdAt:desc');

  const { data, isLoading, error } = useProducts(filters, page, 12, sort);

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <MainLayout>
      <div className="container px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center md:p-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Bienvenue sur YouCom
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Découvrez notre sélection de produits de qualité à des prix
            imbattables
          </p>
        </section>

        {/* Filters & Sort */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Nos produits</h2>
            {data?.meta && (
              <p className="text-sm text-muted-foreground">
                {data.meta.total} produits disponibles
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Trier par:</label>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="rounded-md border px-3 py-2 text-sm"
            >
              <option value="createdAt:desc">Plus récents</option>
              <option value="price:asc">Prix croissant</option>
              <option value="price:desc">Prix décroissant</option>
              <option value="name:asc">Nom A-Z</option>
              <option value="rating:desc">Meilleures notes</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center">
            <p className="text-destructive">
              Une erreur est survenue lors du chargement des produits
            </p>
          </div>
        )}

        {/* Products Grid */}
        <ProductGrid products={data?.data || []} isLoading={isLoading} />

        {/* Pagination */}
        {data?.meta && data.meta.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Précédent
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: data.meta.totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === data.meta.totalPages ||
                    (p >= page - 2 && p <= page + 2)
                )
                .map((p, index, array) => (
                  <>
                    {index > 0 && array[index - 1] !== p - 1 && (
                      <span key={`ellipsis-${p}`} className="px-2">
                        ...
                      </span>
                    )}
                    <Button
                      key={p}
                      variant={p === page ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => handlePageChange(p)}
                    >
                      {p}
                    </Button>
                  </>
                ))}
            </div>

            <Button
              variant="outline"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === data.meta.totalPages}
            >
              Suivant
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
