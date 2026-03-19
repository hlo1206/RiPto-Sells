import { Link } from "wouter";
import { motion } from "framer-motion";
import { useGetCategories } from "@workspace/api-client-react";
import { MOCK_CATEGORIES, getMockCategoryImageUrl } from "@/lib/mock-data";

export default function Categories() {
  const { data: apiCategories, isLoading } = useGetCategories();
  const categories = apiCategories && apiCategories.length > 0 ? apiCategories : MOCK_CATEGORIES;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <div className="w-48 h-10 bg-secondary animate-pulse rounded mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-secondary animate-pulse rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">All Collections</h1>
          <p className="text-muted-foreground">
            Explore our meticulously organized categories, each offering a distinct facet of the luxurious lifestyle you deserve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link href={`/category/${cat.slug}`} className="group block relative h-[400px] rounded-3xl overflow-hidden shadow-xl shadow-black/20 border border-border/50">
                <img 
                  src={cat.imageUrl || getMockCategoryImageUrl(cat.slug)} 
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h2 className="font-display text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-white/80 mb-4 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/20">
                    <span className="text-sm font-medium text-white/60">
                      {cat.productCount} Products
                    </span>
                    <span className="text-primary text-sm font-bold tracking-widest uppercase flex items-center gap-2 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      Explore <span className="text-xl leading-none">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
