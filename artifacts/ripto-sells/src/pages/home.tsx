import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Clock, Award, Star, Quote } from "lucide-react";
import { useGetProducts, useGetCategories } from "@workspace/api-client-react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, getMockCategoryImageUrl } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const BRANDS = [
  "Hermès", "Chanel", "Louis Vuitton", "Gucci", "Dior", "Prada",
  "Versace", "Burberry", "Valentino", "Givenchy", "Balenciaga", "Fendi",
];

const TESTIMONIALS = [
  {
    name: "Aisha Rahman",
    role: "Interior Designer, Dubai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    text: "RiPto Sells is the only place I trust for luxury home decor. Every piece arrives immaculately packaged and exceeds expectations.",
    rating: 5,
  },
  {
    name: "Rohan Mehra",
    role: "Entrepreneur, Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "The Oud Noir fragrance is absolutely phenomenal. I've been searching years for a scent this powerful and refined.",
    rating: 5,
  },
  {
    name: "Priya Kapoor",
    role: "Fashion Editor, Delhi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    text: "Discovered RiPto through a friend and immediately became a loyal customer. The curation is impeccable — truly a cut above.",
    rating: 5,
  },
];

const STATS = [
  { value: "50K+", label: "Happy Customers" },
  { value: "200+", label: "Luxury Brands" },
  { value: "42", label: "Countries Shipped" },
  { value: "4.9★", label: "Average Rating" },
];

