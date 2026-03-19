import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Star, Truck, Shield, RefreshCcw, Minus, Plus, ShoppingBag, BadgeCheck } from "lucide-react";
import { useGetProduct } from "@workspace/api-client-react";
import { MOCK_PRODUCTS, MOCK_REVIEWS } from "@/lib/mock-data";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id, 10);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const { data: apiProduct, isLoading, isError } = useGetProduct(productId);
  
  // Fallback to mock if API errors or empty
  const product = apiProduct || MOCK_PRODUCTS.find(p => p.id === productId);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 max-w-7xl mx-auto px-4 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-secondary rounded-3xl"></div>
          <div className="space-y-6 pt-8">
            <div className="w-32 h-6 bg-secondary rounded"></div>
            <div className="w-3/4 h-12 bg-secondary rounded"></div>
            <div className="w-1/4 h-8 bg-secondary rounded"></div>
            <div className="w-full h-32 bg-secondary rounded mt-8"></div>
            <div className="w-full h-14 bg-secondary rounded mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-display font-bold mb-4">Product not found</h1>
          <Link href="/categories">
            <Button variant="outline">Return to Collections</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Ensure images array
  const images = Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.imageUrl || "https://images.unsplash.com/photo-1600164318680-a24b652da24b?w=800&q=80"];

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="py-6 text-sm text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.categoryName?.toLowerCase()}`} className="hover:text-primary transition-colors">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Images */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] sm:aspect-square bg-card rounded-3xl overflow-hidden border border-border/50 shadow-2xl relative"
            >
              <img 
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80"; }}
              />
              {product.badge && (
                <div className="absolute top-6 left-6 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  {product.badge}
                </div>
              )}
            </motion.div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`View ${idx+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col pt-4 lg:pt-10">
            <span className="text-primary font-medium tracking-widest text-sm uppercase mb-3">
              {product.categoryName}
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-medium text-sm">{product.rating || "4.9"}</span>
              </div>
              <span className="text-muted-foreground text-sm underline decoration-border underline-offset-4">
                {product.reviewCount || "120"} Reviews
              </span>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-3xl font-bold text-foreground">₹{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through mb-1">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="prose prose-invert max-w-none mb-10">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description || "An exceptional piece crafted with the utmost attention to detail and quality. Perfect for elevating your collection."}
              </p>
            </div>

            <div className="h-px w-full bg-border/50 mb-10"></div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {/* Quantity selector */}
              <div className="flex items-center justify-between bg-secondary border border-border rounded-xl h-14 px-4 sm:w-1/3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  disabled={!product.inStock}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-semibold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  disabled={!product.inStock}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Add to cart button */}
              <Button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] transition-all hover:-translate-y-1 rounded-xl"
              >
                {product.inStock ? (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart • ₹{(product.price * quantity).toFixed(2)}
                  </>
                ) : "Sold Out"}
              </Button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border/50">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Free Global Shipping</h4>
                  <p className="text-xs text-muted-foreground">On all orders over ₹200</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Authenticity Guaranteed</h4>
                  <p className="text-xs text-muted-foreground">Certified genuine products</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCcw className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Complimentary Returns</h4>
                  <p className="text-xs text-muted-foreground">Within 30 days of receipt</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Reviews Section */}
        {MOCK_REVIEWS[productId] && (
          <div className="mt-20 pt-16 border-t border-border/50">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-display font-bold mb-1">Customer Reviews</h2>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-5 h-5 ${s <= Math.round(product.rating || 4.5) ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">{product.reviewCount || 120} verified reviews</span>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-4xl font-bold text-primary">{product.rating || "4.8"}</div>
                <div className="text-xs text-muted-foreground mt-1">out of 5</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_REVIEWS[productId].map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border/60 rounded-2xl p-6 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {review.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{review.author}</div>
                        <div className="text-xs text-muted-foreground">{review.date}</div>
                      </div>
                    </div>
                    {review.verified && (
                      <div className="flex items-center gap-1 text-green-500 text-xs shrink-0">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-1.5">{review.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{review.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
