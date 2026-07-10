import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Layout } from '@/components/layout';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

import heroImg from '@assets/e3f990286a2eef82cad6e1f7ea6de46bcefedb1f_1783679793166.png';
import platesImg from '@assets/8c27f3e260a41a3a3362919afe04c61d1e3be61a_1783679793164.png';
import keyholePlatesImg from '@assets/66a1acd36dde2b9954603d1fabb9c401badd09f4_1783679793165.png';
import teacupImg from '@assets/4b981288a3538c2b778516b210d4117c70ff680f_1783679793164.png';
import crestImg from '@assets/197098aeb793ac905cce6d28a96494917d54816f_1783679793165.png';
import velvetImg from '@assets/bb246febba3eef9cb8964a9d2fc8f6bb110fbd15_1783679793165.png';
import vaseImg from '@assets/60474dc4c92fe280abcfb7069a03e2c2fbf109fa_1783679793165.png';
import logoBlack from '@assets/logo_black_nobg_1783694481163.png';

// ─── Animation wrappers ──────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.3, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({ children, from = 'left', delay = 0, className = '' }: {
  children: React.ReactNode; from?: 'left' | 'right'; delay?: number; className?: string;
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

// ─── Values data ─────────────────────────────────────────────────────────────

const values = [
  {
    number: 'I',
    title: 'Подлинность',
    text: 'Мы работаем исключительно с оригинальными предметами. Никаких репродукций, никаких стилизаций — только вещи, прошедшие через руки людей и сохранившие этот след.',
  },
  {
    number: 'II',
    title: 'История',
    text: 'Каждый предмет в нашей коллекции имеет задокументированное происхождение. Мы изучаем его биографию — мануфактуру, эпоху, маршрут — и передаём эти знания вместе с ним.',
  },
  {
    number: 'III',
    title: 'Редкость',
    text: 'ALTAMO не работает с тиражными вещами. Мы ищем единственные экземпляры, неполные сервизы с характером, предметы, которые сложно найти и невозможно забыть.',
  },
  {
    number: 'IV',
    title: 'Красота',
    text: 'Эстетика для нас — не украшение, а язык. Каждая деталь нашего пространства, упаковки и подачи говорит об одном: красота оправдана сама по себе.',
  },
];