export default function Home() {
  const { isAuthenticated } = useSupabaseAuth();
  const { data: apiProducts, isLoading: productsLoading } = useGetProducts({ featured: true });
  const { data: apiCategories } = useGetCategories();

  const products = apiProducts && apiProducts.length > 0 ? apiProducts : MOCK_PRODUCTS.filter(p => p.featured);
  const categories = apiCategories && apiCategories.length > 0 ? apiCategories : MOCK_CATEGORIES;

  const newArrivals = MOCK_PRODUCTS.filter(p => p.badge === "New Arrival").slice(0, 4);
  const bestsellers = MOCK_PRODUCTS.filter(p => p.badge === "Bestseller").slice(0, 4);

  return (
    <div className="w-full">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-luxury.png`}
            alt="Luxury E-commerce Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Animated accent orb */}
        <motion.div
          className="absolute right-[15%] top-[20%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-3xl"
          >
            <motion.span 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="inline-block py-1.5 px-4 rounded-full bg-primary/20 text-primary font-semibold text-xs tracking-widest uppercase mb-6 border border-primary/30"
            >
              The New Standard in Luxury
            </motion.span>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold leading-[1.05] mb-6">
              Curating <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#fde08b] to-primary">
                Exceptional
              </span>{" "}
              <br/>Lifestyles.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Discover our exclusive collection of premium fragrances, haute couture, and curated artifacts — designed for those who demand the extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/categories">
                <Button size="lg" className="w-full sm:w-auto text-base px-10 h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_50px_-10px_rgba(212,175,55,0.6)] transition-all hover:scale-105">
                  Explore Collections
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/category/perfumes">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-10 h-14 glass-panel border-primary/30 hover:bg-primary/10 text-foreground transition-all">
                  Shop Fragrances
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="py-10 border-y border-border/40 bg-card/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPOSITIONS ───────────────────────────────────────────── */}
      <section className="py-14 border-b border-border/50 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck,       title: "Global Delivery",  desc: "Complimentary on luxury orders" },
              { icon: ShieldCheck, title: "Authenticity",      desc: "100% verified premium goods" },
              { icon: Award,       title: "Curated Elite",     desc: "Selected by industry experts" },
              { icon: Clock,       title: "Concierge",         desc: "24/7 priority customer service" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ──────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-primary font-medium tracking-widest text-sm uppercase mb-2 block">Curated</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">Signatures & Realms</h2>
            </div>
            <Link href="/categories" className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
              <span className="font-medium">View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Large 3-col grid for top 3, then smaller row for remaining */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5"
          >
            {categories.slice(0, 3).map((cat) => (
              <motion.div key={cat.id} variants={fadeIn}>
                <Link href={`/category/${cat.slug}`} className="group block relative h-80 rounded-2xl overflow-hidden">
                  <img 
                    src={cat.imageUrl || getMockCategoryImageUrl(cat.slug)} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="font-display text-2xl font-bold text-white mb-1">{cat.name}</h3>
                    <p className="text-white/70 text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {cat.productCount} exclusive items <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 gap-5"
          >
            {categories.slice(3, 7).map((cat) => (
              <motion.div key={cat.id} variants={fadeIn}>
                <Link href={`/category/${cat.slug}`} className="group block relative h-44 rounded-2xl overflow-hidden">
                  <img 
                    src={cat.imageUrl || getMockCategoryImageUrl(cat.slug)} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h3 className="font-semibold text-white text-sm">{cat.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeIn}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-primary font-medium tracking-widest text-sm uppercase mb-2 block">Just Dropped</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">New Arrivals</h2>
            </div>
            <Link href="/search" className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
              <span className="font-medium">Shop All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {newArrivals.map(product => (
              <motion.div key={product.id} variants={fadeIn}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EDITORIAL BANNER ─────────────────────────────────────────────── */}
      <section className="py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden h-[400px] md:h-[520px]"
          >
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=80"
              alt="New Season"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-10 md:px-16">
              <div className="max-w-lg">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-3 block">New Season</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-4">
                  The Summer <br />Edit Is Here.
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Lightweight fabrics, luminous skincare, and scents that transport you to the Mediterranean coast.
                </p>
                <Link href="/category/clothing">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-13 px-8">
                    Explore Clothing
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium tracking-widest text-sm uppercase mb-2 block">The Essentials</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Featured Artifacts</h2>
          </motion.div>

          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-96 rounded-2xl bg-secondary animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products.slice(0, 5).map((product, i) => (
                <motion.div key={product.id} variants={fadeIn} className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}>
                  <ProductCard product={product} featured={i === 0} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-16 text-center">
            <Link href="/search">
              <Button variant="outline" size="lg" className="border-border hover:bg-secondary px-10 h-13">
                Discover More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ──────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeIn}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-primary font-medium tracking-widest text-sm uppercase mb-2 block">Community Picks</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">Bestsellers</h2>
            </div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {bestsellers.map(product => (
              <motion.div key={product.id} variants={fadeIn}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BRANDS TICKER ────────────────────────────────────────────────── */}
      <section className="py-10 border-y border-border/40 bg-card/20 overflow-hidden">
        <div className="flex gap-16 animate-[marquee_30s_linear_infinite]" style={{ width: "max-content" }}>
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span key={i} className="text-muted-foreground/60 font-display font-semibold text-lg tracking-wider whitespace-nowrap hover:text-primary transition-colors cursor-default">
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium tracking-widest text-sm uppercase mb-2 block">Voices</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">What Our Circle Says</h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="bg-card border border-border/50 rounded-2xl p-8 relative hover:border-primary/30 transition-colors"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="ml-auto flex">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SPLIT PROMO ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                img: "https://images.unsplash.com/photo-1594035910387-fea47714263f?w=800&q=80",
                label: "Signature Scents",
                title: "Fragrance Collection",
                href: "/category/perfumes",
              },
              {
                img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
                label: "Elevate Your Space",
                title: "Home Decor",
                href: "/category/home-decor",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link href={item.href} className="group block relative h-72 rounded-2xl overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-1">{item.label}</span>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                    <span className="mt-2 flex items-center gap-1 text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Shop now <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INNER CIRCLE CTA ─────────────────────────────────────────────── */}
      {!isAuthenticated && <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-20 h-20 mx-auto mb-8 bg-card border border-border rounded-3xl flex items-center justify-center shadow-2xl">
              <img src={`${import.meta.env.BASE_URL}images/logo-mark.png`} alt="RiPto Logo" className="w-12 h-12 object-contain drop-shadow-md" />
            </div>
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Exclusive Access</span>
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-6">Join The <br />Inner Circle</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Create an account to track orders, save your wishlist, and receive early access to limited edition drops. Your luxury journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 h-14 text-lg shadow-[0_0_50px_-10px_rgba(212,175,55,0.5)] hover:scale-105 transition-all">
                  Unlock Access
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="border-border/60 hover:bg-secondary px-12 h-14 text-lg">
                  Browse Collections
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>}
    </div>
  );
}
