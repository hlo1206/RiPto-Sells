import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { useGetProducts } from "@workspace/api-client-react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";

export default function Search() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const q = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(q);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  const { data: apiProducts, isLoading } = useGetProducts({ search: query });

  // Fallback filtering on mock data if API is empty or not enabled
  const products = apiProducts && apiProducts.length > 0 
    ? apiProducts 
    : MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description?.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryName?.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-border/50 pb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-muted-foreground mb-6">
            <SearchIcon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Search Results</h1>
          {query ? (
            <p className="text-xl text-muted-foreground">
              {products.length} results found for <span className="text-foreground font-semibold">"{query}"</span>
            </p>
          ) : (
            <p className="text-xl text-muted-foreground">Enter a term to search our collections.</p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-secondary animate-pulse" />
            ))}
          </div>
        ) : query && products.length > 0 ? (
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
        ) : query ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-6">We couldn't find anything matching your search. Try different keywords or browse our categories.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
