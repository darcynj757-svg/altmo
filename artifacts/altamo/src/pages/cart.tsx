import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { useShop } from '@/hooks/use-shop';
import products from '@/data/products.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'wouter';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useShop();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return { ...item, product };
  }).filter(item => item.product !== undefined) as (typeof cart[0] & { product: typeof products[0] })[];

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const delivery = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + delivery;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  if (step === 'success') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center max-w-2xl">
          <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="font-serif text-4xl mb-6">Заказ оформлен</h1>
          <p className="text-muted-foreground font-light mb-12 text-lg">
            Благодарим за доверие к ALTAMO. Наш куратор свяжется с вами в ближайшее время для подтверждения деталей доставки.
          </p>
          <Link href="/catalog">
            <Button className="rounded-none uppercase tracking-widest text-xs h-14 px-12 bg-primary text-primary-foreground">
              Вернуться в каталог
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="font-serif text-4xl mb-12">{step === 'cart' ? 'Корзина' : 'Оформление заказа'}</h1>

        {cartItems.length === 0 ? (
          <div className="py-24 text-center border-t border-border">
            <p className="text-muted-foreground mb-8 text-lg font-light">Ваша корзина пуста.</p>
            <Link href="/catalog">
              <Button className="rounded-none uppercase tracking-widest text-xs h-12 px-8 bg-primary text-primary-foreground">
                Перейти в каталог
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-8">
              {step === 'cart' ? (
                <div className="space-y-8">
                  <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
                    <div className="col-span-6">Предмет</div>
                    <div className="col-span-3 text-center">Количество</div>
                    <div className="col-span-3 text-right">Сумма</div>
                  </div>
                  {cartItems.map(item => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-8 border-b border-border">
                      <div className="md:col-span-6 flex gap-6">
                        <Link href={`/product/${item.product.id}`}>
                          <div className="w-24 h-24 bg-muted shrink-0 cursor-pointer" />
                        </Link>
                        <div className="flex flex-col justify-center">
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{item.product.brand}</span>
                          <Link href={`/product/${item.product.id}`}>
                            <h3 className="font-serif text-lg hover:text-muted-foreground transition-colors cursor-pointer line-clamp-2">{item.product.name}</h3>
                          </Link>
                          <span className="text-sm font-medium mt-2 md:hidden">{formatPrice(item.product.price)}</span>
                        </div>
                      </div>
                      
                      <div className="md:col-span-3 flex justify-start md:justify-center items-center">
                        <div className="flex items-center border border-border">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-muted transition-colors">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-muted transition-colors">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-3 flex justify-between md:justify-end items-center">
                        <span className="text-lg font-medium hidden md:block">{formatPrice(item.product.price * item.quantity)}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors ml-4 p-2">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-12">
                  <div className="space-y-6">
                    <h3 className="font-serif text-2xl border-b border-border pb-4">Контактные данные</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-xs uppercase tracking-widest text-muted-foreground">Имя *</Label>
                        <Input id="firstName" required className="rounded-none h-12 bg-transparent border-border" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-xs uppercase tracking-widest text-muted-foreground">Фамилия *</Label>
                        <Input id="lastName" required className="rounded-none h-12 bg-transparent border-border" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email *</Label>
                        <Input id="email" type="email" required className="rounded-none h-12 bg-transparent border-border" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-muted-foreground">Телефон *</Label>
                        <Input id="phone" type="tel" required className="rounded-none h-12 bg-transparent border-border" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-serif text-2xl border-b border-border pb-4">Доставка</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-xs uppercase tracking-widest text-muted-foreground">Город *</Label>
                        <Input id="city" required defaultValue="Москва" className="rounded-none h-12 bg-transparent border-border" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-xs uppercase tracking-widest text-muted-foreground">Улица, дом, квартира *</Label>
                        <Input id="address" required className="rounded-none h-12 bg-transparent border-border" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comment" className="text-xs uppercase tracking-widest text-muted-foreground">Комментарий курьеру</Label>
                        <Input id="comment" className="rounded-none h-12 bg-transparent border-border" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="font-serif text-2xl border-b border-border pb-4">Оплата</h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3 border border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <input type="radio" name="payment" value="card" className="accent-primary" defaultChecked />
                        <span className="font-light">Оплата картой онлайн</span>
                      </label>
                      <label className="flex items-center space-x-3 border border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <input type="radio" name="payment" value="courier" className="accent-primary" />
                        <span className="font-light">Оплата курьеру при получении</span>
                      </label>
                    </div>
                  </div>
                </form>
              )}
            </div>

            <div className="lg:col-span-4">
              <div className="bg-secondary/50 border border-border p-8 sticky top-32">
                <h3 className="font-serif text-2xl mb-6">Ваш заказ</h3>
                
                {step === 'checkout' && (
                  <div className="mb-6 space-y-4 max-h-64 overflow-auto pr-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4 text-sm">
                        <div className="w-12 h-12 bg-muted shrink-0" />
                        <div>
                          <p className="font-medium line-clamp-1">{item.product.name}</p>
                          <p className="text-muted-foreground">{item.quantity} × {formatPrice(item.product.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-4 text-sm font-light mb-8 pt-6 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Подытог</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>{delivery === 0 ? 'Бесплатно' : formatPrice(delivery)}</span>
                  </div>
                  <div className="border-t border-border pt-4 mt-4 flex justify-between font-serif text-2xl text-foreground">
                    <span>Итого</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {step === 'cart' ? (
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 uppercase tracking-widest text-xs group"
                    onClick={() => setStep('checkout')}
                  >
                    Оформить заказ
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button 
                    form="checkout-form"
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 uppercase tracking-widest text-xs"
                  >
                    Подтвердить и оплатить
                  </Button>
                )}
                
                {step === 'checkout' && (
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 rounded-none uppercase tracking-widest text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setStep('cart')}
                  >
                    Вернуться в корзину
                  </Button>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </Layout>
  );
}
