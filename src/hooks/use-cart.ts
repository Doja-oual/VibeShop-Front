import { useCartStore } from '@/stores/cart.store';
import { Product } from '@/types';
import { toast } from 'sonner';

export function useCart() {
  const cart = useCartStore();

  const addToCart = (product: Product, quantity: number = 1) => {
    // Check stock
    if (product.stock < quantity) {
      toast.error('Stock insuffisant');
      return;
    }

    cart.addItem(product, quantity);
    toast.success(`${product.name} ajouté au panier`);
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    const item = cart.getItem(productId);
    
    if (!item) return;

    // Check stock
    if (item.product.stock < quantity) {
      toast.error('Stock insuffisant');
      return;
    }

    cart.updateQuantity(productId, quantity);
  };

  const removeFromCart = (productId: string) => {
    cart.removeItem(productId);
    toast.success('Article retiré du panier');
  };

  return {
    ...cart,
    addToCart,
    updateItemQuantity,
    removeFromCart,
  };
}
