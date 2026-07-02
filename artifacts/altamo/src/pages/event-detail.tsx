import React from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';

export default function EventDetail({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">Лекция и дегустация</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Искусство сервировки: Французский фарфор XIX века</h1>
          <div className="text-sm tracking-widest uppercase mb-8 inline-block border-b border-primary pb-2">
            15 Октября, 19:00
          </div>
        </div>

        <div className="aspect-[21/9] bg-muted mb-12" />

        <div className="prose prose-lg prose-headings:font-serif prose-p:font-light prose-p:leading-relaxed mx-auto mb-16 dark:prose-invert">
          <p>
            Приглашаем вас на камерную встречу, посвященную истории французских мануфактур. Мы поговорим о том, как развивалось искусство росписи, научимся читать клейма и отличать стили разных эпох.
          </p>
          <p>
            В практической части вечера мы продемонстрируем правила парадной сервировки с использованием подлинных антикварных предметов из коллекции ALTAMO. Завершит встречу дегустация шампанского из винтажных хрустальных бокалов.
          </p>
          
          <h3>В программе вечера:</h3>
          <ul>
            <li>История мануфактур Севра и Лиможа</li>
            <li>Эволюция форм и декора</li>
            <li>Практика чтения клейм</li>
            <li>Мастер-класс по сервировке</li>
          </ul>
        </div>

        <div className="text-center bg-secondary p-12">
          <h3 className="font-serif text-2xl mb-4">Участие</h3>
          <p className="text-muted-foreground font-light mb-8">
            Количество мест строго ограничено (до 10 человек).<br/>Стоимость участия: 5 000 ₽
          </p>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest text-xs h-14 px-12">
              Запись через WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </Layout>
  );
}
