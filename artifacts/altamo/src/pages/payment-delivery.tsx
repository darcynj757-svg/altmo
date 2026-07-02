import React from 'react';
import { Layout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PaymentDelivery() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-12 text-center">Оплата и доставка</h1>

        <Tabs defaultValue="delivery" className="w-full">
          <TabsList className="w-full justify-center rounded-none border-b border-border h-auto p-0 bg-transparent mb-12">
            <TabsTrigger value="delivery" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 pb-4 uppercase tracking-widest text-xs">Доставка</TabsTrigger>
            <TabsTrigger value="payment" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 pb-4 uppercase tracking-widest text-xs">Оплата</TabsTrigger>
            <TabsTrigger value="returns" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 pb-4 uppercase tracking-widest text-xs">Возврат</TabsTrigger>
          </TabsList>
          
          <TabsContent value="delivery" className="prose prose-lg prose-headings:font-serif prose-p:font-light prose-p:leading-relaxed mx-auto dark:prose-invert">
            <h3>Бережная доставка антиквариата</h3>
            <p>Каждый предмет в коллекции ALTAMO уникален. Мы уделяем особое внимание упаковке, используя профессиональные амортизирующие материалы и кастомные короба для обеспечения полной сохранности хрупких объектов (фарфора, хрусталя, стекла).</p>
            
            <h4>По Москве</h4>
            <p>Осуществляется персональным курьером бутика. Срок: 1-2 рабочих дня. Стоимость: бесплатно для заказов от 50 000 ₽. Возможна примерка предметов в вашем интерьере (до 3 позиций).</p>
            
            <h4>По России и миру</h4>
            <p>Мы работаем со специализированными транспортными компаниями, имеющими опыт перевозки произведений искусства. Все отправления подлежат обязательному страхованию на полную стоимость. Сроки и стоимость рассчитываются индивидуально менеджером после оформления заказа.</p>
          </TabsContent>
          
          <TabsContent value="payment" className="prose prose-lg prose-headings:font-serif prose-p:font-light prose-p:leading-relaxed mx-auto dark:prose-invert">
            <h3>Способы оплаты</h3>
            <p>Мы предлагаем несколько удобных и безопасных способов оплаты для наших клиентов:</p>
            <ul>
              <li><strong>Банковской картой онлайн:</strong> Безопасная оплата через платежный шлюз (Visa, Mastercard, МИР).</li>
              <li><strong>Оплата в бутике:</strong> При самовывозе или после примерки курьером (наличные, терминал).</li>
              <li><strong>Оплата по счету:</strong> Для юридических лиц и крупных заказов мы выставляем счет для безналичной оплаты.</li>
            </ul>
          </TabsContent>

          <TabsContent value="returns" className="prose prose-lg prose-headings:font-serif prose-p:font-light prose-p:leading-relaxed mx-auto dark:prose-invert">
            <h3>Политика возврата</h3>
            <p>В соответствии с законодательством РФ, предметы антиквариата надлежащего качества обмену и возврату не подлежат. Тем не менее, мы всегда идем навстречу нашим клиентам.</p>
            <p>Если предмет вам не подошел, свяжитесь с нами в течение 3 дней после получения. В индивидуальном порядке мы можем рассмотреть возможность возврата или обмена на другой предмет из коллекции (с удержанием стоимости логистики и страховки).</p>
            <p>В случае повреждения предмета при транспортировке нашей логистической службой, полная стоимость возмещается страховой компанией.</p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
