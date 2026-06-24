export type NavLink = {
  label: string;
  href: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
};

export const APP_NAME = "TradeGlobe";
export const APP_TAGLINE = "Source Smarter. Trade Globally.";
export const APP_ACCENT = "#FF6A00";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "#categories" },
  { label: "Hot Deals", href: "#deals" },
  { label: "Suppliers", href: "#suppliers" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Start Sourcing",
  href: "#categories",
};

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", icon: "⚡", count: 48200 },
  { id: "machinery", name: "Machinery", icon: "⚙️", count: 31500 },
  { id: "apparel", name: "Apparel & Textiles", icon: "👕", count: 62100 },
  { id: "home-garden", name: "Home & Garden", icon: "🏡", count: 27800 },
  { id: "auto-parts", name: "Auto Parts", icon: "🚗", count: 19400 },
  { id: "food-bev", name: "Food & Beverage", icon: "🍱", count: 14300 },
  { id: "health-beauty", name: "Health & Beauty", icon: "💊", count: 22600 },
  { id: "sports", name: "Sports & Outdoors", icon: "🏋️", count: 11900 },
  { id: "packaging", name: "Packaging", icon: "📦", count: 8700 },
  { id: "chemicals", name: "Chemicals", icon: "🧪", count: 6200 },
];

export const trustStats = [
  { value: "200+", label: "Countries Served" },
  { value: "5M+", label: "Verified Suppliers" },
  { value: "120M+", label: "Products Listed" },
  { value: "$2.8T", label: "Annual Trade Volume" },
];