import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';

const denominations = [10000, 25000, 50000, 100000];

export default function GiftCards() {
  const [selected, setSelected] = useState(denominations[1]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/3] bg-secondary p-8 flex items-center justify-center border border-border/50">
             <div className="w-full max-w-sm aspect-[1.6/1] bg-primary relative p-6 flex flex-col justify-between text-primary-foreground shadow-2xl shadow-primary/20">
                <div className="font-serif text-2xl tracking-widest">ALTAMO</div>
                <div className="flex justify-between items-end">
                  <div className="text-sm uppercase tracking-widest opacity-80">Gift Card</div>
                  <div className="font-medium text-xl">{formatPrice(selected)}</div>
                </div>
             </div>
          </div>

          <div>
            <h1 className="font-serif text-4xl mb-6">Подарочная карта</h1>
            <p className="text-foreground/80 font-light leading-relaxed mb-10">
              Идеальный подарок для ценителей. Карта позволяет получателю самостоятельно выбрать предмет из коллекции ALTAMO, который гармонично дополнит его интерьер. Доступна в электронном формате или в виде физической карты в подарочном конверте с сургучной печатью.
            </p>

            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">Номинал</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {denominations.map(val => (
                  <Button
                    key={val}
                    variant={selected === val ? 'default' : 'outline'}
                    onClick={() => setSelected(val)}
                    className={`rounded-none h-14 font-medium ${selected === val ? 'bg-primary text-primary-foreground' : 'border-border'}`}
                  >
                    {val / 1000}k
                  </Button>
                ))}
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest text-xs h-14">
              В корзину — {formatPrice(selected)}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