// ─── About Page ───────────────────────────────────────────────────────────────

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '28%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.85], [1, 0]);

  const darkRef = useRef(null);
  const { scrollYProgress: darkScroll } = useScroll({
    target: darkRef,
    offset: ['start end', 'end start'],
  });
  const darkY = useTransform(darkScroll, [0, 1], ['-8%', '8%']);

  return (
    <Layout>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[600px] overflow-hidden flex items-end -mt-24"
      >
        <motion.div
          className="absolute inset-0 z-0 scale-110"
          style={{ y: heroY }}
        >
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        </motion.div>

        <motion.div
          className="relative z-10 container mx-auto px-6 pb-20 md:pb-28"
          style={{ opacity: heroOpacity }}
        >
          <motion.span
            className="uppercase tracking-[0.4em] text-[10px] text-white/50 font-light block mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Основано в MMXXV · Москва
          </motion.span>
          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Мы не продаём{' '}
            <span className="italic font-light">вещи.</span>
            <br />
            Мы возвращаем{' '}
            <span className="italic font-light">им жизнь.</span>
          </motion.h1>
          <motion.div
            className="w-16 h-px bg-white/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <span className="text-white/30 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            className="w-px h-10 bg-white/25"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────────────────── */}
      <section className="py-32 md:py-40 container mx-auto px-6 max-w-4xl">
        <FadeUp>
          <span className="uppercase tracking-[0.35em] text-[10px] text-muted-foreground/60 font-light block mb-12">
            Манифест
          </span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.25] text-foreground/90 mb-10">
            ALTAMO родился из убеждения, что предметы{' '}
            <span className="italic">помнят.</span>
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="font-light text-lg text-foreground/65 leading-relaxed max-w-2xl mb-8">
            Каждый фарфоровый сервиз хранит в себе голос застолья, которого уже нет. 
            Каждый хрустальный бокал — отражение свечи, погасшей столетие назад. 
            Мы убеждены: вещи, созданные с любовью и прожившие долгую жизнь, 
            несут в себе особое достоинство — то, что нельзя воспроизвести на фабрике.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="font-light text-lg text-foreground/65 leading-relaxed max-w-2xl">
            Мы собираем их. Изучаем их биографии. И передаём людям, которые умеют слушать.
          </p>
        </FadeUp>
      </section>

      {/* ── IMAGE + TEXT: EYE MOTIF ──────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <SlideIn from="left" className="relative overflow-hidden">
          <img
            src={keyholePlatesImg}
            alt=""
            className="w-full h-full object-cover min-h-[60vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
        </SlideIn>
        <SlideIn from="right" className="flex items-center bg-background px-10 py-20 lg:px-16 lg:py-0">
          <div className="max-w-md">
            <span className="uppercase tracking-[0.35em] text-[10px] text-muted-foreground/60 font-light block mb-10">
              Символ
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              Глаз{' '}
              <span className="italic font-light">влюблённого</span>
            </h2>
            <p className="font-light text-foreground/65 leading-relaxed mb-6">
              В Георгианской Англии существовал обычай: дама хранила миниатюрный портрет глаза 
              своего возлюбленного, вписанный в медальон. Не имени, не лица — только взгляда. 
              Этого было достаточно, чтобы помнить всё.
            </p>
            <p className="font-light text-foreground/65 leading-relaxed mb-10">
              Мы взяли этот образ как основу нашей эстетики. Взгляд, устремлённый сквозь время. 
              Интимность, скрытая в обыденном предмете. Тайна, которую носят с собой ежедневно.
            </p>
            <div className="w-8 h-px bg-foreground/30" />
          </div>
        </SlideIn>
      </section>

      {/* ── DARK QUOTE SECTION ───────────────────────────────────────────── */}
      <section
        ref={darkRef}
        className="relative overflow-hidden bg-[#0a0a0a] py-40 md:py-56"
      >
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{ y: darkY }}
        >
          <img src={velvetImg} alt="" className="w-full h-full object-cover scale-110" />
        </motion.div>
        <div className="relative z-10 container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <motion.img
              src={crestImg}
              alt=""
              className="w-20 h-20 object-contain mx-auto mb-16 opacity-70"
              style={{ mixBlendMode: 'screen' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </FadeIn>
          <FadeUp>
            <blockquote className="font-serif text-3xl md:text-5xl text-white leading-[1.2] mb-10">
              «Роскошь — это не цена предмета,{' '}
              <span className="italic">а его история.</span>»
            </blockquote>
          </FadeUp>
          <FadeIn delay={0.3}>
            <span className="text-white/30 text-xs uppercase tracking-[0.4em] font-light">
              ALTAMO · MMXXV
            </span>
          </FadeIn>
        </div>
      </section>

      {/* ── CURATION SECTION ─────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <SlideIn from="left" className="flex items-center bg-background px-10 py-20 lg:px-20 lg:py-0 order-2 lg:order-1">
          <div className="max-w-md">
            <span className="uppercase tracking-[0.35em] text-[10px] text-muted-foreground/60 font-light block mb-10">
              Кураторство
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              Мы путешествуем,{' '}
              <span className="italic font-light">чтобы найти</span>
            </h2>
            <p className="font-light text-foreground/65 leading-relaxed mb-6">
              Наши кураторы посещают европейские аукционы, частные коллекции и антикварные рынки. 
              Мы не покупаем оптом. Каждый предмет отбирается лично — за характер, за редкость, 
              за ту неуловимую черту, которая отличает живую вещь от красивой безделушки.
            </p>
            <p className="font-light text-foreground/65 leading-relaxed mb-10">
              Сервиз из Мейсена 1890-х. Хрустальные бокалы Баккара с монограммой. 
              Серебряные приборы парижского ювелира. Всё это — с историей, 
              с документами, с достоинством.
            </p>
            <Link href="/catalog">
              <Button variant="outline" className="rounded-none uppercase tracking-[0.15em] text-xs h-12 px-8 border-foreground/30 hover:border-foreground">
                Смотреть коллекцию
              </Button>
            </Link>
          </div>
        </SlideIn>
        <SlideIn from="right" className="relative overflow-hidden order-1 lg:order-2">
          <img
            src={platesImg}
            alt=""
            className="w-full h-full object-cover min-h-[60vh]"
          />
        </SlideIn>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-32 md:py-40 container mx-auto px-6 max-w-5xl">
        <FadeUp className="mb-20">
          <span className="uppercase tracking-[0.35em] text-[10px] text-muted-foreground/60 font-light block mb-4">
            Принципы
          </span>
          <h2 className="font-serif text-4xl md:text-5xl">
            Чем мы{' '}
            <span className="italic font-light">руководствуемся</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {values.map((v, i) => (
            <FadeUp key={v.number} delay={i * 0.1}>
              <div className="py-10 border-t border-border/60 group">
                <div className="flex items-start gap-8">
                  <span className="font-serif text-4xl text-foreground/10 font-light leading-none pt-1 min-w-[2.5rem]">
                    {v.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl mb-4 group-hover:italic transition-all duration-500">
                      {v.title}
                    </h3>
                    <p className="font-light text-sm text-foreground/60 leading-relaxed">
                      {v.text}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── IMAGE TRIPTYCH ───────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 pb-24">
        <FadeIn>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            <div className="aspect-[3/4] overflow-hidden">
              <motion.img
                src={teacupImg}
                alt=""
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden mt-12">
              <motion.img
                src={vaseImg}
                alt=""
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden">
              <motion.img
                src={platesImg}
                alt=""
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section className="py-32 md:py-40 container mx-auto px-6 max-w-3xl text-center">
        <FadeUp>
          <img src={logoBlack} alt="ALTAMO" className="h-20 object-contain mx-auto mb-16 opacity-80" />
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="font-serif text-2xl md:text-3xl text-foreground/80 leading-relaxed mb-6">
            Если вы читаете это — значит, вы из тех,{' '}
            <span className="italic">кто понимает.</span>
          </p>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="font-light text-foreground/50 leading-relaxed mb-14 max-w-xl mx-auto">
            Мы рады каждому, кто ценит не блеск, а глубину. 
            Приходите в наш бутик или познакомьтесь с коллекцией онлайн.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalog">
              <Button className="rounded-none uppercase tracking-[0.15em] text-xs h-12 px-10 bg-foreground text-background hover:bg-foreground/90">
                Коллекция
              </Button>
            </Link>
            <Link href="/contacts">
              <Button variant="outline" className="rounded-none uppercase tracking-[0.15em] text-xs h-12 px-10 border-foreground/30 hover:border-foreground">
                Связаться с нами
              </Button>
            </Link>
          </div>
        </FadeUp>
      </section>

    </Layout>
  );
}
