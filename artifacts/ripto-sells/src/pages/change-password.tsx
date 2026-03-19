import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";

export default function ChangePassword() {
  const { updatePassword, isAuthenticated, isLoading } = useSupabaseAuth();
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isLoading && !isAuthenticated) {
    setLocation("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setSubmitting(true);
    const { error } = await updatePassword(password);
    setSubmitting(false);
    if (error) {
      setError(error);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-8">
          <span className="font-display font-bold text-2xl text-primary">R</span>
        </div>

        {done ? (
          <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl text-center">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-display font-bold mb-2">Password Updated!</h1>
            <p className="text-muted-foreground mb-6">
              Your password has been changed successfully.
            </p>
            <Button onClick={() => setLocation("/")} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              Go to Home
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-display font-bold mb-2">Change Password</h1>
            <p className="text-muted-foreground mb-8">
              Enter and confirm your new password below.
            </p>

            <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl mb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoFocus
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

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full h-12 pl-10 pr-10 bg-secondary border border-border/50 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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
                  {submitting ? "Updating..." : "Update Password"}
                </Button>
              </form>

              <div className="mt-5 text-center">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 justify-center transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                </Link>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
