import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="bg-orange-200 mt-44">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-foreground text-2xl font-bold font-serif">
              Shop
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/new-arrivals"
                  className="hover:text-foreground transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/bestsellers"
                  className="hover:text-foreground transition-colors"
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  href="/sale"
                  className="hover:text-foreground transition-colors"
                >
                  Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="hover:text-foreground transition-colors"
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-foreground text-2xl font-bold font-serif">
              About
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/our-story"
                  className="hover:text-foreground transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="hover:text-foreground transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="hover:text-foreground transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-foreground text-2xl font-bold font-serif">
              Customer Care
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-foreground transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="hover:text-foreground transition-colors"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-foreground text-2xl font-bold font-serif">
              Stay Connected
            </h2>
            <p className="text-sm">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="focus-visible:ring-orange-500 border-orange-500"
              />
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Subscribe
              </Button>
            </form>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-foreground transition-colors">
                <IconBrandInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                <IconBrandFacebook className="w-6 h-6" />
              </a>

              <a href="#" className="hover:text-foreground transition-colors">
                <IconBrandX className="w-6 h-6" />
              </a>

              <a href="#" className=" hover:text-foreground transition-colors">
                <IconBrandYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t  flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Ecomm. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-sm hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
