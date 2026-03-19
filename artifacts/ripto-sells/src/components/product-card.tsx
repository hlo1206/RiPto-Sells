import { Link } from "wouter";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@workspace/api-client-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <div className={`
        relative h-full flex flex-col bg-card rounded-2xl border border-border/50 overflow-hidden
        transition-all duration-500 hover:shadow-2xl hover:shadow-black/40 hover:border-border
        ${featured ? 'md:flex-row md:col-span-2 lg:col-span-2' : ''}
      `}>
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.badge && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Sold Out
            </span>
          )}
        </div>

        {/* Image Container */}
        <div className={`
          relative overflow-hidden bg-secondary/30
          ${featured ? 'md:w-1/2 lg:w-3/5 h-64 md:h-auto' : 'aspect-[4/5]'}
        `}>
          <img 
            src={product.imageUrl || "https://images.unsplash.com/photo-1600164318680-a24b652da24b?w=800&q=80"} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full w-12 h-12 shadow-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              onClick={(e) => { e.preventDefault(); /* Would open quick view */ }}
            >
              <Eye className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              className="rounded-full w-12 h-12 shadow-xl shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-110 disabled:opacity-50"
              onClick={handleAddClick}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col flex-1 p-6 ${featured ? 'md:w-1/2 lg:w-2/5 justify-center' : ''}`}>
          <div className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
            {product.categoryName}
          </div>
          
          <h3 className={`font-display font-semibold text-foreground group-hover:text-primary transition-colors ${featured ? 'text-2xl lg:text-3xl mb-4' : 'text-lg mb-2 line-clamp-1'}`}>
            {product.name}
          </h3>
          
          {featured && product.description && (
            <p className="text-muted-foreground mb-6 line-clamp-3">
              {product.description}
            </p>
          )}

          <div className={`mt-auto flex items-end justify-between ${featured ? 'pt-4 border-t border-border/50' : ''}`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-lg font-bold text-foreground">
                  ₹{product.price.toFixed(2)}
                </span>
              </div>
              {product.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {product.rating} <span className="opacity-70">({product.reviewCount})</span>
                  </span>
                </div>
              )}
            </div>
            
            {!featured && (
              <button 
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
                onClick={handleAddClick}
                disabled={!product.inStock}
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
