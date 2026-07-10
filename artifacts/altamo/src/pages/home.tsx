import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Layout } from '@/components/layout';
import { ProductCard } from '@/components/product-card';
import products from '@/data/products.json';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

// Hero & atmospheric
import heroImg from '@assets/e3f990286a2eef82cad6e1f7ea6de46bcefedb1f_1783679793166.png';
import keyholePlatesImg from '@assets/66a1acd36dde2b9954603d1fabb9c401badd09f4_1783679793165.png';
import platesCollectionImg from '@assets/8c27f3e260a41a3a3362919afe04c61d1e3be61a_1783679793164.png';

// Vases
import vaseBlueBlackImg from '@assets/60474dc4c92fe280abcfb7069a03e2c2fbf109fa_1783679793165.png';
import vaseCreamBlackImg from '@assets/b1e4948aa9a2850cf7cc86852a174a865882b8b8_1783679793165.png';
import teacupBlackImg from '@assets/4b981288a3538c2b778516b210d4117c70ff680f_1783679793164.png';

// Cutlery
import forkImg from '@assets/7adead752b0c6e15c55e21a2b62200b527e06a60_1783679793164.png';
import spoonImg from '@assets/1572e47c56890da1c05318fecfff17703f691e6b_1783679793165.png';
import knifeImg from '@assets/c450b7fc0359456efbc7c62bc671cb759686c134_1783679793166.png';

// Keys
import keyOrnateImg from '@assets/8c71473387efa64f81407be5adda47e845d933e0_1783679793164.png';
import keyPearlImg from '@assets/ede569ecabba6caf47e3f878acb6e21d83f392fd_1783679793166.png';
import keyHorizImg from '@assets/542f8d5773695d21e0e285968025034e41edd21e_1783679793165.png';

// Keyhole
import keyholeImg from '@assets/52a243dcc7a329769fe523baaf7b2dd0da7ca86f_1783679793164.png';
import keyholeVelvetImg from '@assets/bb246febba3eef9cb8964a9d2fc8f6bb110fbd15_1783679793165.png';

// Heraldic
import crestImg from '@assets/197098aeb793ac905cce6d28a96494917d54816f_1783679793165.png';

