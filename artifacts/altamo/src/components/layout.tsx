import React from 'react';
import { Link, useLocation } from 'wouter';
import { useShop } from '@/hooks/use-shop';
import { ShoppingBag, Heart, Search, Menu, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import logoBlack from '@assets/logo_black_nobg_1783694481163.webp';
import logoWhite from '@assets/logo_white_1783689786646.webp';

export function Layout({ children }: { children: React.ReactNode }) {
  const { cart, wishlist } = useShop();
  const [location] = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const isHome = location === '/' || location === '/about';

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 w-full transition-colors duration-300" style={{
        background: isHome ? 'rgba(0, 0, 0, 0.30)' : 'rgba(243, 238, 229, 0.65)',
        backdropFilter: 'blur(32px) saturate(160%)',
        WebkitBackdropFilter: 'blur(32px) saturate(160%)',
        borderBottom: isHome ? '1px solid rgba(255, 255, 255, 0.09)' : '1px solid rgba(255, 255, 255, 0.50)',
        boxShadow: isHome
          ? '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.10)'
          : '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      }}>
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={`rounded-xl ${isHome ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted/50'}`}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r border-border bg-background p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-border flex items-center h-24">
                    <span className="font-serif text-2xl font-bold tracking-widest text-primary">ALTAMO</span>
                  </div>
                  <div className="flex-1 overflow-auto py-8 px-6 space-y-6">
                    <nav className="flex flex-col space-y-4 text-lg font-serif">
                      <Link href="/catalog" className="hover:text-muted-foreground transition-colors">Каталог</Link>
                      <Link href="/events" className="hover:text-muted-foreground transition-colors">Мероприятия</Link>
                      <Link href="/about" className="hover:text-muted-foreground transition-colors">О нас</Link>
                      <Link href="/gift-cards" className="hover:text-muted-foreground transition-colors">Подарочные карты</Link>
                    </nav>
                    <div className="h-px bg-border w-full" />
                    <nav className="flex flex-col space-y-4 text-sm font-light uppercase tracking-widest text-muted-foreground">
                      <Link href="/payment-delivery" className="hover:text-foreground transition-colors">Оплата и доставка</Link>
                      <Link href="/contacts" className="hover:text-foreground transition-colors">Контакты</Link>
                      <Link href="/login" className="hover:text-foreground transition-colors">Войти</Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className={`hidden lg:flex items-center gap-10 text-xs uppercase tracking-[0.15em] font-medium ${isHome ? 'text-white/90' : 'text-foreground'}`}>
            <Link href="/catalog" className={`transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-px after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${isHome ? 'hover:text-white/60 after:bg-white' : 'hover:text-muted-foreground after:bg-foreground'} ${location.startsWith('/catalog') ? 'after:scale-x-100' : ''}`}>
              Каталог
            </Link>
            <Link href="/events" className={`transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-px after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${isHome ? 'hover:text-white/60 after:bg-white' : 'hover:text-muted-foreground after:bg-foreground'} ${location.startsWith('/events') ? 'after:scale-x-100' : ''}`}>
              Мероприятия
            </Link>
            <Link href="/about" className={`transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-px after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${isHome ? 'hover:text-white/60 after:bg-white' : 'hover:text-muted-foreground after:bg-foreground'} ${location === '/about' ? 'after:scale-x-100' : ''}`}>
              О нас
            </Link>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 h-full py-3">
            <Link href="/" className="h-full flex items-center">
              {isHome ? (
                <img
                  src={logoWhite}
                  alt="ALTAMO"
                  className="h-full max-h-16 object-contain"
                  style={{ mixBlendMode: 'screen' }}
                />
              ) : (
                <img
                  src={logoBlack}
                  alt="ALTAMO"
                  className="h-full max-h-16 object-contain"
                />
              )}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="icon" className={`hidden lg:flex rounded-xl ${isHome ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted/50'}`}>
                <User className="h-5 w-5 stroke-[1.5]" />
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className={`relative rounded-xl ${isHome ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted/50'}`}>
                <Heart className="h-5 w-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <Badge className="absolute top-0 right-0 h-4 min-w-4 px-1 flex items-center justify-center rounded-none bg-primary text-primary-foreground text-[9px] font-medium -translate-y-1/3 translate-x-1/3 border-none">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className={`relative rounded-xl ${isHome ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted/50'}`}>
                <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <Badge className="absolute top-0 right-0 h-4 min-w-4 px-1 flex items-center justify-center rounded-none bg-primary text-primary-foreground text-[9px] font-medium -translate-y-1/3 translate-x-1/3 border-none">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-primary text-primary-foreground py-20 border-t border-border">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          <div className="col-span-1 md:col-span-12 lg:col-span-5 flex flex-col items-start">
             <img src={logoWhite} alt="ALTAMO" className="h-24 object-contain mb-8" style={{ mixBlendMode: 'screen' }} />
            <p className="text-primary-foreground/70 max-w-sm leading-relaxed font-light text-sm">
              Коллекция винтажной посуды и декора. Мы находим редкие предметы с историей для вашего дома.
            </p>
          </div>
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="font-sans text-xs uppercase tracking-widest mb-8 opacity-50">Навигация</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/catalog" className="hover:opacity-70 transition-opacity">Каталог</Link></li>
              <li><Link href="/events" className="hover:opacity-70 transition-opacity">Мероприятия</Link></li>
              <li><Link href="/gift-cards" className="hover:opacity-70 transition-opacity">Подарочные карты</Link></li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="font-sans text-xs uppercase tracking-widest mb-8 opacity-50">Информация</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/about" className="hover:opacity-70 transition-opacity">О нас</Link></li>
              <li><Link href="/payment-delivery" className="hover:opacity-70 transition-opacity">Оплата и доставка</Link></li>
              <li><Link href="/contacts" className="hover:opacity-70 transition-opacity">Контакты</Link></li>
              <li><Link href="/login" className="hover:opacity-70 transition-opacity">Личный кабинет</Link></li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
             <h4 className="font-sans text-xs uppercase tracking-widest mb-8 opacity-50">Рассылка</h4>
             <p className="text-sm font-light text-primary-foreground/70 mb-4">
               Узнавайте первыми о новых редких поступлениях.
             </p>
             <div className="flex border-b border-primary-foreground/30 pb-2">
               <input type="email" placeholder="Ваш Email" className="bg-transparent border-none outline-none w-full text-sm font-light placeholder:text-primary-foreground/30" />
               <button className="uppercase tracking-widest text-[10px] font-medium hover:opacity-70 transition-opacity">Подписаться</button>
             </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-20 pt-8 border-t border-primary-foreground/10 text-center text-xs tracking-widest uppercase text-primary-foreground/40">
          © {new Date().getFullYear()} ALTAMO Moscow. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
