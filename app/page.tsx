"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Star, Shield, Truck, Globe, ChevronRight, ArrowRight, CheckCircle, Package, Users, TrendingUp, Award, Zap, Clock, MessageCircle, Heart, Eye } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { categories, trustStats, APP_NAME, APP_ACCENT } from "@/lib/data";

// ─── Inline mock data ────────────────────────────────────────────────────────

const featuredProducts = [
  {
    id: "p1",
    name: "Industrial CNC Milling Machine",
    category: "Machinery",
    price: "$4,200",
    moq: "1 unit",
    supplier: "Zhejiang PrecisionTech Co.",
    origin: "China",
    rating: 4.8,
    reviews: 312,
    badge: "Top Seller",
    image: "https://tormach.com/media/wysiwyg/1100MX-MillLanding.png",
    verified: true,
  },
  {
    id: "p2",
    name: "Wireless Bluetooth Earbuds OEM",
    category: "Electronics",
    price: "$8.50",
    moq: "500 pcs",
    supplier: "Shenzhen AudioMax Ltd.",
    origin: "China",
    rating: 4.7,
    reviews: 1840,
    badge: "Hot Deal",
    image: "https://i5.walmartimages.com/asr/128f2f94-bd7d-44dd-90b6-e855b3212d3c.a9f5ab84bfbd6972cab3d1aec3530c2a.jpeg?odnHeight=328&odnWidth=328&odnBg=FFFFFF",
    verified: true,
  },
  {
    id: "p3",
    name: "Organic Cotton T-Shirt Bulk",
    category: "Apparel",
    price: "$2.30",
    moq: "200 pcs",
    supplier: "Bangladesh TextilePro",
    origin: "Bangladesh",
    rating: 4.6,
    reviews: 920,
    badge: "Eco Certified",
    image: "http://organicblank.com/cdn/shop/collections/PS_NS305_DRIFTWOOD_2.png?v=1756325105",
    verified: true,
  },
  {
    id: "p4",
    name: "Solar Panel 400W Monocrystalline",
    category: "Electronics",
    price: "$95.00",
    moq: "10 units",
    supplier: "Jiangsu SolarPower Group",
    origin: "China",
    rating: 4.9,
    reviews: 674,
    badge: "New Arrival",
    image: "https://www.windynation.com/cdn/shop/products/FrontBack_f03c82c6-3aa5-459e-b2e1-105e6d4cf920.jpg?v=1674685844&width=1946",
    verified: true,
  },
  {
    id: "p5",
    name: "Stainless Steel Water Bottle",
    category: "Home & Garden",
    price: "$1.80",
    moq: "300 pcs",
    supplier: "Yiwu HomeGoods Factory",
    origin: "China",
    rating: 4.5,
    reviews: 2310,
    badge: "Best Value",
    image: "https://i.etsystatic.com/16291412/r/il/6a1ce9/3582734063/il_fullxfull.3582734063_eyq1.jpg",
    verified: false,
  },
  {
    id: "p6",
    name: "Electric Forklift 3-Ton Capacity",
    category: "Machinery",
    price: "$12,800",
    moq: "1 unit",
    supplier: "Hangzhou LiftTech Corp.",
    origin: "China",
    rating: 4.7,
    reviews: 188,
    badge: "Trade Assured",
    image: "https://toyotaforklift.scene7.com/is/image/toyotamh/3-Wheel%20Electric_8FBE20U_Studio_5",
    verified: true,
  },
  {
    id: "p7",
    name: "Vitamin C Serum Private Label",
    category: "Health & Beauty",
    price: "$3.40",
    moq: "100 pcs",
    supplier: "Seoul BeautyLab Co.",
    origin: "South Korea",
    rating: 4.8,
    reviews: 540,
    badge: "Top Seller",
    image: "https://www.ladyburd.com/wp-content/uploads/2024/02/TNR_vitaminc-serum-watermark-scaled.jpg",
    verified: true,
  },
  {
    id: "p8",
    name: "Corrugated Cardboard Boxes Custom",
    category: "Packaging",
    price: "$0.45",
    moq: "1000 pcs",
    supplier: "Guangzhou PackPro Ltd.",
    origin: "China",
    rating: 4.4,
    reviews: 3100,
    badge: "Bulk Discount",
    image: "https://customboxesmarket.com/wp-content/uploads/2025/01/corrugated-boxes-banner-scaled.webp",
    verified: true,
  },
];

