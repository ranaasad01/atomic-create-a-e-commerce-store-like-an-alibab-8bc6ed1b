import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TradeGlobe — Global B2B Marketplace",
  description:
    "Connect with verified suppliers worldwide. Source products in bulk, request quotes, and grow your business with TradeGlobe.",
  keywords: [
    "B2B marketplace",
    "wholesale",
    "bulk orders",
    "global trade",
    "suppliers",
    "manufacturers",
  ],
  openGraph: {
    title: "TradeGlobe — Global B2B Marketplace",
    description:
      "Connect with verified suppliers worldwide. Source products in bulk and grow your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#F5F5F5] text-[#1A1A2E] antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}