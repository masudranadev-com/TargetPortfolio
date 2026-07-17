import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { ClientActivityTracker } from "@/components/ClientActivityTracker";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MR InfinityX | Target Marketplace Services",
  description:
    "Target Platform product SEO, ratings, reviews, keyword analysis, and content management services.",
  applicationName: "MR InfinityX",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Suspense fallback={null}>
          <ClientActivityTracker />
        </Suspense>
      </body>
    </html>
  );
}
