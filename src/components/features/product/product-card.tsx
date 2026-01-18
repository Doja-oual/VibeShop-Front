'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, getDiscountBadge } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const discountBadge = getDiscountBadge(product.compareAtPrice, product.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="group relative h-full overflow-hidden transition-shadow hover:shadow-lg">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-muted">
            {discountBadge && (
              <Badge
                variant="destructive"
                className="absolute left-2 top-2 z-10"
              >
                {discountBadge}
              </Badge>
            )}
            
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt || product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Pas d'image
              </div>
            )}

            {product.stock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <Badge variant="destructive" className="text-base">
                  Rupture de stock
                </Badge>
              </div>
            )}
          </div>
        </Link>

        <CardContent className="p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="mb-2 line-clamp-2 font-semibold text-foreground transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>

          {product.category && (
            <p className="mb-2 text-xs text-muted-foreground">
              {product.category.name}
            </p>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.rating && (
            <div className="mt-2 flex items-center gap-1 text-xs">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{product.rating.toFixed(1)}</span>
              {product.reviewCount && (
                <span className="text-muted-foreground">
                  ({product.reviewCount})
                </span>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Ajouter au panier
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
