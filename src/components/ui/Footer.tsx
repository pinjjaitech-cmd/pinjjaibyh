"use client"
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import SocialMediaLinks from "@/components/SocialMediaLinks";

const floatingIcons = [
  { icon: "✦", x: "5%", y: "15%", size: "text-lg", delay: 0 },
  { icon: "◈", x: "15%", y: "70%", size: "text-2xl", delay: 0.3 },
  { icon: "✧", x: "25%", y: "30%", size: "text-sm", delay: 0.6 },
  { icon: "◇", x: "35%", y: "80%", size: "text-xl", delay: 0.2 },
  { icon: "✦", x: "50%", y: "20%", size: "text-xs", delay: 0.8 },
  { icon: "◈", x: "60%", y: "65%", size: "text-lg", delay: 0.4 },
  { icon: "✧", x: "72%", y: "25%", size: "text-2xl", delay: 0.1 },
  { icon: "◇", x: "80%", y: "75%", size: "text-sm", delay: 0.7 },
  { icon: "✦", x: "90%", y: "40%", size: "text-lg", delay: 0.5 },
  { icon: "✧", x: "45%", y: "50%", size: "text-xs", delay: 0.9 },
  { icon: "◈", x: "8%", y: "45%", size: "text-sm", delay: 1.0 },
  { icon: "◇", x: "92%", y: "12%", size: "text-xl", delay: 0.35 },
  { icon: "✦", x: "68%", y: "85%", size: "text-xs", delay: 0.55 },
  { icon: "✧", x: "38%", y: "10%", size: "text-lg", delay: 0.75 },
];

