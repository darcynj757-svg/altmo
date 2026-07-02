import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import products from '@/data/products.json';

export default function Brands() {
  const [search, setSearch] = useState('');

  // Extract unique brands
  const brands = Array.from(new Set(products.map(p => p.brand))).sort();

  const filteredBrands = brands.filter(b => b.toLowerCase().includes(search.toLowerCase()));

  // Group by first letter
  const grouped = filteredBrands.reduce((acc, brand) => {
    const letter = brand[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(brand);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Мануфактуры</h1>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto mb-10">
            Мы работаем с наследием легендарных европейских и мировых фабрик. Откройте для себя историю через предметы искусства.
          </p>
          <Input 
            placeholder="Поиск по названию мануфактуры..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded-none border-border bg-transparent w-full max-w-md mx-auto text-center placeholder:text-center"
          />
        </div>

        <div className="space-y-16">
          {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([letter, letterBrands]) => (
            <div key={letter} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start border-t border-border pt-8">
              <div className="font-serif text-6xl text-muted/50">{letter}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 flex-1 pt-4">
                {letterBrands.map(brand => (
                  <Link key={brand} href={`/catalog?brand=${encodeURIComponent(brand)}`}>
                    <div className="group cursor-pointer">
                      <h3 className="font-serif text-xl group-hover:text-muted-foreground transition-colors">{brand}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {filteredBrands.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Мануфактуры не найдены.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
