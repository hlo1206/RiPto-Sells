import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Clock, Award } from "lucide-react";
import { useGetProducts, useGetCategories } from "@workspace/api-client-react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, getMockCategoryImageUrl } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: apiProducts, isLoading: productsLoading } = useGetProducts({ featured: true });
  const { data: apiCategories, isLoading: categoriesLoading } = useGetCategories();

  const products = apiProducts && apiProducts.length > 0 ? apiProducts : MOCK_PRODUCTS.filter(p => p.featured);
  const categories = apiCategories && apiCategories.length > 0 ? apiCategories : MOCK_CATEGORIES;

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Wash */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-luxury.png`}
            alt="Luxury E-commerce Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary font-semibold text-xs tracking-widest uppercase mb-6 border border-primary/30">
              The New Standard
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Curating <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#fde08b] to-primary">Exceptional</span> <br/>
              Lifestyles.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Discover our exclusive collection of premium fragrances, haute couture, and curated artifacts designed for those who demand the extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/categories">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)] transition-all hover:scale-105">
                  Explore Collections
                </Button>
              </Link>
              <Link href="/category/perfumes">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 h-14 glass-panel border-primary/30 hover:bg-primary/10 text-foreground transition-all">
                  Shop Fragrances
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 border-y border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Global Delivery", desc: "Complimentary on luxury orders" },
              { icon: ShieldCheck, title: "Authenticity", desc: "100% verified premium goods" },
              { icon: Award, title: "Curated Elite", desc: "Selected by industry experts" },
              { icon: Clock, title: "Concierge", desc: "24/7 priority customer service" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-primary font-medium tracking-widest text-sm uppercase mb-2 block">Curated</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Signatures & Realms</h2>
            </div>
            <Link href="/categories" className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
              <span className="font-medium">View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.slice(0, 3).map((cat, i) => (
              <motion.div key={cat.id} variants={fadeIn}>
                <Link href={`/category/${cat.slug}`} className="group block relative h-80 rounded-2xl overflow-hidden">
                  <img 
                    src={cat.imageUrl || getMockCategoryImageUrl(cat.slug)} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent transition-opacity group-hover:opacity-90" />
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{cat.name}</h3>
                    <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {cat.productCount} exclusive items
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
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
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
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
              <Button variant="outline" size="lg" className="border-border hover:bg-secondary">
                Discover More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-8 bg-card border border-border rounded-2xl flex items-center justify-center shadow-2xl">
            <img src={`${import.meta.env.BASE_URL}images/logo-mark.png`} alt="RiPto Logo" className="w-10 h-10 object-contain drop-shadow-md" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Join The Inner Circle</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Create an account to track orders, save your wishlist, and receive early access to limited edition drops.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-14 text-lg">
              Unlock Access
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
