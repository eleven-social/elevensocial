import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://eleven-social.com"),
  title: "Eleven-Social — Every Match. Every Vibe.",
  description:
    "Find every World Cup 2026 watch party, fan festival, and viewing event across the USA, Canada, and Mexico. Search by city. All free.",
  openGraph: {
    title: "Eleven-Social — Every Match. Every Vibe.",
    description:
      "Find every World Cup 2026 watch party and fan festival across the USA, Canada, and Mexico. Search by city.",
    url: "https://eleven-social.com",
    siteName: "Eleven-Social",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eleven-Social — Every Match. Every Vibe.",
    description:
      "Find every World Cup 2026 watch party and fan festival across the USA, Canada, and Mexico.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

