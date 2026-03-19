import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useGetProducts, useGetCategories } from "@workspace/api-client-react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, getMockCategoryImageUrl } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { ChevronRight } from "lucide-react";

export default function CategoryProducts() {
  const { slug } = useParams<{ slug: string }>();
  
  // Get category info to find its ID
  const { data: apiCategories } = useGetCategories();
  const categories = Array.isArray(apiCategories) && apiCategories.length > 0 ? apiCategories : MOCK_CATEGORIES;
  const category = categories.find(c => c.slug === slug);
  
  // Use the categoryId to fetch products
  const { data: apiProducts, isLoading } = useGetProducts(
    category ? { categoryId: category.id } : undefined
  );

  // Fallback to mock data if API is empty
  const products = Array.isArray(apiProducts) && apiProducts.length > 0 
    ? apiProducts 
    : MOCK_PRODUCTS.filter(p => p.categoryId === category?.id);

  if (!category) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Category not found</h1>
          <Link href="/categories" className="text-primary hover:underline">Browse all collections</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Category Hero */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden mb-16">
        <img 
          src={category.imageUrl || getMockCategoryImageUrl(category.slug)} 
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80"; }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/categories" className="hover:text-primary">Collections</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{category.name}</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold mb-4"
          >
            {category.name}
          </motion.h1>
          {category.description && (
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              {category.description}
            </motion.p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Filters/Sort Bar (Mock UI) */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-border/50 gap-4">
          <p className="text-muted-foreground">Showing {products.length} artifacts</p>
          <div className="flex gap-4">
            <select className="bg-transparent border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary">
              <option>Recommended</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-secondary animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card/30 rounded-3xl border border-border border-dashed">
            <h3 className="text-2xl font-display font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground">We are currently curating new artifacts for this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
