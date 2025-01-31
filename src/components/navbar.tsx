"use client";

import { createClient } from "@/lib/supabse/client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconLayoutDashboardFilled, IconUser } from "@tabler/icons-react";

export default function Navbar() {
  const supabase = createClient();
  const [isScrolled, setIsScrolled] = useState(false);

  // Fetch user data via API
  const { isPending, error, data } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <nav
      className={`fixed top-0 border-b drop-shadow-sm bg left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              Ecom
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-64 pl-10 pr-4 rounded-full focus:ring-2 focus:ring-purple-600"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
            {data && !isPending ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={undefined} alt={data.name || "User"} />
                      <AvatarFallback>
                        {data.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {data.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {data.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      href={
                        data.role === "SELLER"
                          ? "/seller/dashboard"
                          : "/buyer/profile"
                      }
                      className="flex items-center gap-2"
                    >
                      {data.role === "SELLER" ? (
                        <IconLayoutDashboardFilled className="mr-2 h-4 w-4" />
                      ) : (
                        <IconUser className="mr-2 h-4 w-4" />
                      )}
                      {data.role === "SELLER" ? "Dashboard" : "Profile"}
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.reload(); // Refresh to clear session
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost">Login</Button>
                <Button>Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
