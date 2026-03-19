import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Chrome, ArrowLeft, KeyRound } from "lucide-react";

type Step = "email" | "otp";

export default function Login() {
  const { isAuthenticated, isLoading, signInWithOtp, verifyOtp, signInWithGoogle } = useSupabaseAuth();
  const [, setLocation] = useLocation();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    const { error } = await signInWithOtp(email);
    setSubmitting(false);
    if (error) {
      setError(error);
    } else {
      setSuccess("Code sent! Check your email inbox.");
      setStep("otp");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await verifyOtp(email, otp.trim());
    setSubmitting(false);
    if (error) setError(error);
  };

  const handleGoogle = async () => {
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) setError(error);
  };

  return (
    <div className="min-h-screen flex">
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
                  Enter your email to receive a 6-digit sign-in code.
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
                    <span className="mx-4 text-xs text-muted-foreground">or sign in with email</span>
                    <div className="flex-1 border-t border-border/50" />
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-4">
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
                      {submitting ? "Sending code..." : "Send OTP Code"}
                    </Button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div key="otp-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-4xl font-display font-bold mb-2">Enter Your Code</h1>
                <p className="text-muted-foreground mb-1">
                  We sent a 6-digit code to
                </p>
                <p className="font-semibold text-foreground mb-8">{email}</p>

                <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl mb-6">
                  {success && (
                    <p className="text-sm text-green-600 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg px-3 py-2 mb-4">
                      {success}
                    </p>
                  )}

                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        placeholder="6-digit code"
                        value={otp}
                        onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                        required
                        autoFocus
                        className="w-full h-14 pl-10 pr-4 bg-secondary border border-border/50 rounded-xl text-xl tracking-[0.5em] font-mono text-center focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                        {error}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={submitting || otp.length < 6}
                      className="w-full h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                    >
                      {submitting ? "Verifying..." : "Verify & Sign In"}
                    </Button>
                  </form>

                  <div className="mt-5 text-center">
                    <button
                      type="button"
                      onClick={() => { setStep("email"); setOtp(""); setError(null); setSuccess(null); }}
                      className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 mx-auto transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Change email or resend code
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center text-sm text-muted-foreground mt-2">
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
