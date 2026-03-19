import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@workspace/replit-auth-web";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Login() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  return (
    <div className="min-h-screen flex">
      {/* Left side: Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=1200&q=80" 
          alt="Luxury store" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background" />
      </div>

      {/* Right side: Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-8">
            <span className="font-display font-bold text-3xl text-primary">R</span>
          </div>
          
          <h1 className="text-4xl font-display font-bold mb-3">Welcome Back</h1>
          <p className="text-muted-foreground mb-10">
            Sign in to access your curated wishlist, track exclusive orders, and experience personalized luxury.
          </p>

          <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl mb-8">
            <p className="text-sm text-center text-muted-foreground mb-6">
              Authentication is securely handled via your Replit account.
            </p>
            <Button 
              onClick={login}
              disabled={isLoading}
              className="w-full h-14 text-base bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-xl font-medium"
            >
              {isLoading ? "Connecting..." : "Continue with Replit"}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
