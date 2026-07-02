import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Layout } from '@/components/layout';
import { ProductCard } from '@/components/product-card';
import products from '@/data/products.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Catalog({ params }: { params?: { category?: string } }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  
  const categoryFilter = params?.category ? decodeURIComponent(params.category) : null;
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // Get URL search params for brand (from brands page)
  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const brandParam = queryParams.get('brand');
    if (brandParam) {
      setSelectedBrands([brandParam]);
    }
  }, []);

  const allBrands = Array.from(new Set(products.map(p => p.brand))).sort();
  const allMaterials = Array.from(new Set(products.map(p => p.material.split(',')[0].trim()))).sort();

  const toggleFilter = (item: string, list: string[], setList: (l: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const filteredProducts = products.filter(p => {
    if (categoryFilter && p.category.toLowerCase() !== categoryFilter.toLowerCase() && p.subcategory.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (selectedMaterials.length > 0 && !selectedMaterials.some(m => p.material.includes(m))) return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    return 0; // default newest (mocked)
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 pb-6 border-b border-border">
          <div>
            <span className="uppercase tracking-[0.2em] text-xs text-muted-foreground mb-2 block">Коллекция</span>
            <h1 className="font-serif text-5xl">{categoryFilter ? categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1) : 'Все предметы'}</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-end">
            <p className="text-xs uppercase tracking-widest text-muted-foreground hidden md:block mr-4 mb-2">{filteredProducts.length} предметов</p>
            <Input 
              placeholder="Поиск..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-none border-border bg-transparent w-full sm:w-64 h-10"
            />
            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)}
              className="h-10 px-4 py-2 border border-border bg-transparent rounded-none text-sm focus:outline-none focus:ring-1 focus:ring-primary uppercase tracking-widest text-xs min-w-[200px]"
            >
              <option value="newest">Новые поступления</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <Accordion type="multiple" defaultValue={['category', 'brand', 'material']} className="w-full">
              <AccordionItem value="category" className="border-border">
                <AccordionTrigger className="font-serif text-lg hover:no-underline">Категории</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 text-sm font-light mt-2">
                    <li><Link href="/catalog" className={`hover:text-muted-foreground transition-colors ${!categoryFilter ? 'font-medium' : 'text-muted-foreground'}`}>Все предметы</Link></li>
                    <li><Link href="/catalog/посуда" className={`hover:text-muted-foreground transition-colors ${categoryFilter === 'посуда' ? 'font-medium' : 'text-muted-foreground'}`}>Посуда</Link></li>
                    <li><Link href="/catalog/декор" className={`hover:text-muted-foreground transition-colors ${categoryFilter === 'декор' ? 'font-medium' : 'text-muted-foreground'}`}>Декор</Link></li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="brand" className="border-border">
                <AccordionTrigger className="font-serif text-lg hover:no-underline">Мануфактуры</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 mt-2">
                    {allBrands.map(brand => (
                      <div key={brand} className="flex items-center space-x-3">
                        <Checkbox 
                          id={`brand-${brand}`} 
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                          className="rounded-none border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm font-light cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="material" className="border-border">
                <AccordionTrigger className="font-serif text-lg hover:no-underline">Материал</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 mt-2">
                    {allMaterials.map(mat => (
                      <div key={mat} className="flex items-center space-x-3">
                        <Checkbox 
                          id={`mat-${mat}`} 
                          checked={selectedMaterials.includes(mat)}
                          onCheckedChange={() => toggleFilter(mat, selectedMaterials, setSelectedMaterials)}
                          className="rounded-none border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <Label htmlFor={`mat-${mat}`} className="text-sm font-light cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {mat}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-secondary/50 border border-border">
                <p className="text-muted-foreground mb-6 font-light">По вашему запросу ничего не найдено.</p>
                <Button variant="outline" className="rounded-none uppercase tracking-widest text-xs h-12 px-8 bg-transparent" onClick={() => {
                  setSearch(''); 
                  setSelectedBrands([]);
                  setSelectedMaterials([]);
                }}>
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
