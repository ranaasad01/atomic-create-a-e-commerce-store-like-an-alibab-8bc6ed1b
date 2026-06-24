"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Globe as Facebook } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerSections = [
  {
    title: "Marketplace",
    links: [
      { label: "Browse Categories", href: "#categories" },
      { label: "Hot Deals", href: "#deals" },
      { label: "New Arrivals", href: "#categories" },
      { label: "Verified Suppliers", href: "#suppliers" },
      { label: "Request a Quote", href: "#contact" },
    ],
  },
  {
    title: "For Suppliers",
    links: [
      { label: "Sell on TradeGlobe", href: "#contact" },
      { label: "Supplier Academy", href: "#how-it-works" },
      { label: "Advertising Solutions", href: "#contact" },
      { label: "Logistics Services", href: "#how-it-works" },
      { label: "Trade Assurance", href: "#how-it-works" },
    ],
  },
  {
    title: "For Buyers",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Buyer Protection", href: "#how-it-works" },
      { label: "Bulk Order Discounts", href: "#deals" },
      { label: "Inspection Services", href: "#how-it-works" },
      { label: "Payment Methods", href: "#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About TradeGlobe", href: "#contact" },
      { label: "Careers", href: "#contact" },
      { label: "Press & Media", href: "#contact" },
      { label: "Help Center", href: "#contact" },
      { label: "Privacy Policy", href: "#contact" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export default function Footer() {
  const pathname = usePathname();

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function resolveHref(href: string): string {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  }

  return (
    <footer className="bg-[#1A1A2E] text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10 bg-[#FF6A00]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <motion.div variants={fadeInUp}>
              <p className="text-sm font-semibold text-[#FF6A00] uppercase tracking-widest mb-1">
                Stay Ahead of the Market
              </p>
              <h3 className="text-xl font-bold text-white">
                Get trade insights and exclusive deals in your inbox.
              </h3>
            </motion.div>
            <motion.form
              variants={fadeInUp}
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto gap-2"
            >
              <div className="flex flex-1 md:w-80 rounded-lg overflow-hidden border border-white/20 bg-white/5">
                <Mail className="w-4 h-4 text-white/40 self-center ml-3 shrink-0" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6A00] hover:bg-[#E8380D] rounded-lg text-sm font-bold text-white transition-colors shrink-0"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-5 gap-8"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6A00] to-[#E8380D] flex items-center justify-center">
                <span className="text-white font-black text-sm">TG</span>
              </div>
              <span className="font-black text-lg tracking-tight text-white">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              {APP_TAGLINE}. Connecting buyers and suppliers across 200+ countries with trust and transparency.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FF6A00] flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={resolveHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {APP_NAME}, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Cookie Settings</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}