import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { default as Navbar } from "./components/layout/Navbar";
import { default as Footer } from "./components/layout/Footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { ImageFix } from "./components/ImageFix";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "TourEase - AI-Powered Travel Assistant",
    template: "%s | TourEase",
  },
  description: "Plan your perfect trip with AI-powered travel assistance. Get personalized itineraries, budget planning, and smart recommendations.",
  keywords: ["travel", "AI", "itinerary", "planning", "trip", "vacation", "tour", "assistant"],
  authors: [{ name: "TourEase Team" }],
  creator: "TourEase",
  publisher: "TourEase",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: "https://tourease.app",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TourEase - AI-Powered Travel Assistant",
    description: "Plan your perfect trip with AI-powered travel assistance. Get personalized itineraries, budget planning, and smart recommendations.",
    url: "https://tourease.app",
    siteName: "TourEase",
    images: [
      {
        url: "https://tourease.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TourEase - AI-Powered Travel Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TourEase - AI-Powered Travel Assistant",
    description: "Plan your perfect trip with AI-powered travel assistance. Get personalized itineraries, budget planning, and smart recommendations.",
    images: ["https://tourease.app/twitter-image.jpg"],
    creator: "@tourease",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
          <ImageFix />
        </ThemeProvider>
      </body>
    </html>
  );
}