const crochetPatterns = [
  { d: "M10,30 Q25,5 40,30 Q55,55 70,30", x: "3%", y: "20%", delay: 0.2 },
  { d: "M0,15 C10,0 20,30 30,15 C40,0 50,30 60,15", x: "70%", y: "60%", delay: 0.5 },
  { d: "M5,25 Q20,0 35,25 Q50,50 65,25", x: "40%", y: "85%", delay: 0.8 },
  { d: "M0,20 C15,5 15,35 30,20 C45,5 45,35 60,20", x: "85%", y: "30%", delay: 0.4 },
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Successfully subscribed! Thank you for joining our community.' });
        setEmail(''); // Clear the input
      } else {
        setMessage({ 
          type: 'error', 
          text: result.error === 'Email already subscribed' 
            ? 'This email is already subscribed to our newsletter.' 
            : 'Failed to subscribe. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer ref={ref} className="relative bg-(--brand-primary) text-(--brand-white) w-full py-20 lg:py-28 overflow-hidden">
      {/* Radial gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,hsl(var(--brand-dark)/0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,hsl(var(--brand-primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_90%,hsl(var(--brand-dark)/0.08),transparent_40%)]" />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      {/* Floating decorative icons */}
      {floatingIcons.map((item, i) => (
        <motion.span
          key={i}
          className={`absolute ${item.size} text-(--brand-white)/[0.07] select-none pointer-events-none`}
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.2, delay: item.delay, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block"
            animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {item.icon}
          </motion.span>
        </motion.span>
      ))}

      {/* Crochet stitch SVG patterns */}
      {crochetPatterns.map((pattern, i) => (
        <motion.svg
          key={`stitch-${i}`}
          className="absolute pointer-events-none"
          style={{ left: pattern.x, top: pattern.y }}
          width="80"
          height="40"
          viewBox="0 0 70 40"
          fill="none"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isInView ? { opacity: 0.12 } : {}}
          transition={{ duration: 1.5, delay: pattern.delay }}
        >
          <motion.path
            d={pattern.d}
            stroke="hsl(var(--brand-white))"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: pattern.delay + 0.3, ease: "easeInOut" }}
          />
        </motion.svg>
      ))}

      {/* Thread-like decorative lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--brand-white) / 0.3), hsl(var(--brand-dark) / 0.2), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Brand statement */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="heading-display text-4xl lg:text-5xl tracking-[0.25em] mb-4">PINJJAI</h3>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-(--brand-white)/40" />
            <span className="text-(--brand-white) text-xs tracking-[0.3em] uppercase">by H</span>
            <span className="w-12 h-px bg-(--brand-white)/40" />
          </div>
          
          {/* Social Media Icons */}
          <motion.div 
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SocialMediaLinks />
          </motion.div>
          
          <p className="heading-editorial text-(--brand-white)/60 text-lg lg:text-xl max-w-lg mx-auto">
            Where heritage meets modern luxury
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h4 className="text-sm tracking-[0.25em] uppercase mb-6 text-(--brand-primary) font-semibold">Company</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "About Us", path: "/about" },
                { label: "Our Story", path: "/story" },
                { label: "Terms & Conditions", path: "/terms-and-conditions" },
                { label: "Privacy Policy", path: "/privacy-policy" },
              ].map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className="text-sm text-(--brand-white)/70 hover:text-(--brand-white)/50 transition-all duration-300 w-fit group flex items-center gap-2 relative"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-(--brand-white)/50 transition-all duration-300 absolute left-0" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <h4 className="text-sm tracking-[0.25em] uppercase mb-6 text-(--brand-primary) font-semibold">Services</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Gifting Services", path: "/gifting-services" },
                { label: "Work With Us", path: "/work-with-us" },
                { label: "Orders & Shipping", path: "/orders-and-shipping" },
                { label: "Returns & Exchanges", path: "/returns-and-exchanges" },
              ].map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className="text-sm text-(--brand-white)/70 hover:text-(--brand-white)/50 transition-all duration-300 w-fit group flex items-center gap-2 relative"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-(--brand-white)/50 transition-all duration-300 absolute left-0" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <h4 className="text-sm tracking-[0.25em] uppercase mb-6 text-(--brand-primary) font-semibold">Connect</h4>
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-center gap-3 group"
              >
                <Mail className="w-4 h-4 text-(--brand-white)/50 group-hover:text-white transition-colors duration-300" />
                <a 
                  href="mailto:pinjjaibyh@gmail.com" 
                  className="text-sm text-(--brand-white)/70 hover:text-white transition-colors duration-300"
                >
                  pinjjaibyh@gmail.com
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-4 h-4 text-(--brand-white)/50 group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                  📞
                </div>
                <a 
                  href="tel:+919899187882" 
                  className="text-sm text-(--brand-white)/70 hover:text-white transition-colors duration-300"
                >
                  +91 9899187882
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-4 h-4 text-(--brand-white)/50 group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                  🕐
                </div>
                <div className="text-sm text-(--brand-white)/70">
                  <div>Monday - Saturday</div>
                  <div>9:00 am - 5:00 pm IST</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="flex items-center gap-3 group"
              >
                <MapPin className="w-4 h-4 text-(--brand-white)/50 group-hover:text-white transition-colors duration-300" />
                <a 
                  href="https://maps.google.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-(--brand-white)/70 hover:text-white transition-colors duration-300"
                >
                  Delhi, India
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.85 }}
          >
            <h4 className="text-sm tracking-[0.25em] uppercase mb-6 text-(--brand-primary) font-semibold">Stay Connected</h4>
            <p className="text-sm text-(--brand-white)/60 leading-relaxed mb-4">
              Join our community to discover the art of traditional craftsmanship and be the first to know about new collections.
            </p>
            
            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-(--brand-white)/10 border border-(--brand-white)/20 rounded-full text-sm text-(--brand-white) placeholder:text-(--brand-white)/40 focus:outline-none focus:border-(--brand-white)/40 focus:bg-(--brand-white)/15 transition-all duration-300"
                  disabled={isSubmitting}
                />
                {email && (
                  <button
                    type="button"
                    onClick={() => setEmail("")}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-(--brand-white)/40 hover:text-(--brand-white)/60 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
              
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                >
                  {message.text}
                </motion.p>
              )}
              
              <motion.button
                type="submit"
                disabled={isSubmitting || !email}
                className="px-6 py-2 bg-(--brand-white) text-(--brand-primary) rounded-full text-sm font-medium hover:bg-(--brand-white)/90 transition-all duration-300 w-fit disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-(--brand-primary)/30 border-t-(--brand-primary) rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-(--brand-white)/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="text-xs text-(--brand-white)/30 tracking-widest"> 2026 Pinjjai by H. Handcrafted with purpose.</p>
          <p className="text-xs text-(--brand-white)/20 tracking-wider heading-editorial">
            Every thread, a story 
            Every thread, a story ✦
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
