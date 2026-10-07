import type { Metadata, Viewport } from "next";
import { Inter, Ubuntu } from "next/font/google";

import { FloatingDatesPill } from "@/components/layout/FloatingDatesPill";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RentalProvider } from "@/components/layout/RentalProvider";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { brand, DEFAULT_CATEGORY, DEFAULT_CITY, SITE_URL } from "@/config/site";
import { getAllProducts } from "@/lib/products";

import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: brand.name, template: `%s` },
  applicationName: brand.name,
  authors: [{ name: brand.name }],
  creator: brand.name,
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#4C187C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const listingPath = `/${DEFAULT_CITY}/${DEFAULT_CATEGORY}`;
  const products = getAllProducts().map(
    ({ id, name, image, per_day_rent }) => ({
      id,
      name,
      image,
      per_day_rent,
    }),
  );

  return (
    <html lang="en-IN" className={`${ubuntu.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-primary-900 px-4 py-2 text-sm font-semibold text-gray-100 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <RentalProvider>
          <Header
            city={DEFAULT_CITY}
            listingPath={listingPath}
            products={products}
          />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <FloatingDatesPill />
          <ScrollToTop />
        </RentalProvider>
      </body>
    </html>
  );
}
