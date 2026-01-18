'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useUIStore } from '@/stores/ui.store';

export function Header() {
  const { getItemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { openCart, openSearch, openMobileMenu } = useUIStore();

  const cartCount = getItemCount();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={openMobileMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="text-xl font-bold">
            YouCom
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Catalogue
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Catégories
            </Link>
            <Link
              href="/deals"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Promotions
            </Link>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={openSearch}
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </Button>

          {isAuthenticated && user ? (
            <Link href="/account">
              <Button variant="ghost" size="icon" aria-label="Mon compte">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={openCart}
            className="relative"
            aria-label="Panier"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 min-w-5 px-1 text-xs"
              >
                {cartCount}
              </Badge>
            )}
          </Button>

          {isAuthenticated && user?.role === 'admin' && (
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Admin
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
