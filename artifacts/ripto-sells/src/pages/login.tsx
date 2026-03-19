import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Chrome, ArrowLeft, Lock, Eye, EyeOff, KeyRound } from "lucide-react";

type Mode = "login" | "signup";
type Step = "form" | "otp-confirm";

export default function Login() {
  const { isAuthenticated, isLoading, signInWithPassword, signUp, verifyOtp, signInWithGoogle } = useSupabaseAuth();
  const [, setLocation] = useLocation();

  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  const resetForm = () => {
    setError(null);
    setSuccess(null);
    setOtp("");
    setStep("form");
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    resetForm();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signInWithPassword(email, password);
    setSubmitting(false);
    if (error) setError(error);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error, needsConfirmation } = await signUp(email, password);
    setSubmitting(false);
    if (error) {
      setError(error);
    } else if (needsConfirmation) {
      setSuccess("Account created! Enter the 6-digit code sent to your email to confirm.");
      setStep("otp-confirm");
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

            {step === "otp-confirm" ? (
              <motion.div key="otp-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-4xl font-display font-bold mb-2">Confirm Email</h1>
                <p className="text-muted-foreground mb-1">We sent a 6-digit code to</p>
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
                      {submitting ? "Verifying..." : "Confirm & Continue"}
                    </Button>
                  </form>

                  <div className="mt-5 text-center">
                    <button
                      type="button"
                      onClick={() => { setStep("form"); setOtp(""); setError(null); setSuccess(null); }}
                      className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 mx-auto transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Go back
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key={mode} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h1 className="text-4xl font-display font-bold mb-2">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-muted-foreground mb-8">
                  {mode === "login"
                    ? "Sign in to your account to continue."
                    : "Join the inner circle. Set up your account."}
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
                    <span className="mx-4 text-xs text-muted-foreground">or use email</span>
                    <div className="flex-1 border-t border-border/50" />
                  </div>

                  <form onSubmit={mode === "login" ? handleLogin : handleSignUp} className="space-y-4">
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

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full h-12 pl-10 pr-10 bg-secondary border border-border/50 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {mode === "login" && (
                      <div className="text-right">
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                    )}

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
                      {submitting
                        ? mode === "login" ? "Signing in..." : "Creating account..."
                        : mode === "login" ? "Sign In" : "Create Account"}
                    </Button>
                  </form>

                  <div className="mt-5 text-center text-sm text-muted-foreground">
                    {mode === "login" ? (
                      <>
                        Don't have an account?{" "}
                        <button onClick={() => switchMode("signup")} className="text-primary hover:underline font-medium">
                          Sign up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button onClick={() => switchMode("login")} className="text-primary hover:underline font-medium">
                          Sign in
                        </button>
                      </>
                    )}
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
