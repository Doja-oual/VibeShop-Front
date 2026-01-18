'use client';

import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Drawer } from 'vaul';
import { useCart } from '@/hooks/use-cart';
import { useUIStore } from '@/stores/ui.store';
import { CartItem } from './cart-item';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export function CartDrawer() {
  const { items, getItemCount, getSubtotal, getTotal, discount } = useCart();
  const { isCartOpen, closeCart } = useUIStore();

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <Drawer.Root open={isCartOpen} onOpenChange={closeCart} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-background">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Panier</h2>
              {itemCount > 0 && (
                <Badge variant="secondary">{itemCount}</Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCart}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingCart className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">
                  Votre panier est vide
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Ajoutez des produits pour commencer
                </p>
                <Button onClick={closeCart} asChild>
                  <Link href="/">Parcourir les produits</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t px-6 py-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Réduction</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between border-t pt-2 text-base font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">
                    Commander
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={closeCart}
                  asChild
                >
                  <Link href="/cart">Voir le panier</Link>
                </Button>
              </div>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
