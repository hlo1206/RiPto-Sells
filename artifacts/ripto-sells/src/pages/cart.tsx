import { Link } from "wouter";
import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useAuth } from "@workspace/replit-auth-web";

export default function Cart() {
  const { items, totalItems, subtotal, updateQuantity, removeItem, clear } = useCart();
  const { isAuthenticated, login } = useAuth();

  const shipping = subtotal > 200 ? 0 : 25;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-muted-foreground mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md text-center">
          It looks like you haven't added any luxury items to your cart yet. Explore our collections to find something exceptional.
        </p>
        <Link href="/categories">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/10">
              <div className="flex items-center justify-between pb-6 border-b border-border/50 mb-6">
                <span className="font-semibold text-lg">{totalItems} Items</span>
                <button onClick={clear} className="text-sm text-destructive hover:underline flex items-center gap-1">
                  <Trash2 className="w-4 h-4" /> Clear All
                </button>
              </div>

              <div className="space-y-8">
                {items.map((item) => (
                  <motion.div 
                    layout
                    key={item.productId} 
                    className="flex flex-col sm:flex-row gap-6 items-start sm:items-center relative"
                  >
                    <Link href={`/product/${item.productId}`} className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-secondary rounded-2xl overflow-hidden border border-border">
                      <img 
                        src={item.product?.imageUrl || "https://images.unsplash.com/photo-1600164318680-a24b652da24b?w=200&q=80"} 
                        alt={item.product?.name || "Product"} 
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    
                    <div className="flex-1 flex flex-col sm:flex-row justify-between w-full">
                      <div>
                        <span className="text-xs text-primary font-medium tracking-wider uppercase mb-1 block">
                          {item.product?.categoryName || "Category"}
                        </span>
                        <Link href={`/product/${item.productId}`} className="font-display text-lg font-bold hover:text-primary transition-colors line-clamp-1 mb-1">
                          {item.product?.name || "Unknown Product"}
                        </Link>
                        <p className="text-muted-foreground font-medium mb-4 sm:mb-0">
                          ${(item.product?.price || 0).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4">
                        <div className="flex items-center bg-background border border-border rounded-lg h-10 px-3">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="text-muted-foreground hover:text-primary p-1"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="text-muted-foreground hover:text-primary p-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.productId)}
                          className="text-muted-foreground hover:text-destructive text-sm"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/10 sticky top-32">
              <h2 className="text-2xl font-display font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-border/50">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? <span className="text-primary">Complimentary</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-medium text-muted-foreground/70">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>

              {isAuthenticated ? (
                <Button className="w-full h-14 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_25px_-5px_rgba(212,175,55,0.3)] transition-all hover:-translate-y-1 rounded-xl group">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <div className="space-y-4">
                  <Button onClick={login} className="w-full h-14 text-base bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                    Sign in to Checkout
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    You can securely checkout after signing in to your Replit account.
                  </p>
                </div>
              )}

              <div className="mt-8 bg-secondary/50 rounded-xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every transaction is secured. We guarantee the authenticity of all products sold on RiPto Sells.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ensure the icon used is imported
import { ShieldCheck } from "lucide-react";
