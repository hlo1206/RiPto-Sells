import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Chrome, ArrowLeft, CheckCircle2 } from "lucide-react";

type Step = "email" | "sent";

export default function Login() {
  const { isAuthenticated, isLoading, signInWithOtp, signInWithGoogle } = useSupabaseAuth();
  const [, setLocation] = useLocation();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signInWithOtp(email);
    setSubmitting(false);
    if (error) {
      setError(error);
    } else {
      setStep("sent");
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

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-8">
            <span className="font-display font-bold text-2xl text-primary">R</span>
          </div>

          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.div key="email-step" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h1 className="text-4xl font-display font-bold mb-2">Welcome</h1>
                <p className="text-muted-foreground mb-8">
                  Enter your email — we'll send a secure sign-in link. No password needed.
                </p>

                <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl mb-6">
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
                    <span className="mx-4 text-xs text-muted-foreground">or continue with email</span>
                    <div className="flex-1 border-t border-border/50" />
                  </div>

                  <form onSubmit={handleSendLink} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoFocus
                        className="w-full h-12 pl-10 pr-4 bg-secondary border border-border/50 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                        {error}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={submitting || isLoading}
                      className="w-full h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                    >
                      {submitting ? "Sending..." : "Send Sign-In Link"}
                    </Button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div key="sent-step" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <div className="bg-card border border-border/50 rounded-2xl p-10 shadow-xl text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold mb-3">Check Your Email</h2>
                  <p className="text-muted-foreground mb-2">
                    We sent a sign-in link to
                  </p>
                  <p className="font-semibold text-foreground mb-6">{email}</p>
                  <p className="text-sm text-muted-foreground mb-8">
                    Click the link in the email to sign in. The link expires in 1 hour.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setStep("email"); setError(null); }}
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 mx-auto transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Use a different email
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center text-sm text-muted-foreground mt-6">
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
