import React from 'react';
import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '@/hooks/use-shop';
import { Button } from './ui/button';
import { productImages, darkBgProducts } from '@/data/product-images';

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
  const imageUrl = productImages[product.id];
  const isDark = darkBgProducts.has(product.id);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <motion.div
      className="group flex flex-col gap-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        className={`relative aspect-square overflow-hidden ${
          isDark ? 'bg-[#0a0a0a]' : 'bg-secondary/20'
        }`}
      >
        <Link href={`/product/${product.id}`}>
          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
          ) : (
            <div className="absolute inset-0 bg-secondary/40" />
          )}
          {/* Subtle hover vignette */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 cursor-pointer" />
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 glass rounded-full w-9 h-9 text-white/80 hover:text-white transition-all duration-300 z-10"
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? 'fill-white text-white' : ''}`}
          />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out z-10">
          <Button
            className="w-full glass-dark text-white hover:bg-white/20 border-white/20 rounded-none uppercase tracking-widest text-[10px] h-11 font-medium"
            onClick={() => addToCart(product.id)}
          >
            В корзину
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
          {product.brand}
        </span>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif text-lg cursor-pointer hover:text-muted-foreground transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>
        </Link>
        <span className="text-sm font-medium mt-1 tracking-wide">
          {formatPrice(product.price)}
        </span>
      </div>
    </motion.div>
  );
}
