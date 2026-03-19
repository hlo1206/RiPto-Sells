import { useState } from "react";
import { Link } from "wouter";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const { resetPassword } = useSupabaseAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await resetPassword(email);
    setSubmitting(false);
    if (error) {
      setError(error);
    } else {
      setSubmitted(true);
    }
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

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl text-center">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-display font-bold mb-2">Check Your Email</h1>
                <p className="text-muted-foreground mb-6">
                  We've sent a password reset link to <strong>{email}</strong>. Open that email and click the link to set a new password.
                </p>
                <Link href="/login">
                  <Button variant="outline" className="w-full h-12">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              <h1 className="text-4xl font-display font-bold mb-2">Forgot Password?</h1>
              <p className="text-muted-foreground mb-8">
                No worries. Enter your email and we'll send you a reset link.
              </p>

              <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl mb-6">
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    disabled={submitting}
                    className="w-full h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                  >
                    {submitting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>

                <div className="mt-5 text-center">
                  <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 justify-center transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                  </Link>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
