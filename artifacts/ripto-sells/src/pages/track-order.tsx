import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_ORDER = {
  id: "RS-2026-04891",
  status: "In Transit",
  product: "Oud Royal Perfume",
  estimatedDelivery: "March 22, 2026",
  steps: [
    { label: "Order Placed", date: "March 18, 2026 · 10:30 AM", done: true, icon: CheckCircle },
    { label: "Processing", date: "March 18, 2026 · 02:15 PM", done: true, icon: Package },
    { label: "Dispatched", date: "March 19, 2026 · 09:00 AM", done: true, icon: Truck },
    { label: "In Transit", date: "March 20, 2026 · 11:00 AM", done: true, icon: Truck },
    { label: "Out for Delivery", date: "Expected March 22, 2026", done: false, icon: Truck },
    { label: "Delivered", date: "Expected March 22, 2026", done: false, icon: CheckCircle },
  ],
};

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = () => {
    if (!orderId.trim()) return;
    if (orderId.trim().toUpperCase() === DEMO_ORDER.id) {
      setTracked(true);
      setNotFound(false);
    } else {
      setTracked(false);
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-2">Track Your Order</h1>
        <p className="text-muted-foreground mb-10">Enter your order ID to get real-time delivery updates.</p>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            placeholder="e.g. RS-2026-04891"
            className="flex-1 bg-card border border-border rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <Button onClick={handleTrack} className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-xl">
            <Search className="w-4 h-4 mr-2" />
            Track
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mb-10">
          Try demo order ID: <button className="text-primary underline underline-offset-2" onClick={() => { setOrderId(DEMO_ORDER.id); }}>RS-2026-04891</button>
        </p>

        {notFound && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 text-center">
            <p className="text-destructive font-medium">Order not found. Please check your order ID and try again.</p>
          </div>
        )}

        {tracked && (
          <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-xl shadow-black/10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-xs text-primary font-medium tracking-widest uppercase">Order ID</span>
                <h2 className="text-xl font-display font-bold mt-1">{DEMO_ORDER.id}</h2>
                <p className="text-muted-foreground text-sm mt-1">{DEMO_ORDER.product}</p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {DEMO_ORDER.status}
                </span>
                <p className="text-xs text-muted-foreground mt-2 flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3" /> Est. {DEMO_ORDER.estimatedDelivery}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              {DEMO_ORDER.steps.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === DEMO_ORDER.steps.length - 1;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 my-1 ${step.done ? "bg-primary/30" : "bg-border"}`} style={{ minHeight: 24 }} />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className={`font-medium text-sm ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
