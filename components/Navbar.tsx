"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { navLinks, navCTA, APP_NAME } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }

  function resolveHref(href: string): string {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#1A1A2E] text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-white/70">
            🌍 Global B2B Marketplace — 200+ Countries Served
          </span>
          <div className="flex items-center gap-4 text-white/70">
            <span>Sell on TradeGlobe</span>
            <span>|</span>
            <span>Help Center</span>
            <span>|</span>
            <span>English / USD</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-[0_2px_16px_rgba(0,0,0,0.10)] border-b border-black/5"
            : "bg-white border-b border-black/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6A00] to-[#E8380D] flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-sm">TG</span>
              </div>
              <span className="font-black text-xl tracking-tight text-[#1A1A2E] group-hover:text-[#FF6A00] transition-colors duration-200">
                {APP_NAME}
              </span>
            </Link>

            {/* Search bar — desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="flex w-full rounded-lg overflow-hidden border border-[#FF6A00] shadow-sm">
                <select className="bg-[#FF6A00] text-white text-xs font-semibold px-3 py-2 outline-none cursor-pointer">
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Machinery</option>
                  <option>Apparel</option>
                </select>
                <input
                  type="text"
                  placeholder="Search products, suppliers, categories..."
                  className="flex-1 px-3 py-2 text-sm outline-none bg-white text-[#1A1A2E] placeholder:text-gray-400"
                />
                <button className="bg-[#FF6A00] hover:bg-[#E8380D] transition-colors px-4 flex items-center justify-center">
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto md:ml-0">
              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 text-[#1A1A2E]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FF6A00] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {/* Account */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-[#1A1A2E]"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </motion.button>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:block"
              >
                <Link
                  href={resolveHref(navCTA.href)}
                  onClick={(e) => handleAnchorClick(e, navCTA.href)}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-[#FF6A00] hover:bg-[#E8380D] text-white text-sm font-bold transition-colors duration-200 shadow-sm"
                >
                  {navCTA.label}
                </Link>
              </motion.div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Nav links row — desktop */}
          <nav className="hidden md:flex items-center gap-1 pb-2 border-t border-gray-100 pt-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname === "/" && link.href === "/"
                    ? "text-[#FF6A00] bg-orange-50"
                    : "text-[#1A1A2E]/80 hover:text-[#FF6A00] hover:bg-orange-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <span className="ml-auto text-xs text-gray-400 font-medium">
              120M+ Products from Verified Suppliers
            </span>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed top-[64px] left-0 right-0 z-40 bg-white border-b border-black/5 shadow-lg overflow-hidden"
          >
            {/* Mobile search */}
            <div className="px-4 pt-3 pb-2">
              <div className="flex rounded-lg overflow-hidden border border-[#FF6A00]">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 px-3 py-2.5 text-sm outline-none bg-white"
                />
                <button className="bg-[#FF6A00] px-4 flex items-center">
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <nav className="px-4 pb-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#1A1A2E] hover:bg-orange-50 hover:text-[#FF6A00] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-2">
                <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#1A1A2E] hover:bg-gray-50">
                  <User className="w-4 h-4" />
                  Sign In / Register
                </button>
                <Link
                  href={resolveHref(navCTA.href)}
                  onClick={(e) => handleAnchorClick(e, navCTA.href)}
                  className="px-4 py-2.5 rounded-lg bg-[#FF6A00] text-white text-sm font-bold text-center"
                >
                  {navCTA.label}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}