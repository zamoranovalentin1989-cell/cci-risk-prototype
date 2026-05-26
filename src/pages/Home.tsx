import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Warp } from "@paper-design/shaders-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TextLoop } from "@/components/TextLoop";
import { TextGradientScroll } from "@/components/TextGradientScroll";
import { SectionReveal, RevealItem } from "@/components/SectionReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  TrendingUp,
  PieChart,
  Landmark,
  Briefcase,
  Smartphone,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Lock,
  LineChart,
  Building2,
  User,
  MapPin,
  MessageCircle,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { InteractiveGlobe } from "@/components/ui/globe";
import DottedMap from "dotted-map";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/* ────────────────────────────────────────────
   DOTTED MAP
   ──────────────────────────────────────────── */
const dottedMap = new DottedMap({ height: 55, grid: "diagonal" });
const mapPoints = dottedMap.getPoints();

function DottedMapVisual() {
  // Santo Domingo approx: lat 18.5, lng -69.9 → SVG coords
  // In dotted-map with viewBox 0 0 120 60: x = (lng+180)/360*120, y = (90-lat)/180*60
  const sdX = (-69.9 + 180) / 360 * 120; // ~36.7
  const sdY = (90 - 18.5) / 180 * 60;    // ~23.8
  // Santiago approx: lat 19.45, lng -70.7
  const stX = (-70.7 + 180) / 360 * 120; // ~36.4
  const stY = (90 - 19.45) / 180 * 60;   // ~23.5

  return (
    <div aria-hidden className="relative">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-[1] [background:radial-gradient(transparent_30%,white_75%)]" />
        <svg viewBox="0 0 120 60" className="w-full" style={{ background: "white" }}>
          {mapPoints.map((point, i) => (
            <circle key={i} cx={point.x} cy={point.y} r={0.15} fill="#aaa" />
          ))}
          {/* Santo Domingo pin */}
          <circle cx={sdX} cy={sdY} r={0.8} fill="#acd040" opacity={0.3} />
          <circle cx={sdX} cy={sdY} r={0.4} fill="#acd040" />
          {/* Santiago pin */}
          <circle cx={stX} cy={stY} r={0.6} fill="#acd040" opacity={0.3} />
          <circle cx={stX} cy={stY} r={0.3} fill="#acd040" />
        </svg>
      </div>
      {/* Labels positioned over the Caribbean area */}
      <div className="absolute left-[20%] top-[30%] z-10 flex flex-col gap-1.5">
        <div className="flex w-fit items-center gap-2 rounded-lg border border-[#e5e5e5] bg-white px-3 py-1.5 text-xs font-medium text-[#1a1a1e] shadow-md shadow-black/5">
          <span className="text-base">🇩🇴</span> Santo Domingo — Sede Principal
        </div>
        <div className="flex w-fit items-center gap-2 rounded-lg border border-[#e5e5e5] bg-white px-3 py-1.5 text-xs font-medium text-[#1a1a1e] shadow-md shadow-black/5">
          <span className="text-base">🇩🇴</span> Santiago — Oficina Regional
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   HERO
   ──────────────────────────────────────────── */
const FLIP_WORDS = ["futuro", "vida", "bienestar", "confianza", "visión", "legado", "libertad", "éxito"];

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    // Defer play to after first paint
    const id = setTimeout(() => v.play().catch(() => {}), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="mt-24 aspect-video overflow-hidden rounded-3xl bg-black">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src="/hero-video.mp4"
        muted
        loop
        playsInline
        preload="none"
      />
    </div>
  );
}

function Hero() {
  const warpRef = useRef<HTMLDivElement>(null);
  const [warpVisible, setWarpVisible] = useState(true);

  useEffect(() => {
    const el = warpRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setWarpVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
  <>
    <section className="relative overflow-hidden pt-28 pb-56 md:pt-36">
      {/* Warp shader background */}
      <div ref={warpRef} className="pointer-events-none absolute inset-0 opacity-65 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_20%,black,transparent)]">
        {warpVisible && (
          <Warp
            style={{ width: "100%", height: "100%" }}
            speed={1}
            distortion={0.35}
            swirl={1.2}
            swirlIterations={12}
            proportion={0.5}
            softness={1}
            shape="checks"
            shapeScale={0.08}
            scale={1}
            rotation={0}
            colors={["#09090b", "#2a2a2e", "#151517", "#2a2a2e"]}
          />
        )}
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionReveal>
          {/* Title — left aligned, large */}
          <RevealItem>
            <h1 className="text-3xl font-medium leading-[1.08] tracking-[-0.03em] md:text-5xl lg:text-6xl xl:text-7xl">
              Inversiones que
              <br />
              transforman tu{" "}
              <TextLoop interval={3} className="text-primary">
                {FLIP_WORDS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </TextLoop>
            </h1>
          </RevealItem>

          {/* Trust signals left + CTA right */}
          <RevealItem>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Regulado por la SIV
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  20+ años de trayectoria
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  5,000+ clientes
                </span>
              </div>
              <MovingBorderButton
                borderRadius="9999px"
                duration={3500}
                className="gap-2 px-8 py-3 text-base font-medium"
              >
                Comenzar a Invertir
                <ArrowRight className="size-4" />
              </MovingBorderButton>
            </div>
          </RevealItem>

          {/* Video — full width below */}
          <RevealItem>
            <HeroVideo />
          </RevealItem>

        </SectionReveal>

        </div>
    </section>

    <TrustMarquee />

    {/* About — light background */}
    <section className="bg-white py-56">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-8 md:grid-cols-[200px_1fr]">
          {/* Label */}
          <p className="text-sm font-medium text-[#999] pt-2">Sobre nosotros</p>

          {/* Content */}
          <div>
            <TextGradientScroll
              text="Contamos con un equipo de expertos financieros especializado en el Mercado de Valores, que ofrece un servicio personalizado a quienes desean desarrollar una estrategia de inversión a la medida de sus necesidades. Toda nuestra experiencia está a disposición de nuestros clientes para ayudarlos a alcanzar sus metas financieras."
              className="text-2xl font-medium leading-relaxed tracking-tight text-[#1a1a1e] md:text-3xl lg:text-[2.5rem] lg:leading-snug"
              textOpacity="medium"
            />

            {/* Stats */}
            <SectionReveal>
              <RevealItem>
                <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-3">
                  {[
                    { value: 15, suffix: "B+", prefix: "RD$ ", label: "Activos bajo administración" },
                    { value: 20, suffix: "+", prefix: "", label: "Años en el mercado" },
                    { value: 98, suffix: "%", prefix: "", label: "Satisfacción del cliente" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-4xl font-semibold text-[#1a1a1e] md:text-5xl">
                        <AnimatedCounter
                          target={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                        />
                      </p>
                      <p className="mt-2 text-sm text-[#999]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </RevealItem>
            </SectionReveal>
          </div>
        </div>

        {/* Features grid */}
        <SectionReveal>
          <RevealItem>
            <div className="mx-auto mt-32 grid max-w-5xl border border-[#e5e5e5] md:grid-cols-2">

              {/* Top-left — Presencia Nacional */}
              <div>
                <div className="p-6 sm:p-12">
                  <span className="flex items-center gap-2 text-sm text-[#999]">
                    <MapPin className="size-4" />
                    Presencia nacional
                  </span>
                  <p className="mt-8 text-2xl font-semibold text-[#1a1a1e]">
                    Dos oficinas para atenderte de cerca en Santo Domingo y Santiago.
                  </p>
                </div>
                <DottedMapVisual />
              </div>

              {/* Top-right — Asesor Dedicado */}
              <div className="overflow-hidden border-t border-[#e5e5e5] bg-[#fafafa] p-6 sm:p-12 md:border-t-0 md:border-l">
                <div className="relative z-10">
                  <span className="flex items-center gap-2 text-sm text-[#999]">
                    <MessageCircle className="size-4" />
                    Asesoría personalizada
                  </span>
                  <p className="my-8 text-2xl font-semibold text-[#1a1a1e]">
                    Un ejecutivo dedicado a tu estrategia, disponible cuando lo necesites.
                  </p>
                </div>
                <div aria-hidden className="flex flex-col gap-8">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex size-5 items-center justify-center rounded-full border border-[#e5e5e5]">
                        <span className="size-3 rounded-full bg-primary" />
                      </span>
                      <span className="text-xs text-[#999]">Lun 10 Mar</span>
                    </div>
                    <div className="mt-1.5 w-4/5 rounded-lg border border-[#e5e5e5] bg-white p-3 text-xs text-[#555]">
                      Hola, quisiera diversificar mi portafolio con bonos corporativos. ¿Qué opciones hay?
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 ml-auto w-4/5 rounded-lg bg-primary p-3 text-xs text-primary-foreground">
                      Con gusto te asesoro. Tenemos emisiones activas con rendimientos del 11-13% anual en DOP. Te preparo una propuesta personalizada.
                    </div>
                    <span className="block text-right text-xs text-[#999]">Ahora</span>
                  </div>
                </div>
              </div>


            </div>
          </RevealItem>
        </SectionReveal>

        {/* Showcase block — image with overlay */}
        <SectionReveal>
          <RevealItem>
            <div className="mt-32 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold text-[#7a9520]">
                  Nuestra Trayectoria
                </span>
                <h2 className="mt-5 max-w-xl text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-[#1a1a1e] md:text-5xl lg:text-6xl">
                  Tu tranquilidad financiera comienza aquí.
                </h2>
              </div>
              <p className="max-w-md text-base leading-relaxed text-[#666] md:text-right">
                Con más de 20 años en el mercado de valores dominicano, hemos construido relaciones de confianza con miles de clientes que nos eligen para proteger y hacer crecer su patrimonio.
              </p>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="relative mt-12 overflow-hidden rounded-3xl">
              <img
                src="/parallax-liderando.jpg"
                alt="CCI — Liderando el mercado de valores"
                className="h-[450px] w-full object-cover md:h-[550px] lg:h-[620px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <p className="text-lg font-medium text-white md:text-xl">
                  Más de RD$ 15B en activos bajo administración.
                </p>
                <span className="mt-2 flex items-center gap-2 text-sm text-white/70">
                  <MapPin className="size-4" />
                  Santo Domingo & Santiago
                </span>
              </div>
            </div>
          </RevealItem>
        </SectionReveal>

      </div>

    </section>

  </>
  );
}

/* ── Text Parallax helpers ── */
const IMG_PADDING = 12;

function TextParallaxContent({
  imgUrl,
  subheading,
  heading,
  children,
  fullWidth = false,
}: {
  imgUrl: string;
  subheading: string;
  heading: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "" : "mx-auto max-w-[1200px] px-6"}>
      <div className="relative h-[120vh]">
        <StickyImage imgUrl={imgUrl} fullWidth={fullWidth} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
}

function StickyImage({ imgUrl, fullWidth = false }: { imgUrl: string; fullWidth?: boolean }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8], [1, fullWidth ? 1 : 1.5]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [fullWidth ? 0 : 24, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: fullWidth ? "70vh" : `calc(70vh - ${IMG_PADDING * 2}px)`,
        top: fullWidth ? 0 : IMG_PADDING,
        scale,
        borderRadius,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/40" />
    </motion.div>
  );
}

function OverlayCopy({ subheading, heading }: { subheading: string; heading: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-[70vh] w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
}

/* ── Feature Card with radial hover reveal ── */
function FeatureCard({ item }: { item: { id: string; category: string; title: string; description: string; image: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <a href="#" className="group block h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[#acd040]/20"
      >
        {/* Radial green reveal layer */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 800px at ${mousePos.x}% ${mousePos.y}%, #acd040 0%, #95b82e 100%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col">
          {/* Text zone */}
          <div className="flex flex-col px-7 pt-7 pb-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888] transition-colors duration-300 group-hover:text-white/70">
              {item.category}
            </span>
            <h3 className="mt-2 text-2xl font-medium leading-snug tracking-[-0.02em] text-[#1d1d1f] transition-colors duration-300 group-hover:text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6e6e73] transition-colors duration-300 group-hover:text-white/80">
              {item.description}
            </p>
          </div>
          {/* Image zone */}
          <div className="mt-auto flex items-end justify-center px-6 pb-6 pt-2">
            <img
              src={item.image}
              alt={item.title}
              className="h-96 w-auto object-contain opacity-50 transition-all duration-500 group-hover:scale-[1.05] group-hover:opacity-100 group-hover:filter-none"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </a>
  );
}

/* ────────────────────────────────────────────
   FEATURES — GALLERY CAROUSEL
   ──────────────────────────────────────────── */
function Features() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const items = [
    {
      id: "rendimiento",
      category: "Rendimiento",
      title: "Estrategias que superan el mercado.",
      description:
        "Optimizamos tu portafolio con análisis cuantitativo y gestión activa para maximizar retornos.",
      image: "/3d/supera_mercado.png",
    },
    {
      id: "seguridad",
      category: "Seguridad",
      title: "Tu capital, siempre protegido.",
      description:
        "Regulados por la SIV con los más altos estándares de cumplimiento y tecnología.",
      image: "/3d/protegida.png",
    },
    {
      id: "analisis",
      category: "Análisis",
      title: "Datos en tiempo real para decidir mejor.",
      description:
        "Monitoreo continuo del mercado con herramientas de análisis profesional.",
      image: "/3d/tiempo_real.png",
    },
    {
      id: "diversificacion",
      category: "Diversificación",
      title: "Portafolios diseñados a tu medida.",
      description:
        "Combinamos instrumentos para maximizar retornos y minimizar riesgos según tu perfil.",
      image: "/3d/portfolio_a_medida.png",
    },
    {
      id: "asesoria",
      category: "Asesoría",
      title: "Un equipo dedicado a tus metas.",
      description:
        "Asesores expertos que diseñan estrategias a la medida de tus objetivos financieros.",
      image: "/3d/dedicado_metas.png",
    },
    {
      id: "educacion",
      category: "Educación",
      title: "Invierte con conocimiento.",
      description:
        "Programas y recursos para que tomes decisiones informadas sobre tu patrimonio.",
      image: "/3d/invierte_conocimiento.png",
    },
  ];

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
      setSlideCount(carouselApi.scrollSnapList().length);
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section id="servicios" className="bg-[#f4f4f5] pb-56 pt-56">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div>
            <SectionReveal>
              <RevealItem>
                <h2 className="text-4xl font-medium tracking-[-0.02em] text-[#1a1a1e] md:text-5xl lg:text-6xl">
                  Herramientas para crecer
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-[#666]">
                  Con CCI tienes acceso a un ecosistema robusto de productos
                  financieros: desde cuentas con rendimientos atractivos y
                  disponibilidad diaria, hasta instrumentos de inversión para
                  planear tu retiro.
                </p>
              </RevealItem>
            </SectionReveal>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              className="text-[#1a1a1e] hover:bg-[#1a1a1e]/10"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-[#1a1a1e] hover:bg-[#1a1a1e]/10"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": { dragFree: true },
            },
          }}
        >
          <CarouselContent className="-ml-5 pl-[max(1.5rem,calc(50vw-600px))] 2xl:pl-[max(8rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-[320px] pl-5 lg:basis-[380px]"
              >
                <FeatureCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-[#1a1a1e]" : "bg-[#1a1a1e]/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Feature cards — below carousel */}
      <div className="mx-auto mt-20 max-w-[1200px] px-6">
        {/* Row 1 — 2 cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <SectionReveal>
            <RevealItem>
              <div className="relative flex h-[520px] flex-col overflow-hidden rounded-2xl bg-white">
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-medium text-[#1a1a1e]">Monitoreo en Tiempo Real</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#999]">
                    Sigue el rendimiento de tu portafolio con datos actualizados al instante y alertas personalizadas.
                  </p>
                  <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#1a1a1e] hover:text-primary transition-colors">
                    Conocer más <ArrowRight className="size-3.5" />
                  </a>
                </div>
                {/* Area chart — pinned to bottom */}
                <div className="relative mt-auto">
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white to-transparent" />
                  <div className="bg-[#fafafa] px-6 pt-6">
                    <div className="mb-4 flex items-baseline justify-between">
                      <div>
                        <p className="text-2xl font-semibold text-[#1a1a1e]">RD$ 15.2B</p>
                        <p className="mt-0.5 text-[10px] text-[#999]">Activos bajo administración</p>
                      </div>
                      <span className="rounded-full bg-[#acd040]/15 px-2 py-0.5 text-[10px] font-medium text-[#7a9520]">+12.4%</span>
                    </div>
                    <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="w-full">
                      <defs>
                        <linearGradient id="monitorFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#acd040" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#acd040" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      {[30, 60, 90].map((y) => (
                        <line key={y} x1={0} y1={y} x2={300} y2={y} stroke="#eee" strokeWidth={0.5} />
                      ))}
                      <path d="M0,95 C30,90 50,85 75,80 C100,75 120,70 150,55 C180,40 200,45 225,35 C250,25 275,20 300,15 L300,120 L0,120Z" fill="url(#monitorFill)" />
                      <path d="M0,95 C30,90 50,85 75,80 C100,75 120,70 150,55 C180,40 200,45 225,35 C250,25 275,20 300,15" fill="none" stroke="#acd040" strokeWidth={1.5} />
                    </svg>
                  </div>
                </div>
              </div>
            </RevealItem>
          </SectionReveal>

          <SectionReveal>
            <RevealItem>
              <div className="relative flex h-[520px] flex-col overflow-hidden rounded-2xl bg-white">
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-medium text-[#1a1a1e]">Análisis de Rendimiento</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#999]">
                    Visualiza el desglose de tus ganancias por tipo de instrumento y proyecta tus rendimientos futuros.
                  </p>
                  <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#1a1a1e] hover:text-primary transition-colors">
                    Conocer más <ArrowRight className="size-3.5" />
                  </a>
                </div>
                {/* Quarterly results — pinned to bottom */}
                <div className="relative mt-auto">
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white to-transparent" />
                  <div className="bg-[#fafafa]">
                    {[
                      { period: "Q1 2026", result: "+11.2%", status: "Superado", color: "bg-[#acd040]/15 text-[#7a9520]" },
                      { period: "Q4 2025", result: "+9.8%", status: "Cumplido", color: "bg-[#acd040]/15 text-[#7a9520]" },
                      { period: "Q3 2025", result: "+8.1%", status: "Cumplido", color: "bg-[#acd040]/15 text-[#7a9520]" },
                      { period: "Q2 2025", result: "+10.5%", status: "Superado", color: "bg-[#acd040]/15 text-[#7a9520]" },
                      { period: "Q1 2025", result: "+7.4%", status: "Cumplido", color: "bg-[#acd040]/15 text-[#7a9520]" },
                      { period: "Q4 2024", result: "+9.1%", status: "Cumplido", color: "bg-[#acd040]/15 text-[#7a9520]" },
                    ].map((item, i) => (
                      <div key={item.period} className={`flex items-center justify-between px-6 py-3.5 ${i > 0 ? "border-t border-[#eee]" : ""}`}>
                        <div>
                          <span className="text-xs font-semibold text-[#1a1a1e]">{item.period}</span>
                          <span className={`ml-2 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${item.color}`}>{item.status}</span>
                        </div>
                        <span className="text-xs font-medium text-[#1a1a1e]">{item.result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealItem>
          </SectionReveal>
        </div>

        {/* Row 2 — full width card */}
        <div className="mt-6">
          <SectionReveal>
            <RevealItem>
              <div className="overflow-hidden rounded-2xl bg-white p-8 md:p-12">
                <div className="text-center">
                  <h3 className="text-2xl font-medium text-[#1a1a1e] md:text-3xl">Portafolios Personalizados</h3>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#999]">
                    Diseña tu estrategia de inversión con la ayuda de nuestros asesores expertos. Elige tus instrumentos, define tu perfil de riesgo y deja que la plataforma trabaje por ti.
                  </p>
                  <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#1a1a1e] hover:text-primary transition-colors">
                    Conocer más <ArrowRight className="size-3.5" />
                  </a>
                </div>
                <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
                  <div className="space-y-4 rounded-xl border border-[#e5e5e5] p-6">
                    <p className="text-xs text-[#999]">Tu portafolio</p>
                    <div className="space-y-3">
                      {[
                        { label: "Renta Fija", pct: "55%", w: "w-[55%]" },
                        { label: "Fondos de Inversión", pct: "25%", w: "w-[25%]" },
                        { label: "Renta Variable", pct: "15%", w: "w-[15%]" },
                        { label: "Mercado de Dinero", pct: "5%", w: "w-[5%]" },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-xs text-[#666]">
                            <span>{item.label}</span>
                            <span>{item.pct}</span>
                          </div>
                          <div className="mt-1 h-1.5 w-full rounded-full bg-[#f0f0f0]">
                            <div className={`h-full rounded-full bg-primary ${item.w}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 rounded-xl border border-[#e5e5e5] p-6">
                    <p className="text-xs text-[#999]">Rendimiento histórico</p>
                    <p className="text-3xl font-medium text-[#1a1a1e]">+12.4%</p>
                    <p className="text-xs text-primary">+RD$ 271,800 este año</p>
                    <div className="flex h-20 items-end gap-1 pt-4">
                      {[30, 45, 35, 55, 40, 60, 50, 65, 55, 70, 60, 80, 70, 85, 75, 90].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t bg-primary/30" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealItem>
          </SectionReveal>
        </div>
      </div>

    </section>
  );
}

/* ────────────────────────────────────────────
   CLIENT TYPES
   ──────────────────────────────────────────── */
function ClientTypes() {
  const clients = [
    {
      icon: User,
      title: "Para ti",
      subtitle: "Personas que buscan hacer crecer su patrimonio",
      description:
        "Diseñamos estrategias de inversión adaptadas a tus metas personales, ya sea generar ingresos pasivos, planificar tu retiro o proteger tu capital.",
      bullets: [
        "Asesoría personalizada según tu perfil de riesgo",
        "Portafolios desde RD$ 5,000",
        "Acceso a plataforma digital 24/7",
        "Acompañamiento continuo de un asesor dedicado",
      ],
      cta: "Empezar a invertir",
      spotlightColor: "rgba(172, 208, 64, 0.10)",
      borderColor: "rgba(172, 208, 64, 0.35)",
    },
    {
      icon: Building2,
      title: "Para tu empresa",
      subtitle: "Organizaciones que optimizan tesorería e inversiones",
      description:
        "Ayudamos a empresas a rentabilizar sus excedentes de tesorería con instrumentos seguros y rendimientos competitivos.",
      bullets: [
        "Gestión de tesorería corporativa",
        "Instrumentos de corto y largo plazo",
        "Reportes y análisis institucional",
        "Equipo dedicado para clientes corporativos",
      ],
      cta: "Contactar un asesor",
      spotlightColor: "rgba(245, 217, 113, 0.10)",
      borderColor: "rgba(245, 217, 113, 0.35)",
    },
  ];

  return (
    <section className="pt-56">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionReveal>
          <RevealItem>
            <p className="text-sm font-medium uppercase tracking-widest text-[#666]">
              Clientes
            </p>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] md:text-5xl lg:text-6xl">
              Soluciones para cada perfil
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Ya seas una persona o una empresa, tenemos la estrategia ideal
              para tus objetivos financieros.
            </p>
          </RevealItem>
        </SectionReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {clients.map((client) => (
            <SectionReveal key={client.title}>
              <RevealItem>
                <SpotlightCard
                  spotlightColor={client.spotlightColor}
                  borderColor={client.borderColor}
                  className="h-full rounded-2xl"
                >
                  <Card className="group h-full border-border/50 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
                    <CardContent className="flex h-full flex-col p-8">
                      <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-white/[0.06]">
                        <client.icon className="size-5 text-white/70" />
                      </div>
                      <h3 className="text-2xl font-semibold">{client.title}</h3>
                      <p className="mt-1 text-sm font-medium text-primary/80">
                        {client.subtitle}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {client.description}
                      </p>
                      <ul className="mt-6 flex-1 space-y-3">
                        {client.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white/30" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="mt-6 w-full rounded-full"
                      >
                        {client.cta}
                        <ChevronRight className="ml-1 size-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </RevealItem>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <RevealItem>
            <div className="mt-16 flex flex-wrap items-center gap-x-5 gap-y-3 font-serif text-xl font-semibold leading-tight text-[#555] md:text-2xl lg:text-3xl">
              <span className="cursor-pointer text-fill-hover">Renta Fija</span>
              <span className="text-[#333] font-light">/</span>
              <span className="cursor-pointer text-fill-hover">Renta Variable</span>
              <span className="text-[#333] font-light">/</span>
              <span className="cursor-pointer text-fill-hover rounded-lg border border-[#555] px-3 py-0.5">Fondos</span>
              <span className="text-[#333] font-light">/</span>
              <span className="cursor-pointer text-fill-hover">Mercado de Dinero</span>
              <span className="inline-flex items-baseline gap-1.5"><span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#999]">Liquidez Diaria</span></span>
              <span className="text-[#333] font-light">/</span>
              <span className="cursor-pointer text-fill-hover">Bonos Corporativos</span>
              <span className="text-[#333] font-light">/</span>
              <span className="cursor-pointer text-fill-hover">Letras del BC</span>
              <span className="text-[#333] font-light">/</span>
              <span className="cursor-pointer text-fill-hover">Certificados</span>
              <span className="inline-flex items-baseline gap-1.5"><span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#999]">Desde RD$5K</span></span>
              <span className="text-[#333] font-light">/</span>
              <span className="cursor-pointer text-fill-hover">Acciones</span>
              <span className="text-[#333] font-light">/</span>
              <span className="cursor-pointer text-fill-hover">Portafolios</span>
              <span className="text-[#333] font-light">/</span>
              <span className="cursor-pointer text-fill-hover">Asesoría Financiera</span>
            </div>
          </RevealItem>
        </SectionReveal>
      </div>

      {/* Full-width autoplay video with top fade */}
      <div className="relative mt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-background to-transparent" />
        <video
          className="w-full object-cover"
          src="/stock-finance.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

    </section>
  );
}

/* ────────────────────────────────────────────
   BECA CCI BANNER
   ──────────────────────────────────────────── */
const GLOBE_MARKERS = [
  { lat: 18.49, lng: -69.93, label: "Santo Domingo" },
  { lat: 40.71, lng: -74.01, label: "New York" },
  { lat: 25.76, lng: -80.19, label: "Miami" },
  { lat: 19.43, lng: -99.13, label: "México" },
  { lat: 51.51, lng: -0.13, label: "London" },
  { lat: 48.86, lng: 2.35, label: "Paris" },
  { lat: -34.60, lng: -58.38, label: "Buenos Aires" },
  { lat: 4.71, lng: -74.07, label: "Bogotá" },
];

const GLOBE_CONNECTIONS: { from: [number, number]; to: [number, number] }[] = [
  { from: [18.49, -69.93], to: [40.71, -74.01] },
  { from: [18.49, -69.93], to: [25.76, -80.19] },
  { from: [18.49, -69.93], to: [19.43, -99.13] },
  { from: [18.49, -69.93], to: [51.51, -0.13] },
  { from: [18.49, -69.93], to: [48.86, 2.35] },
  { from: [18.49, -69.93], to: [-34.60, -58.38] },
  { from: [18.49, -69.93], to: [4.71, -74.07] },
  { from: [40.71, -74.01], to: [51.51, -0.13] },
  { from: [25.76, -80.19], to: [-34.60, -58.38] },
];

function BecaBanner() {
  return (
    <section className="relative py-56">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/bg-waves.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b]" />
      </div>
      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionReveal>
            <RevealItem>
              <p className="text-sm font-medium uppercase tracking-widest text-[#666]">
                Programa Educativo
              </p>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] md:text-5xl lg:text-6xl">
                Beca CCI — Formando los líderes del mercado
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Potenciamos el talento dominicano brindando acceso a una
                maestría en una de las 20 mejores universidades de
                Norteamérica, Europa y República Dominicana. Tu futuro no
                tiene límites.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full px-8">
                  Aplicar ahora
                  <ArrowRight className="ml-1 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/20 px-8"
                >
                  Conocer más
                </Button>
              </div>
            </RevealItem>
          </SectionReveal>

          <SectionReveal>
            <RevealItem>
              <div className="flex items-center justify-center">
                <InteractiveGlobe
                  size={500}
                  markers={GLOBE_MARKERS}
                  connections={GLOBE_CONNECTIONS}
                  dotColor="rgba(172, 208, 64, ALPHA)"
                  arcColor="rgba(172, 208, 64, 0.4)"
                  markerColor="rgba(172, 208, 64, 1)"
                />
              </div>
            </RevealItem>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   LATEST ARTICLES — APPLE CARDS CAROUSEL
   ──────────────────────────────────────────── */
const ARTICLES = [
  {
    id: "perspectivas-2026",
    category: "Mercado",
    title: "Perspectivas del mercado dominicano para 2026.",
    description: "Análisis de las tendencias económicas y oportunidades de inversión en República Dominicana.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop",
  },
  {
    id: "renta-fija",
    category: "Renta Fija",
    title: "¿Por qué la renta fija sigue siendo una apuesta segura?",
    description: "Descubre cómo los bonos y certificados pueden proteger tu capital en tiempos de volatilidad.",
    image: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop",
  },
  {
    id: "diversificacion",
    category: "Estrategia",
    title: "Guía práctica para diversificar tu portafolio.",
    description: "Aprende a distribuir tus inversiones para maximizar retornos y minimizar riesgos.",
    image: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop",
  },
  {
    id: "fondos-inversion",
    category: "Fondos",
    title: "Fondos de inversión: acceso a mercados globales.",
    description: "Cómo los fondos permiten a inversionistas locales participar en oportunidades internacionales.",
    image: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop",
  },
  {
    id: "planificacion-retiro",
    category: "Planificación",
    title: "Empieza hoy a planificar tu retiro.",
    description: "Estrategias de inversión a largo plazo para asegurar tu tranquilidad financiera futura.",
    image: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop",
  },
  {
    id: "regulacion-siv",
    category: "Regulación",
    title: "Lo que todo inversionista debe saber sobre la SIV.",
    description: "Entendiendo el marco regulatorio que protege tus inversiones en el mercado de valores.",
    image: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop",
  },
];

function LatestArticles() {
  const [api, setApi] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);

  return (
    <section className="bg-white py-56">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div>
            <SectionReveal>
              <RevealItem>
                <p className="text-sm font-medium uppercase tracking-widest text-[#999]">
                  Blog
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-[#1a1a1e] md:text-5xl lg:text-6xl">
                  Últimos Artículos
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-[#666]">
                  Mantente al día con las últimas tendencias del mercado,
                  estrategias de inversión y análisis financiero de nuestro
                  equipo de expertos.
                </p>
              </RevealItem>
            </SectionReveal>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              className="text-[#1a1a1e] hover:bg-[#1a1a1e]/10"
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-[#1a1a1e] hover:bg-[#1a1a1e]/10"
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": { dragFree: true },
            },
          }}
        >
          <CarouselContent className="-ml-4 md:-ml-5">
            {ARTICLES.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-[85vw] pl-4 md:basis-[480px] md:pl-5 lg:basis-[520px]"
              >
                <a href="#" className="group flex h-[80vh] max-h-[720px] flex-col overflow-hidden rounded-3xl bg-[#f5f5f5]">
                  {/* Image — 60% */}
                  <div className="relative h-[60%] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  {/* Text — 40% */}
                  <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
                    <h3 className="text-2xl font-medium leading-snug tracking-[-0.02em] text-[#1a1a1e]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#666] md:text-base">
                      {item.description}
                    </p>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   TRUST MARQUEE
   ──────────────────────────────────────────── */
const marqueeItems = [
  "Regulados por la SIV",
  "20+ años de trayectoria",
  "RD$ 15B+ en activos administrados",
  "Asesoría personalizada",
  "5,000+ clientes confían en nosotros",
  "Rendimientos superiores al mercado",
  "Gestión profesional de portafolios",
  "Tu patrimonio, nuestra prioridad",
];

function TrustMarquee() {
  return (
    <section className="bg-[#acd040] py-3.5 relative z-10">
      <Marquee duration={40} pauseOnHover>
        {marqueeItems.map((item, i) => (
          <span
            key={i}
            className="mx-4 text-[11px] font-bold uppercase tracking-widest text-black md:text-xs"
          >
            {item}
            <span className="ml-8 text-black/40">·</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ────────────────────────────────────────────
   PAGE ASSEMBLY
   ──────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <ClientTypes />
      <LatestArticles />
      <BecaBanner />
      <Footer />
    </div>
  );
}
