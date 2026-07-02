import React from 'react';
import { Layout } from '@/components/layout';
import brandSheet from '@/assets/altamo-brand-sheet.png';

export default function Contacts() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-16 text-center">Контакты и Пространство</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="space-y-10 font-light">
            <div>
              <h3 className="font-serif text-2xl mb-4">Бутик</h3>
              <p className="text-foreground/80 leading-relaxed mb-2">
                Москва, Спиридоньевский переулок, 9<br/>
                Вход со двора, звонок "ALTAMO"
              </p>
              <p className="text-muted-foreground text-sm">
                Ежедневно с 12:00 до 21:00<br/>
                Посещение по предварительной записи
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl mb-4">Связь</h3>
              <p className="mb-2"><a href="tel:+74950000000" className="hover:text-muted-foreground transition-colors">+7 (495) 000-00-00</a></p>
              <p className="mb-4"><a href="mailto:boutique@altamo.ru" className="hover:text-muted-foreground transition-colors">boutique@altamo.ru</a></p>
              
              <div className="flex gap-4 text-sm uppercase tracking-widest font-medium">
                <a href="#" className="border-b border-foreground hover:text-muted-foreground hover:border-muted-foreground transition-colors pb-1">WhatsApp</a>
                <a href="#" className="border-b border-foreground hover:text-muted-foreground hover:border-muted-foreground transition-colors pb-1">Telegram</a>
              </div>
            </div>
          </div>

          <div className="aspect-[3/4] bg-muted/50 p-8 flex items-center justify-center relative">
             <img src={brandSheet} alt="ALTAMO Space" className="max-w-full max-h-full object-contain mix-blend-multiply" />
             <div className="absolute inset-0 ring-1 ring-border/50 ring-offset-8 ring-offset-background m-8 pointer-events-none" />
          </div>
        </div>

      </div>
    </Layout>
  );
}
