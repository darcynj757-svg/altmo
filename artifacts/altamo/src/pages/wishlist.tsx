import React from 'react';
import { Layout } from '@/components/layout';
import { ProductCard } from '@/components/product-card';
import { useShop } from '@/hooks/use-shop';
import products from '@/data/products.json';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Wishlist() {
  const { wishlist } = useShop();

  const wishlistProducts = wishlist.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl mb-4">Избранное</h1>
        <p className="text-muted-foreground mb-12">{wishlistProducts.length} предметов</p>

        {wishlistProducts.length === 0 ? (
          <div className="py-24 text-center border-t border-border">
            <p className="text-muted-foreground mb-8 text-lg font-light">В вашем списке избранного пока нет предметов.</p>
            <Link href="/catalog">
              <Button className="rounded-none uppercase tracking-widest text-xs h-12 px-8 bg-primary text-primary-foreground">
                Перейти в каталог
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
