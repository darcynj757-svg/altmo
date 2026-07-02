import React from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const mockEvents = [
  {
    id: "1",
    title: "Искусство сервировки: Французский фарфор XIX века",
    date: "15 Октября, 19:00",
    type: "Лекция и дегустация",
    image: "bg-muted"
  },
  {
    id: "2",
    title: "Антикварное серебро: Как отличить подлинник",
    date: "28 Октября, 18:30",
    type: "Мастер-класс",
    image: "bg-muted/80"
  }
];

export default function Events() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-xs text-muted-foreground mb-4 block">Салон ALTAMO</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Мероприятия</h1>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
            Лекции, мастер-классы и камерные встречи для коллекционеров и ценителей винтажного искусства в нашем пространстве.
          </p>
        </div>

        <div className="space-y-12">
          {mockEvents.map(event => (
            <div key={event.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center group">
              <div className={`aspect-[4/3] ${event.image} relative overflow-hidden`}>
                 <Link href={`/events/${event.id}`}>
                    <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-colors duration-500 cursor-pointer" />
                 </Link>
              </div>
              <div className="flex flex-col items-start px-0 md:px-8">
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{event.type}</span>
                <Link href={`/events/${event.id}`}>
                  <h2 className="font-serif text-3xl mb-4 hover:text-muted-foreground transition-colors cursor-pointer">{event.title}</h2>
                </Link>
                <div className="text-sm tracking-widest uppercase mb-8 border-l-2 border-primary pl-4 py-1">
                  {event.date}
                </div>
                <Link href={`/events/${event.id}`}>
                  <Button variant="outline" className="rounded-none uppercase tracking-widest text-xs h-12 px-8">
                    Подробнее
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
