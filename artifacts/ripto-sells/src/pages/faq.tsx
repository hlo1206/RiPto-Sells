import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse our collections, add items to your cart, and proceed to checkout. You'll need to sign in to complete your purchase. We accept all major payment methods."
  },
  {
    q: "Are all products genuine?",
    a: "Yes, 100%. Every product sold on RiPto Sells is verified for authenticity. We source directly from authorised distributors and brands to ensure you receive only genuine luxury goods."
  },
  {
    q: "What is the delivery time?",
    a: "Domestic orders typically arrive within 3–5 business days. Metro cities like Delhi, Mumbai, and Bangalore usually receive orders within 2–3 business days. International orders take 7–14 business days."
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes! Orders above ₹10,000 qualify for free shipping. For orders below this threshold, a flat shipping fee of ₹199 is applied."
  },
  {
    q: "What is your return policy?",
    a: "We offer hassle-free returns within 30 days of delivery. Products must be unused, undamaged, and in their original packaging. Once we receive and inspect the return, refunds are processed within 5–7 business days."
  },
  {
    q: "Can I track my order?",
    a: "Absolutely! After your order ships, you'll receive an email with a tracking number. You can use it on our Track Order page or directly on the courier's website."
  },
  {
    q: "How do I cancel an order?",
    a: "You can cancel an order within 24 hours of placing it by contacting our support team. Once dispatched, orders cannot be cancelled but can be returned after delivery."
  },
  {
    q: "Is my payment information safe?",
    a: "Yes. All transactions on RiPto Sells are secured with 256-bit SSL encryption. We do not store your card details on our servers."
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to over 50 countries worldwide. International shipping charges and delivery times vary by destination. Customs duties may apply."
  },
  {
    q: "How can I contact customer support?",
    a: "You can reach us via email at support@riptosells.com or through our Contact Us page. Our team is available Monday–Saturday, 10 AM to 6 PM IST."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-12">Everything you need to know about shopping with RiPto Sells.</p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-secondary/30 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
