import React from 'react';
import { Layout } from '@/components/layout';
import { ProductCard } from '@/components/product-card';
import products from '@/data/products.json';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import brandSheet from '@/assets/altamo-brand-sheet.png';
import heroMood from '@/assets/altamo-hero-mood.jpg';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-secondary flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-40 mix-blend-multiply"
            style={{ backgroundImage: `url(${heroMood})` }}
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="uppercase tracking-[0.3em] text-sm mb-6 text-foreground/80">Основано в MMXXV</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary mb-8 leading-tight">
            Искусство <br/><span className="italic font-light">повседневной</span> роскоши
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Кураторская коллекция винтажного фарфора, хрусталя и серебра. Редкие предметы с историей для ценителей.
          </p>
          <Link href="/catalog">
            <Button className="h-14 px-10 text-sm uppercase tracking-widest rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
              Смотреть коллекцию
            </Button>
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-primary text-primary-foreground py-4 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee inline-block">
          <span className="mx-8 text-sm uppercase tracking-widest">Антикварный фарфор</span>
          <span className="mx-8 text-sm uppercase tracking-widest">♦</span>
          <span className="mx-8 text-sm uppercase tracking-widest">Винтажный хрусталь</span>
          <span className="mx-8 text-sm uppercase tracking-widest">♦</span>
          <span className="mx-8 text-sm uppercase tracking-widest">Серебряные приборы</span>
          <span className="mx-8 text-sm uppercase tracking-widest">♦</span>
          <span className="mx-8 text-sm uppercase tracking-widest">Редкие находки</span>
          <span className="mx-8 text-sm uppercase tracking-widest">♦</span>
        </div>
        <div className="animate-marquee inline-block" aria-hidden="true">
          <span className="mx-8 text-sm uppercase tracking-widest">Антикварный фарфор</span>
          <span className="mx-8 text-sm uppercase tracking-widest">♦</span>
          <span className="mx-8 text-sm uppercase tracking-widest">Винтажный хрусталь</span>
          <span className="mx-8 text-sm uppercase tracking-widest">♦</span>
          <span className="mx-8 text-sm uppercase tracking-widest">Серебряные приборы</span>
          <span className="mx-8 text-sm uppercase tracking-widest">♦</span>
          <span className="mx-8 text-sm uppercase tracking-widest">Редкие находки</span>
          <span className="mx-8 text-sm uppercase tracking-widest">♦</span>
        </div>
      </div>

      {/* Featured Picks */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl mb-4">Выбор куратора</h2>
            <p className="text-muted-foreground leading-relaxed">
              Знаковые предметы из последних поступлений. Каждый объект отобран за свою исключительную сохранность, клеймо мануфактуры и художественную ценность.
            </p>
          </div>
          <Link href="/catalog">
            <Button variant="outline" className="rounded-none uppercase tracking-widest text-xs h-12 px-8">
              Все поступления
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Mood Section */}
      <section className="bg-secondary py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] bg-muted/50 p-8 flex items-center justify-center">
             <img src={brandSheet} alt="ALTAMO Brand Mood" className="max-w-full max-h-full object-contain mix-blend-multiply" />
          </div>
          <div className="max-w-xl">
            <span className="uppercase tracking-[0.3em] text-xs text-muted-foreground mb-6 block">О нас</span>
            <h2 className="font-serif text-4xl lg:text-5xl mb-8 leading-tight">Возрождение традиций сервировки</h2>
            <p className="text-lg text-foreground/80 mb-6 font-light leading-relaxed">
              ALTAMO — это пространство, где прошлое встречается с настоящим. Мы верим, что старинные предметы не должны пылиться за стеклом витрин; они созданы для того, чтобы жить, украшать современные интерьеры и становиться частью новых семейных историй.
            </p>
            <p className="text-lg text-foreground/80 mb-10 font-light leading-relaxed">
              Наша миссия — находить уникальные артефакты ушедших эпох и возвращать им законное место на вашем столе.
            </p>
            <Link href="/contacts">
              <Button variant="link" className="px-0 uppercase tracking-widest text-sm hover:no-underline hover:text-muted-foreground">
                Читать историю бренда →
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
