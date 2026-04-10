import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "mySmartCreditCard — Travel Smarter with Rewards",
    template: "%s | mySmartCreditCard",
  },
  description:
    "Expert guides, reviews, and tips to help you earn more points, travel smarter, and maximize your credit card rewards.",
  keywords: ["travel credit cards", "rewards cards", "credit card points", "airline miles", "travel rewards"],
  authors: [{ name: "mySmartCreditCard" }],
  creator: "mySmartCreditCard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mysmartcreditcard.com",
    siteName: "mySmartCreditCard",
    title: "mySmartCreditCard — Travel Smarter with Rewards",
    description:
      "Expert guides, reviews, and tips to help you earn more points, travel smarter, and maximize your credit card rewards.",
  },
  twitter: {
    card: "summary_large_image",
    title: "mySmartCreditCard — Travel Smarter with Rewards",
    description:
      "Expert guides, reviews, and tips to help you earn more points, travel smarter, and maximize your credit card rewards.",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
