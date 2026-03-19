import { Truck, RefreshCcw, Clock, MapPin } from "lucide-react";

export default function ShippingReturns() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-2">Shipping & Returns</h1>
        <p className="text-muted-foreground mb-12">We strive to deliver your luxury items safely and on time.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On all orders above ₹10,000" },
            { icon: Clock, title: "Processing Time", desc: "1–2 business days before dispatch" },
            { icon: MapPin, title: "Delivery", desc: "3–5 days domestic, 7–14 days international" },
            { icon: RefreshCcw, title: "Easy Returns", desc: "30-day return window, no questions asked" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card border border-border/50 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <p><strong className="text-foreground">Standard Delivery (3–5 business days):</strong> ₹199 flat fee. Free for orders above ₹10,000.</p>
              <p><strong className="text-foreground">Express Delivery (1–2 business days):</strong> ₹499 flat fee, available for select pin codes in metro cities.</p>
              <p><strong className="text-foreground">International Shipping:</strong> Starts at ₹1,499 depending on destination. Delivery within 7–14 business days. Customs duties and taxes are the responsibility of the recipient.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Order Tracking</h2>
            <p>Once your order is dispatched, you'll receive an email with your tracking number. You can track your parcel using the Track Order feature on our website or directly on the courier's website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Returns Policy</h2>
            <p className="mb-3">We accept returns within <strong className="text-foreground">30 days of delivery</strong>. To be eligible for a return:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Item must be unused and in its original condition</li>
              <li>Original packaging must be intact</li>
              <li>Tags and labels must still be attached</li>
              <li>Proof of purchase is required</li>
            </ul>
            <p className="mt-4">Certain items such as opened perfumes, personalised products, and items marked as non-returnable cannot be returned.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Refunds</h2>
            <p>Once we receive and inspect your return, we'll notify you via email. Approved refunds are processed to your original payment method within <strong className="text-foreground">5–7 business days</strong>. Shipping charges are non-refundable unless the return is due to our error.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">How to Initiate a Return</h2>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Email us at returns@riptosells.com with your order number</li>
              <li>Our team will send you a prepaid return label within 24 hours</li>
              <li>Pack the item securely and drop it off at any courier partner location</li>
              <li>Track your return and await your refund confirmation</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