const hotDeals = [
  {
    id: "d1",
    name: "LED Strip Lights 5M RGB",
    originalPrice: "$12.00",
    salePrice: "$5.90",
    discount: "51%",
    moq: "100 pcs",
    image: "https://picsum.photos/seed/a019f96c60b9/800/600",
    endsIn: "2d 14h",
  },
  {
    id: "d2",
    name: "Bamboo Cutting Board Set",
    originalPrice: "$8.50",
    salePrice: "$3.20",
    discount: "62%",
    moq: "50 sets",
    image: "https://www.zulaykitchen.com/cdn/shop/files/Bamboo_Cutting_Board_Set_3-Piece_3.jpg?v=1774622363&width=1800",
    endsIn: "1d 6h",
  },
  {
    id: "d3",
    name: "Portable Power Bank 20000mAh",
    originalPrice: "$18.00",
    salePrice: "$9.80",
    discount: "46%",
    moq: "200 pcs",
    image: "https://i5.walmartimages.com/seo/20000-mAh-Portable-Charger-Power-Bank-Dual-USB-Battery-Pack-for-iPhone-iPad-Galaxy-Android-Pixel-and-Tablet-Black_c01c4471-00f5-4b3f-90f6-c150e8a26d25.5b7f8365592d758bda90de260ddf7dbd.jpeg",
    endsIn: "3d 2h",
  },
  {
    id: "d4",
    name: "Yoga Mat Non-Slip 6mm",
    originalPrice: "$7.00",
    salePrice: "$2.90",
    discount: "59%",
    moq: "100 pcs",
    image: "https://www.living.fit/cdn/shop/files/YuneYogaMat_d823ca32-7c7d-487a-b735-3204d8822128_535x.jpg?v=1780607473",
    endsIn: "4d 18h",
  },
];

const topSuppliers = [
  {
    id: "s1",
    name: "Shenzhen TechWorld Manufacturing",
    country: "China",
    flag: "🇨🇳",
    categories: ["Electronics", "Gadgets"],
    rating: 4.9,
    transactions: "10K+",
    responseTime: "< 1h",
    image: "https://www.sandiegouniontribune.com/wp-content/uploads/migration/2016/05/19/00000169-0cdc-dbbe-a16f-4efc2b1e0000.jpg?w=640",
    verified: true,
    years: 12,
  },
  {
    id: "s2",
    name: "Istanbul Textile Group",
    country: "Turkey",
    flag: "🇹🇷",
    categories: ["Apparel", "Fabrics"],
    rating: 4.8,
    transactions: "5K+",
    responseTime: "< 2h",
    image: "https://media.cntraveler.com/photos/561550efd518609f2b3bdac9/16:9/w_2560%2Cc_limit/turkish-rugs-istanbul-turkey-cr-courtesy.jpg",
    verified: true,
    years: 8,
  },
  {
    id: "s3",
    name: "Mumbai Industrial Exports",
    country: "India",
    flag: "🇮🇳",
    categories: ["Machinery", "Auto Parts"],
    rating: 4.7,
    transactions: "3K+",
    responseTime: "< 3h",
    image: "https://www.reuters.com/resizer/v2/VNGJTFHWUNMZHECXW3GR5VDJQE.jpg?auth=c0b4cba2726f4edec3ef7768d9470f906f43c3746e9f859161391c8cfeb1a969&width=1080&quality=80",
    verified: true,
    years: 15,
  },
  {
    id: "s4",
    name: "São Paulo Consumer Goods Co.",
    country: "Brazil",
    flag: "🇧🇷",
    categories: ["Food & Bev", "Packaging"],
    rating: 4.6,
    transactions: "2K+",
    responseTime: "< 4h",
    image: "https://thumbs.dreamstime.com/b/ajinomoto-corporate-office-sao-paulo-brazil-japanese-based-consumer-goods-company-global-reach-178112757.jpg",
    verified: false,
    years: 6,
  },
];

