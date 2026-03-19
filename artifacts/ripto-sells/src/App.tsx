import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect, Component, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/use-cart";
import { SupabaseAuthProvider } from "@/hooks/use-supabase-auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Pages
import Home from "@/pages/home";
import Categories from "@/pages/categories";
import CategoryProducts from "@/pages/category";
import ProductDetail from "@/pages/product";
import Cart from "@/pages/cart";
import Search from "@/pages/search";
import Login from "@/pages/login";
import ForgotPassword from "@/pages/forgot-password";
import ChangePassword from "@/pages/change-password";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import FAQ from "@/pages/faq";
import ShippingReturns from "@/pages/shipping-returns";
import TrackOrder from "@/pages/track-order";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button
              className="px-6 py-2 bg-primary text-primary-foreground rounded-full"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />
      <main className="flex-1 w-full relative z-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <AppLayout>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/categories" component={Categories} />
        <Route path="/category/:slug" component={CategoryProducts} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/search" component={Search} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/change-password" component={ChangePassword} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/faq" component={FAQ} />
        <Route path="/shipping-returns" component={ShippingReturns} />
        <Route path="/track-order" component={TrackOrder} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SupabaseAuthProvider>
          <CartProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </CartProvider>
        </SupabaseAuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
