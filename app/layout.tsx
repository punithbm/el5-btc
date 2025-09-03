import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EL5 BTC - Swipe Cards",
  description: "A Tinder-style card swiping app built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {/* Main content area with bottom padding for fixed nav */}
          <main className="pb-20">
            <div className="container-mobile">{children}</div>
          </main>

          {/* Fixed bottom navigation */}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