const howItWorksSteps = [
  {
    step: "01",
    icon: Search,
    title: "Search & Discover",
    description:
      "Browse 120M+ products across 40+ categories. Use smart filters to find exactly what your business needs at the right price.",
  },
  {
    step: "02",
    icon: MessageCircle,
    title: "Connect with Suppliers",
    description:
      "Send RFQs, negotiate pricing, and chat directly with verified manufacturers. Get quotes within hours, not days.",
  },
  {
    step: "03",
    icon: Shield,
    title: "Trade with Confidence",
    description:
      "Our Trade Assurance program protects every order. Funds are held securely until you confirm delivery and quality.",
  },
  {
    step: "04",
    icon: Truck,
    title: "Fast Global Shipping",
    description:
      "Choose from air, sea, or express freight. Real-time tracking keeps you informed from factory floor to your door.",
  },
];

const valueProps = [
  {
    icon: Shield,
    title: "Trade Assurance",
    description:
      "Every transaction is protected. Payments are held in escrow until you confirm receipt and quality of goods.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Award,
    title: "Verified Suppliers",
    description:
      "All suppliers undergo rigorous background checks, factory audits, and certification verification before listing.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Globe,
    title: "200+ Countries",
    description:
      "Source from manufacturers in 60+ countries and ship to buyers in 200+ markets with our global logistics network.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Zap,
    title: "Instant RFQ",
    description:
      "Submit a Request for Quotation and receive competitive bids from multiple suppliers within 24 hours.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description:
      "Access real-time pricing trends, demand forecasts, and trade data to make smarter sourcing decisions.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Our multilingual trade specialists are available around the clock to assist with sourcing, disputes, and logistics.",
    color: "bg-teal-50 text-teal-600",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Marcus Okonkwo",
    role: "Procurement Manager",
    company: "Lagos RetailCo",
    country: "Nigeria",
    flag: "🇳🇬",
    avatar: "https://miro.medium.com/1*VaCgG2surymlJ53DrI0frQ.jpeg",
    quote:
      "TradeGlobe cut our sourcing time by 60%. We found three reliable electronics suppliers in China within a week. The Trade Assurance feature gave us the confidence to place large orders.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Sofia Hernandez",
    role: "Founder",
    company: "Boutique Imports MX",
    country: "Mexico",
    flag: "🇲🇽",
    avatar: "https://artandarchaeology.princeton.edu/sites/g/files/toruqf1651/files/styles/3x4_750w_1000h/public/2024-02/24sofia-hernandez.jpg?h=2144ebdf&itok=poHTrLok",
    quote:
      "As a small business owner, I was nervous about importing. TradeGlobe's verified supplier badges and escrow payments made the whole process feel safe. My first order arrived on time and exactly as described.",
    rating: 5,
  },
  {
    id: "t3",
    name: "James Whitfield",
    role: "Supply Chain Director",
    company: "Whitfield Industrial UK",
    country: "United Kingdom",
    flag: "🇬🇧",
    avatar: "https://www.nga.org/wp-content/uploads/2018/12/James_whitfield_Gov.jpg",
    quote:
      "We've been using TradeGlobe for machinery sourcing for four years. The quality of suppliers has improved every year. The RFQ system saves us weeks of back-and-forth negotiation.",
    rating: 5,
  },
];

