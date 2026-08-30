import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Sarathi Grid — Convoy Orchestration",
  description: "Intelligent convoy routing and resource mapping for Wari logistics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mapplsToken = process.env.NEXT_PUBLIC_MAPPLS_ACCESS_TOKEN || "your_access_token";
  const mapplsScriptSrc = `https://apis.mappls.com/advancedmaps/api/${mapplsToken}/map_sdk?v=3.0&layer=vector`;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950">
        {/* Asynchronous script loading without blocking hydration */}
        <Script
          src={mapplsScriptSrc}
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
