import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Chrome } from "lucide-react";

export default function Login() {
  const { isAuthenticated, isLoading, signInWithEmail, signUpWithEmail, signInWithGoogle } = useSupabaseAuth();
  const [, setLocation] = useLocation();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    const fn = mode === "signin" ? signInWithEmail : signUpWithEmail;
    const { error } = await fn(email, password);

    setSubmitting(false);
    if (error) {
      setError(error);
    } else if (mode === "signup") {
      setSuccess("Account created! Check your email to confirm, then sign in.");
      setMode("signin");
    }
  };

  const handleGoogle = async () => {
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) setError(error);
  };

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
        <div className="absolute bottom-12 left-10 right-10">
          <blockquote className="text-white/90 text-2xl font-display font-semibold leading-snug drop-shadow-lg">
            "Luxury is not about possessing expensive things — it is about having rare experiences."
          </blockquote>
        </div>
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
          
          <h1 className="text-4xl font-display font-bold mb-2">
            {mode === "signin" ? "Welcome Back" : "Join the Circle"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {mode === "signin"
              ? "Sign in to access your curated wishlist and exclusive orders."
              : "Create an account for early access to limited drops."}
          </p>

          <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl mb-6">
            {/* Tab Toggle */}
            <div className="flex bg-secondary rounded-xl p-1 mb-6">
              <button
                onClick={() => { setMode("signin"); setError(null); setSuccess(null); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "signin" ? "bg-background text-foreground shadow" : "text-muted-foreground"}`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode("signup"); setError(null); setSuccess(null); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "signup" ? "bg-background text-foreground shadow" : "text-muted-foreground"}`}
              >
                Create Account
              </button>
            </div>

            {/* Google Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogle}
              className="w-full h-12 border-border mb-4 flex items-center gap-3"
            >
              <Chrome className="w-4 h-4" />
              Continue with Google
            </Button>

            <div className="relative flex items-center my-4">
              <div className="flex-1 border-t border-border/50" />
              <span className="mx-4 text-xs text-muted-foreground">or</span>
              <div className="flex-1 border-t border-border/50" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-4 bg-secondary border border-border/50 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-12 bg-secondary border border-border/50 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-600 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg px-3 py-2">
                  {success}
                </p>
              )}

              <Button
                type="submit"
                disabled={submitting || isLoading}
                className="w-full h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
              >
                {submitting ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="/terms-of-service" className="underline hover:text-primary">Terms of Service</a>{" "}
            and{" "}
            <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a>.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