const badgeColors: Record<string, string> = {
  "Top Seller": "bg-orange-100 text-orange-700",
  "Hot Deal": "bg-red-100 text-red-700",
  "Eco Certified": "bg-green-100 text-green-700",
  "New Arrival": "bg-blue-100 text-blue-700",
  "Best Value": "bg-yellow-100 text-yellow-700",
  "Trade Assured": "bg-purple-100 text-purple-700",
  "Bulk Discount": "bg-teal-100 text-teal-700",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All Categories");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  function toggleWishlist(id: string) {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] min-h-[88vh] flex items-center overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Accent glow */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#FF6A00]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-white"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-flex items-center gap-2 bg-[#FF6A00]/20 border border-[#FF6A00]/30 text-[#FF9A50] text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
                <Globe className="w-3.5 h-3.5" />
                Global B2B Marketplace
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-balance mb-6"
            >
              Source Smarter.
              <br />
              <span className="text-[#FF6A00]">Trade Globally.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/70 leading-relaxed max-w-lg mb-8 text-pretty"
            >
              Connect with 5 million verified suppliers across 60+ countries.
              Find the best prices on 120 million products and ship to your door
              with full trade protection.
            </motion.p>

            {/* Search bar */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="flex rounded-xl overflow-hidden shadow-[0_4px_32px_rgba(255,106,0,0.25)] border border-white/10">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="bg-[#FF6A00] text-white text-sm font-semibold px-4 py-3.5 outline-none cursor-pointer shrink-0"
                >
                  <option>All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, suppliers, categories..."
                  className="flex-1 px-4 py-3.5 text-sm bg-white text-[#1A1A2E] placeholder:text-gray-400 outline-none"
                />
                <button className="bg-[#FF6A00] hover:bg-[#E8380D] transition-colors px-6 flex items-center gap-2 font-semibold text-white text-sm shrink-0">
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {["CNC Machine", "LED Lights", "Cotton Fabric", "Solar Panel"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="text-xs text-white/50 hover:text-white/90 border border-white/15 hover:border-white/30 px-3 py-1 rounded-full transition-all duration-200"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </motion.div>

            {/* Trust stats row */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {trustStats.map((stat) => (
                <motion.div key={stat.label} variants={scaleIn}>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — product mosaic */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRight}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {featuredProducts.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] ${
                  i === 0 ? "col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    i === 0 ? "h-36" : "h-28"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span
                    className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      badgeColors[product.badge] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-white text-xs font-semibold leading-tight line-clamp-1">
                    {product.name}
                  </p>
                  <p className="text-[#FF6A00] font-black text-sm mt-1">
                    {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mb-12"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-[#FF6A00] uppercase tracking-widest mb-2"
            >
              Browse by Industry
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-4xl font-black tracking-tight text-[#1A1A2E] text-balance"
            >
              40+ Product Categories
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 mt-3 max-w-xl leading-relaxed"
            >
              From raw materials to finished goods, find every product your
              business needs in one place.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {categories.map((cat) => (
              <motion.a
                key={cat.id}
                href={`#deals`}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group bg-white border border-black/5 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(255,106,0,0.12)] hover:border-[#FF6A00]/20 transition-all duration-300 cursor-pointer"
              >
                <span className="text-3xl">{cat.icon}</span>
                <p className="text-sm font-semibold text-[#1A1A2E] text-center leading-tight group-hover:text-[#FF6A00] transition-colors">
                  {cat.name}
                </p>
                <p className="text-xs text-gray-400">
                  {(cat.count ?? 0).toLocaleString()} products
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-[#FF6A00] uppercase tracking-widest mb-2"
              >
                Curated for You
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl lg:text-4xl font-black tracking-tight text-[#1A1A2E]"
              >
                Featured Products
              </motion.h2>
            </div>
            <motion.a
              variants={fadeIn}
              href="#categories"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#FF6A00] hover:gap-3 transition-all duration-200 shrink-0"
            >
              View all products <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group bg-white border border-black/5 rounded-2xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Badge */}
                  <span
                    className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      badgeColors[product.badge] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {product.badge}
                  </span>
                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        wishlist.has(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                  {/* Quick view */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="flex items-center gap-1.5 bg-white text-[#1A1A2E] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md hover:bg-[#FF6A00] hover:text-white transition-colors duration-200">
                      <Eye className="w-3 h-3" /> Quick View
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-1">{product.category}</p>
                  <h3 className="text-sm font-semibold text-[#1A1A2E] leading-tight line-clamp-2 mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                      ({(product.reviews ?? 0).toLocaleString()})
                    </span>
                  </div>

                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <p className="text-lg font-black text-[#FF6A00]">
                        {product.price}
                      </p>
                      <p className="text-xs text-gray-400">
                        MOQ: {product.moq}
                      </p>
                    </div>
                    {product.verified && (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 truncate mb-3">
                    {product.supplier} · {product.origin}
                  </p>

                  <button className="w-full bg-[#1A1A2E] hover:bg-[#FF6A00] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors duration-300">
                    Contact Supplier
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOT DEALS ────────────────────────────────────────────────────── */}
      <section id="deals" className="py-20 bg-[#1A1A2E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF6A00]/8 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-[#FF6A00] uppercase tracking-widest mb-2"
              >
                Limited Time Offers
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl lg:text-4xl font-black tracking-tight text-white"
              >
                Hot Deals
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/50 mt-2 text-sm">
                Bulk discounts on high-demand products. Prices drop when you order more.
              </motion.p>
            </div>
            <motion.div
              variants={scaleIn}
              className="flex items-center gap-2 bg-[#FF6A00]/15 border border-[#FF6A00]/30 rounded-xl px-4 py-2.5"
            >
              <Clock className="w-4 h-4 text-[#FF6A00]" />
              <span className="text-white/80 text-sm font-medium">
                Deals refresh every 24h
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {hotDeals.map((deal) => (
              <motion.div
                key={deal.id}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF6A00]/30 hover:shadow-[0_8px_32px_rgba(255,106,0,0.15)] transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-lg">
                    -{deal.discount}
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
                    <Clock className="w-3 h-3 text-[#FF6A00]" />
                    {deal.endsIn}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white leading-tight mb-2">
                    {deal.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-black text-[#FF6A00]">
                      {deal.salePrice}
                    </span>
                    <span className="text-sm text-white/40 line-through">
                      {deal.originalPrice}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 mb-3">MOQ: {deal.moq}</p>
                  <button className="w-full bg-[#FF6A00] hover:bg-[#E8380D] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors duration-300">
                    Grab This Deal
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-[#FF6A00] uppercase tracking-widest mb-2"
            >
              Why TradeGlobe
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-4xl font-black tracking-tight text-[#1A1A2E] text-balance"
            >
              Built for Serious Global Trade
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed"
            >
              Every feature is designed to reduce risk, save time, and help your
              business grow across borders.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {valueProps.map((vp) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.title}
                  variants={fadeInUp}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="group bg-gray-50 border border-black/5 rounded-2xl p-6 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${vp.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A2E] mb-2">
                    {vp.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {vp.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-[#FF6A00] uppercase tracking-widest mb-2"
            >
              Simple Process
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-4xl font-black tracking-tight text-[#1A1A2E]"
            >
              From Search to Delivery in 4 Steps
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          >
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#FF6A00]/30 to-transparent" />

            {howItWorksSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="relative bg-white border border-black/5 rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)] text-center"
                >
                  <div className="relative inline-flex mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#1A1A2E] flex items-center justify-center shadow-[0_4px_16px_rgba(26,26,46,0.2)]">
                      <Icon className="w-7 h-7 text-[#FF6A00]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#FF6A00] text-white text-xs font-black flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A2E] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TOP SUPPLIERS ────────────────────────────────────────────────── */}
      <section id="suppliers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-[#FF6A00] uppercase tracking-widest mb-2"
              >
                Trusted Partners
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl lg:text-4xl font-black tracking-tight text-[#1A1A2E]"
              >
                Top Verified Suppliers
              </motion.h2>
            </div>
            <motion.a
              variants={fadeIn}
              href="#categories"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#FF6A00] hover:gap-3 transition-all duration-200 shrink-0"
            >
              Browse all suppliers <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {topSuppliers.map((supplier) => (
              <motion.div
                key={supplier.id}
                variants={fadeInUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group flex gap-4 bg-white border border-black/5 rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <img
                    src={supplier.image}
                    alt={supplier.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#1A1A2E] leading-tight">
                      {supplier.name}
                    </h3>
                    {supplier.verified && (
                      <span className="shrink-0 flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-2">
                    {supplier.flag} {supplier.country} · {supplier.years} yrs in business
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {supplier.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {supplier.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      {supplier.transactions} orders
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {supplier.responseTime}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center shrink-0">
                  <button className="bg-[#FF6A00] hover:bg-[#E8380D] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors duration-300">
                    Contact
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-[#FF6A00] uppercase tracking-widest mb-2"
            >
              Real Results
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-4xl font-black tracking-tight text-[#1A1A2E]"
            >
              Trusted by Buyers Worldwide
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`bg-white border border-black/5 rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] transition-all duration-300 ${
                  i === 1 ? "lg:mt-6" : ""
                }`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      "TradeGlobe cut our sourcing time by 60%. We found three reliable electronics suppliers in China within a week. The Trade Assurance feature gave us the confidence."
                      "TradeGlobe cut our sourcing time by 60%. We found three reliable electronics suppliers in China within a week. The Trade Assurance feature gave us the confidence."
                    "TradeGlobe cut our sourcing time by 60%. We found three reliable electronics suppliers in China within a week. The Trade Assurance feature gave us the confidence."
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A2E]">{t.name}</p>
                    <p className="text-xs text-gray-400">
                      {t.role}, {t.company} {t.flag}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT / RFQ CTA ────────────────────────────────────────────── */}
      <section id="contact" className="py-20 bg-[#1A1A2E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#FF6A00]/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={scaleIn} className="mb-4">
              <span className="inline-flex items-center gap-2 bg-[#FF6A00]/20 border border-[#FF6A00]/30 text-[#FF9A50] text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5" />
                Free to Get Started
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-black tracking-tight text-white text-balance mb-4"
            >
              Ready to Source Your Next
              <span className="text-[#FF6A00]"> Best Deal?</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            >
              Submit a free Request for Quotation and receive competitive bids
              from verified suppliers within 24 hours. No commitment required.
            </motion.p>

            {/* RFQ mini form */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 text-left max-w-2xl mx-auto"
            >
              <h3 className="text-white font-bold text-lg mb-5">
                Submit a Quick RFQ
              </h3>
              <RFQForm />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40"
            >
              {[
                { icon: Shield, text: "No spam, ever" },
                { icon: Users, text: "5M+ verified suppliers" },
                { icon: Clock, text: "Responses within 24h" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <span key={item.text} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#FF6A00]" />
                    {item.text}
                  </span>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// ─── RFQ Form (isolated to keep state clean) ─────────────────────────────────

function RFQForm() {
  const [form, setForm] = useState({
    product: "",
    quantity: "",
    unit: "pcs",
    category: "Electronics",
    email: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center py-8"
      >
        <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-green-400" />
        </div>
        <h4 className="text-white font-bold text-lg mb-2">RFQ Submitted!</h4>
        <p className="text-white/50 text-sm">
          We'll match you with verified suppliers and send quotes to your inbox
          within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-[#FF6A00] text-sm font-semibold hover:underline"
        >
          Submit another RFQ
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wide">
            Product Name
          </label>
          <input
            type="text"
            name="product"
            value={form.product}
            onChange={handleChange}
            placeholder="e.g. Wireless Earbuds"
            required
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FF6A00]/60 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wide">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6A00]/60 transition-colors"
          >
            {[
              "Electronics",
              "Machinery",
              "Apparel",
              "Home & Garden",
              "Auto Parts",
              "Food & Beverage",
              "Health & Beauty",
              "Sports",
              "Packaging",
              "Chemicals",
            ].map((c) => (
              <option key={c} value={c} className="bg-[#1A1A2E]">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wide">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="500"
            min="1"
            required
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FF6A00]/60 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wide">
            Unit
          </label>
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF6A00]/60 transition-colors"
          >
            {["pcs", "sets", "kg", "tons", "meters", "boxes", "pallets"].map(
              (u) => (
                <option key={u} value={u} className="bg-[#1A1A2E]">
                  {u}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wide">
          Your Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@company.com"
          required
          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FF6A00]/60 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wide">
          Additional Details
        </label>
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          placeholder="Specifications, target price, delivery timeline..."
          rows={3}
          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FF6A00]/60 transition-colors resize-none"
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-[#FF6A00] hover:bg-[#E8380D] text-white font-bold py-3.5 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
      >
        Send RFQ to Suppliers
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </form>
  );
}