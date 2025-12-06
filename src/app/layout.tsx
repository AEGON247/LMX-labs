import type { Metadata } from "next";
import { Fredoka, Outfit } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import SplashLoader from "@/components/SplashLoader";
import Navbar from "@/components/Navbar";

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LMX Labs | Ridiculously Tasty Web Experiences",
  description: "A fun, experimental web studio that designs software and websites for restaurants, cafes, bakeries, and other food brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${outfit.variable} antialiased`}
      >
        <SplashLoader />
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

