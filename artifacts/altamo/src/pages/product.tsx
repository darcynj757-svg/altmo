import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Layout } from '@/components/layout';
import products from '@/data/products.json';
import { Button } from '@/components/ui/button';
import { useShop } from '@/hooks/use-shop';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart } from 'lucide-react';
import { productImages, darkBgProducts } from '@/data/product-images';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [, setLocation] = useLocation();
  const product = products.find(p => p.id === params.id);
  const { addToCart, toggleWishlist, wishlist } = useShop();

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-3xl mb-4">Предмет не найден</h1>
          <Button variant="outline" onClick={() => setLocation('/catalog')} className="rounded-none uppercase tracking-widest text-xs">
            В каталог
          </Button>
        </div>
      </Layout>
    );
  }

  const [activeImg, setActiveImg] = useState(0);
  const isWishlisted = wishlist.includes(product.id);
  const mainImage = productImages[product.id];
  const isDark = darkBgProducts.has(product.id);
  // Show up to 3 thumbnails (cycling through nearby product images for variety)
  const thumbIds = [product.id, ...Object.keys(productImages).filter(k => k !== product.id).slice(0, 2)];
  const thumbImages = thumbIds.map(id => productImages[id]).filter(Boolean);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className={`aspect-square w-full relative overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-muted'}`}>
              {mainImage ? (
                <img
                  src={thumbImages[activeImg] ?? mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-serif text-2xl">ALTAMO</div>
              )}
            </div>
            {thumbImages.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {thumbImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`aspect-square overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-primary' : 'border-transparent'} ${isDark ? 'bg-[#0a0a0a]' : 'bg-muted'}`}
                    aria-label={`Фото ${i + 1}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col pt-8">
            <span className="uppercase tracking-[0.2em] text-xs text-muted-foreground mb-4">{product.brand}</span>
            <h1 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">{product.name}</h1>
            <div className="text-2xl font-medium mb-8">{formatPrice(product.price)}</div>

            <p className="text-foreground/80 leading-relaxed font-light mb-10">
              {product.description}
            </p>

            <div className="flex gap-4 mb-12">
              <Button 
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest text-xs h-14"
                onClick={() => addToCart(product.id)}
              >
                Добавить в корзину
              </Button>
              <Button 
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-none border-border hover:bg-muted"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
              </Button>
            </div>

            <Tabs defaultValue="attributes" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b border-border h-auto p-0 bg-transparent mb-8">
                <TabsTrigger value="attributes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 mr-8 uppercase tracking-widest text-xs">Характеристики</TabsTrigger>
                <TabsTrigger value="delivery" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 uppercase tracking-widest text-xs">Доставка</TabsTrigger>
              </TabsList>
              <TabsContent value="attributes" className="text-sm font-light space-y-4">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Бренд</span>
                  <span>{product.brand}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Материал</span>
                  <span>{product.material}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Страна</span>
                  <span>{product.country}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Эпоха / Коллекция</span>
                  <span>{product.collection}</span>
                </div>
              </TabsContent>
              <TabsContent value="delivery" className="text-sm font-light leading-relaxed text-foreground/80">
                <p className="mb-4">Мы осуществляем бережную доставку антикварных и хрупких предметов специализированными курьерскими службами с полной страховкой груза.</p>
                <p>Доставка по Москве: 1-2 рабочих дня.<br/>Доставка по России: 3-7 рабочих дней.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
