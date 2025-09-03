"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bitcoin, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      icon: Bitcoin,
      label: "Bitcoin",
      active: pathname === "/",
    },
    {
      href: "/about",
      icon: Info,
      label: "About",
      active: pathname === "/about",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="container-mobile">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link key={item.href} href={item.href} className={cn("flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 min-w-[80px]", item.active ? "bg-black text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50")}>
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
