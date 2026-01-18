'use client';

import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateItemQuantity, removeFromCart } = useCart();
  const { product, quantity, price } = item;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      updateItemQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateItemQuantity(product.id, quantity - 1);
    }
  };

  const itemTotal = price * quantity;

  return (
    <div className="flex gap-4 border-b py-4 last:border-0">
      {/* Product Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted"
      >
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            Pas d'image
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/products/${product.id}`}
            className="font-medium hover:text-primary"
          >
            {product.name}
          </Link>
          {product.category && (
            <p className="text-xs text-muted-foreground">
              {product.category.name}
            </p>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => removeFromCart(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Stock Warning */}
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-xs text-yellow-600">
            Plus que {product.stock} en stock
          </p>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col items-end justify-between">
        <span className="font-semibold">{formatCurrency(itemTotal)}</span>
        {quantity > 1 && (
          <span className="text-xs text-muted-foreground">
            {formatCurrency(price)} / unité
          </span>
        )}
      </div>
    </div>
  );
}
