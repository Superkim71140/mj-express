import type { Metadata } from "next";
import { Prompt, Sarabun } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import MobileBottomNav from "@/components/MobileBottomNav";
import { siteConfig } from "@/lib/seo/site-config";

const promptFont = Prompt({
  variable: "--font-prompt",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["thai", "latin"],
  display: "swap",
});

const sarabunFont = Sarabun({
  variable: "--font-sarabun",
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.defaultDescription,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.businessName }],
  creator: siteConfig.businessName,
  publisher: siteConfig.businessName,
  applicationName: siteConfig.businessName,
  category: "Transportation",
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "googlef4b84622b6d0dd15",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.baseUrl,
    siteName: siteConfig.businessName,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.businessName} รถรับจ้างย้ายบ้าน ขนของ ขนส่งมอเตอร์ไซค์ ทั่วไทย`,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/assets/brand/favicon-96x96.png", type: "image/png" }
    ],
    apple: "/assets/brand/favicon-96x96.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${promptFont.variable} ${sarabunFont.variable}`}>
      <body>
        <TopBar />
        <Header />
        {children}
        <Footer />
        <FloatingCTA />
        <MobileBottomNav />
      </body>
    </html>
  );
}
