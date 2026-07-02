import React from 'react';
import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { useShop } from '@/hooks/use-shop';
import { Button } from './ui/button';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const isWishlisted = wishlist.includes(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="group flex flex-col gap-4">
      <div className="relative aspect-square bg-muted rounded-none overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <div className="absolute inset-0 bg-secondary/50 group-hover:bg-transparent transition-colors duration-500 cursor-pointer" />
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-foreground/50 hover:text-primary bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full transition-all duration-300"
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <Button 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest text-xs h-12"
            onClick={() => addToCart(product.id)}
          >
            В корзину
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 px-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand}</span>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif text-lg cursor-pointer hover:text-muted-foreground transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <span className="text-sm font-medium mt-2">{formatPrice(product.price)}</span>
      </div>
    </div>
  );
}
