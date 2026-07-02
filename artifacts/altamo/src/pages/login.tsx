import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl mb-4">{isLogin ? 'Вход' : 'Регистрация'}</h1>
            <p className="text-muted-foreground font-light text-sm">
              {isLogin ? 'Войдите для доступа к истории заказов и избранному.' : 'Создайте аккаунт для привилегий клуба ALTAMO.'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Имя</Label>
                <Input id="name" placeholder="Ваше имя" className="rounded-none h-12 bg-transparent border-border focus-visible:ring-primary" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email</Label>
              <Input id="email" type="email" placeholder="example@domain.com" className="rounded-none h-12 bg-transparent border-border focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-widest text-muted-foreground">Пароль</Label>
              <Input id="password" type="password" className="rounded-none h-12 bg-transparent border-border focus-visible:ring-primary" />
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest text-xs h-14 mt-4">
              {isLogin ? 'Войти' : 'Создать аккаунт'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border"
            >
              {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
