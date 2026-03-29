"use client"
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Facebook, Instagram, Youtube, Mail, MapPin } from "lucide-react";

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
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { icon: Facebook, href: "#", label: "Facebook" },
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Youtube, href: "#", label: "Youtube" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="w-10 h-10 bg-(--brand-white)/10 rounded-full flex items-center justify-center hover:bg-(--brand-white)/20 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--brand-white) / 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5 text-(--brand-white) group-hover:text-(--brand-primary) transition-colors duration-300" />
              </motion.a>
            ))}
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
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Terms and Conditions", path: "/terms" },
                { label: "Disclaimer", path: "/disclaimer" },
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

          {/* Collections Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <h4 className="text-sm tracking-[0.25em] uppercase mb-6 text-(--brand-primary) font-semibold">Collections</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Ziyabana", path: "/collections/ziyabana" },
                { label: "Roots", path: "/collections/roots" },
                { label: "Sahara", path: "/collections/sahara" },
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
            <h4 className="text-sm tracking-[0.25em] uppercase mb-6 text-(--brand-primary) font-semibold">Contact Information</h4>
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-center gap-3 group"
              >
                <Mail className="w-4 h-4 text-(--brand-white)/50 group-hover:text-(--brand-primary) transition-colors duration-300" />
                <a 
                  href="mailto:hello@pinjjai.com" 
                  className="text-sm text-(--brand-white)/70 hover:text-(--brand-primary) transition-colors duration-300"
                >
                  hello@pinjjai.com
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center gap-3 group"
              >
                <MapPin className="w-4 h-4 text-(--brand-white)/50 group-hover:text-(--brand-primary) transition-colors duration-300" />
                <a 
                  href="https://maps.google.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-(--brand-white)/70 hover:text-(--brand-primary) transition-colors duration-300"
                >
                  Punjab, India
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Info or Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.85 }}
          >
            <h4 className="text-sm tracking-[0.25em] uppercase mb-6 text-(--brand-primary) font-semibold">Stay Connected</h4>
            <p className="text-sm text-(--brand-white)/60 leading-relaxed mb-4">
              Join our community to discover the art of traditional craftsmanship and be the first to know about new collections.
            </p>
            <motion.button
              className="px-6 py-2 bg-(--brand-white) text-(--brand-primary) rounded-full text-sm font-medium hover:bg-(--brand-white)/90 transition-all duration-300 w-fit"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
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