// ─── Reusable animation wrappers ────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.1, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({
  children,
  from = 'left',
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  from?: 'left' | 'right';
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: from === 'left' ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.0, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <Layout>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 z-0 scale-110"
          style={{ y: heroY }}
        >
          <img
            src={heroImg}
            alt="ALTAMO"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Liquid glass text card */}
        <motion.div
          className="relative z-10 text-center px-8 py-12 md:px-16 md:py-16 max-w-3xl mx-4 glass"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        >
          <motion.span
            className="uppercase tracking-[0.35em] text-xs mb-6 block text-white/70 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Основано в MMXXV
          </motion.span>
          <motion.h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Искусство{' '}
            <span className="italic font-light">повседневной</span>{' '}
            роскоши
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-white/75 mb-10 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Кураторская коллекция винтажного фарфора, хрусталя и серебра.
            Редкие предметы с историей для ценителей.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <Link href="/catalog">
              <Button className="h-13 px-10 text-xs uppercase tracking-[0.2em] rounded-none bg-white text-black hover:bg-white/90 font-medium">
                Смотреть коллекцию
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-white/40 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            className="w-px h-12 bg-white/30"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <div className="bg-[#0a0a0a] text-white/80 py-4 overflow-hidden flex whitespace-nowrap border-y border-white/5">
        {[0, 1].map((i) => (
          <div key={i} className="animate-marquee inline-block" aria-hidden={i > 0}>
            {[
              'Антикварный фарфор',
              '✦',
              'Винтажный хрусталь',
              '✦',
              'Серебряные приборы',
              '✦',
              'Редкие находки',
              '✦',
              'Коллекционные вазы',
              '✦',
              'Ювелирный декор',
              '✦',
            ].map((item, idx) => (
              <span key={idx} className="mx-8 text-[11px] uppercase tracking-[0.25em]">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* ── KEYHOLE EDITORIAL ────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
        <SlideIn from="left" className="relative overflow-hidden min-h-[60vh] lg:min-h-auto">
          <img
            src={keyholePlatesImg}
            alt="Коллекция"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </SlideIn>
        <div className="bg-[#0c0c0c] flex items-center px-12 py-20 lg:px-20">
          <div className="max-w-lg">
            <FadeUp delay={0.1}>
              <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] mb-8 block">
                Дух коллекции
              </span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
                Сквозь замочную скважину{' '}
                <span className="italic font-light">времени</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-white/55 text-lg font-light leading-relaxed mb-6">
                Каждый предмет из нашего собрания несёт в себе взгляд ушедшей эпохи. Мы
                находим их в закрытых частных коллекциях, на аукционах старых домов,
                в семейных особняках — там, куда не добирается время.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <p className="text-white/40 text-base font-light leading-relaxed mb-10">
                Традиция «lover's eye» — миниатюрных портретов глаза на ювелирных изделиях — 
                возникла в Георгианской Англии как знак тайной любви. ALTAMO возрождает этот язык.
              </p>
            </FadeUp>
            <FadeUp delay={0.5}>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="rounded-none border-white/20 text-white/70 hover:bg-white/10 hover:text-white uppercase tracking-[0.2em] text-[10px] h-12 px-8"
                >
                  Изучить коллекцию
                </Button>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="py-28 container mx-auto px-4">
        <FadeUp>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 block mb-4">
                Новые поступления
              </span>
              <h2 className="font-serif text-4xl md:text-5xl">Выбор куратора</h2>
            </div>
            <Link href="/catalog">
              <Button
                variant="outline"
                className="rounded-none uppercase tracking-[0.2em] text-[10px] h-12 px-8 shrink-0"
              >
                Все поступления
              </Button>
            </Link>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FULL-BLEED EDITORIAL: PLATES ─────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[500px] overflow-hidden flex items-center justify-center">
        <FadeIn className="absolute inset-0 z-0">
          <img
            src={platesCollectionImg}
            alt="Коллекция посуды"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </FadeIn>
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <FadeUp>
            <span className="text-white/40 text-[10px] uppercase tracking-[0.35em] block mb-6">
              Редкое собрание
            </span>
          </FadeUp>
          <FadeUp delay={0.15}>
            <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight italic font-light mb-8">
              «Красота предмета — в следах прожитых эпох»
            </blockquote>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="inline-block glass px-8 py-4">
              <Link href="/catalog">
                <span className="text-white/80 text-[11px] uppercase tracking-[0.3em] cursor-pointer hover:text-white transition-colors">
                  Смотреть весь каталог →
                </span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CUTLERY FLOAT ────────────────────────────────────────────────── */}
      <section className="bg-[#050505] py-28 overflow-hidden">
        <div className="container mx-auto px-4 mb-16">
          <FadeUp>
            <span className="text-white/25 text-[10px] uppercase tracking-[0.35em] block mb-4">
              Столовые приборы
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              Серебряные{' '}
              <span className="italic font-light">церемонии</span>
            </h2>
          </FadeUp>
        </div>

        <div className="flex justify-center items-end gap-0 md:gap-8 overflow-hidden">
          {[
            { src: forkImg, delay: 0, rotate: -3, label: 'Вилка' },
            { src: spoonImg, delay: 0.15, rotate: 0, label: 'Ложка' },
            { src: knifeImg, delay: 0.3, rotate: 3, label: 'Нож' },
          ].map(({ src, delay, rotate, label }) => (
            <motion.div
              key={label}
              className="flex-1 max-w-[220px] flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.0, delay, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.img
                src={src}
                alt={label}
                className="w-full object-contain"
                style={{ rotate }}
                whileHover={{ scale: 1.04, rotate: 0 }}
                transition={{ duration: 0.5 }}
              />
              <span className="text-white/25 text-[9px] uppercase tracking-[0.3em]">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── VASES GALLERY ────────────────────────────────────────────────── */}
      <section className="bg-[#080808] py-0 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            {
              src: teacupBlackImg,
              title: 'Фарфоровые Чашки',
              sub: 'Коллекция «Дворцовые тайны»',
              delay: 0,
            },
            {
              src: vaseBlueBlackImg,
              title: 'Фаянс и Кобальт',
              sub: 'Коллекция «Синяя птица»',
              delay: 0.12,
            },
            {
              src: vaseCreamBlackImg,
              title: 'Портретные Вазы',
              sub: 'Коллекция «Взгляд сквозь время»',
              delay: 0.24,
            },
          ].map(({ src, title, sub, delay }) => (
            <motion.div
              key={title}
              className="relative overflow-hidden aspect-[3/4] group cursor-pointer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, delay }}
            >
              <motion.img
                src={src}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: delay + 0.3 }}
                >
                  <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] mb-2">
                    {sub}
                  </p>
                  <h3 className="font-serif text-2xl text-white">{title}</h3>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── KEYS & MYSTERIES ─────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-0 relative overflow-hidden">
        {/* Full-bleed key image */}
        <div className="relative h-[60vh] min-h-[400px]">
          <FadeIn className="absolute inset-0">
            <img
              src={keyHorizImg}
              alt="Золотой ключ"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
          </FadeIn>
          <div className="absolute inset-0 flex items-center justify-end pr-12 md:pr-24">
            <FadeUp delay={0.2} className="max-w-md text-right">
              <span className="text-white/30 text-[10px] uppercase tracking-[0.35em] block mb-5">
                Антиквариат
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
                Ключи к{' '}
                <span className="italic font-light">тайным комнатам</span>
              </h2>
              <p className="text-white/45 font-light leading-relaxed">
                Антикварные ключи с миниатюрными портретами — предметы
                роскоши и символы доверия в одном. Каждый — уникальный
                артефакт своей эпохи.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Three floating keys */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { src: keyOrnateImg, label: 'Ключ с эмалью', delay: 0 },
              { src: keyholeImg, label: 'Накладка замка', delay: 0.15 },
              { src: keyPearlImg, label: 'Ключ с жемчугом', delay: 0.3 },
            ].map(({ src, label, delay }) => (
              <motion.div
                key={label}
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay }}
              >
                <motion.div
                  whileHover={{ y: -8, rotate: 2 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <img
                    src={src}
                    alt={label}
                    className="max-h-56 object-contain drop-shadow-[0_20px_40px_rgba(200,160,50,0.2)]"
                  />
                </motion.div>
                <span className="text-white/25 text-[9px] uppercase tracking-[0.25em] text-center">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ──────────────────────────────────────────────────── */}
      <section className="bg-background py-28">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SlideIn from="left">
            <div className="relative flex items-center justify-center">
              {/* Keyhole brooch on dark bg */}
              <div className="w-full aspect-square max-w-sm mx-auto bg-[#0d0d0d] flex items-center justify-center overflow-hidden">
                <motion.img
                  src={keyholeVelvetImg}
                  alt="ALTAMO"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              {/* Floating crest */}
              <motion.img
                src={crestImg}
                alt="Герб ALTAMO"
                className="absolute -top-8 -right-8 w-28 h-28 object-contain"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </SlideIn>

          <div className="max-w-xl">
            <FadeUp>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 mb-6 block">
                О нас
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-4xl lg:text-5xl mb-8 leading-tight">
                Возрождение традиций{' '}
                <span className="italic font-light">сервировки</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-foreground/70 mb-6 font-light leading-relaxed">
                ALTAMO — это пространство, где прошлое встречается с настоящим. Мы верим,
                что старинные предметы не должны пылиться за стеклом витрин; они созданы
                для того, чтобы жить, украшать современные интерьеры и становиться частью
                новых семейных историй.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-base text-foreground/50 mb-10 font-light leading-relaxed">
                Наша миссия — находить уникальные артефакты ушедших эпох и возвращать им
                законное место на вашем столе.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="flex gap-4">
                <Link href="/contacts">
                  <Button
                    variant="outline"
                    className="rounded-none uppercase tracking-[0.2em] text-[10px] h-12 px-8"
                  >
                    История бренда
                  </Button>
                </Link>
                <Link href="/catalog">
                  <Button className="rounded-none bg-primary text-primary-foreground uppercase tracking-[0.2em] text-[10px] h-12 px-8">
                    В каталог
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        <FadeIn className="absolute inset-0 opacity-15">
          <img
            src={platesCollectionImg}
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
        </FadeIn>
        <div className="relative z-10 container mx-auto px-4 py-24 text-center max-w-2xl">
          <FadeUp>
            <span className="text-white/30 text-[10px] uppercase tracking-[0.35em] block mb-6">
              Рассылка
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
              Первыми узнавайте о{' '}
              <span className="italic font-light">редких поступлениях</span>
            </h2>
            <p className="text-white/45 font-light mb-10 leading-relaxed">
              Подпишитесь на письма ALTAMO — мы пишем редко, но по делу.
            </p>
            <div className="glass flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш Email"
                className="bg-transparent border-none outline-none flex-1 px-6 py-4 text-sm text-white placeholder:text-white/25"
              />
              <button className="px-6 py-4 text-white/60 hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors border-l border-white/10">
                Подписаться
              </button>
            </div>
          </FadeUp>
        </div>
      </section>
    </Layout>
  );
}
