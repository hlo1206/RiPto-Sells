import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { Search, ShoppingBag, User, Menu, X, ChevronRight, LogOut, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { MOCK_CATEGORIES } from "@/lib/mock-data";
import { useGetCategories } from "@workspace/api-client-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, signOut } = useSupabaseAuth();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories = MOCK_CATEGORIES } = useGetCategories();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Member";
  const initial = displayName[0]?.toUpperCase() ?? "U";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "glass-panel shadow-lg shadow-black/20 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu Toggle & Logo */}
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <Link href="/" className="flex items-center gap-2.5 group">
                {/* Crown icon */}
                <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                  <path d="M2 19 L6.5 7 L15 15 L23.5 7 L28 19" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="2" y="19" width="26" height="4" rx="1.5" fill="#D4AF37"/>
                  <circle cx="2" cy="7" r="2.2" fill="#D4AF37"/>
                  <circle cx="15" cy="2.2" r="2.2" fill="#D4AF37"/>
                  <circle cx="28" cy="7" r="2.2" fill="#D4AF37"/>
                </svg>
                {/* Wordmark */}
                <div className="hidden sm:flex items-baseline gap-1.5">
                  <span className="font-display font-bold text-[17px] tracking-[0.12em] text-white uppercase">Ripto</span>
                  <span className="text-primary text-[11px] tracking-[0.3em] font-light uppercase">Sells</span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                All Collections
              </Link>
              {categories.slice(0, 4).map(cat => (
                <Link key={cat.id} href={`/category/${cat.slug}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {cat.name}
                </Link>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <form onSubmit={handleSearch} className="hidden md:flex relative items-center">
                <input 
                  type="text" 
                  placeholder="Search luxury..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-secondary/50 border border-border rounded-full py-1.5 pl-4 pr-10 text-sm w-48 lg:w-64 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/70"
                />
                <button type="submit" className="absolute right-3 text-muted-foreground hover:text-primary">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2 ml-2">
                  <div className="text-xs text-right">
                    <p className="text-muted-foreground">Welcome,</p>
                    <p className="font-medium truncate max-w-[100px]">{displayName}</p>
                  </div>
                  <Link href="/change-password">
                    <Button variant="ghost" size="icon" className="hover:text-primary rounded-full" title="Change password">
                      <KeyRound className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={signOut} className="hover:text-destructive rounded-full" title="Log out">
                    <LogOut className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-primary/10 hover:text-primary"
                    title="Sign In"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              )}

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10 hover:text-primary">
                  <ShoppingBag className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-card border-r border-border z-50 flex flex-col lg:hidden shadow-2xl"
            >
              <div className="p-5 flex items-center justify-between border-b border-border/50">
                <div className="flex items-center gap-2.5">
                  <svg width="26" height="22" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 19 L6.5 7 L15 15 L23.5 7 L28 19" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="19" width="26" height="4" rx="1.5" fill="#D4AF37"/>
                    <circle cx="2" cy="7" r="2.2" fill="#D4AF37"/>
                    <circle cx="15" cy="2.2" r="2.2" fill="#D4AF37"/>
                    <circle cx="28" cy="7" r="2.2" fill="#D4AF37"/>
                  </svg>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-[16px] tracking-[0.12em] text-white uppercase">Ripto</span>
                    <span className="text-primary text-[10px] tracking-[0.3em] font-light uppercase">Sells</span>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5 flex-1 overflow-y-auto">
                <form onSubmit={handleSearch} className="relative mb-8">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-lg py-3 pl-4 pr-10 text-sm focus:outline-none focus:border-primary"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Collections</h3>
                <div className="flex flex-col space-y-1">
                  <Link href="/categories" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-secondary transition-colors">
                    <span>All Collections</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  {categories.map(cat => (
                    <Link key={cat.id} href={`/category/${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-secondary transition-colors">
                      <span>{cat.name}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-5 border-t border-border/50">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {initial}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{displayName}</p>
                        <p className="text-xs text-muted-foreground">Signed in</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link href="/change-password" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" size="icon" title="Change password">
                          <KeyRound className="w-5 h-5" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => { signOut(); setMobileMenuOpen(false); }}>
                        <LogOut className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Sign In to Account
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
