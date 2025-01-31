import { Footer } from "@/components/footer";
import Hero from "@/components/hero";
import ProductsPage from "@/components/products-page";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-16">
      <Hero />
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex mt-20 w-full justify-center items-center">
          <h1 className="text-4xl font-serif text-center font-bold">
            Fast Fashion <br /> is here
          </h1>
        </div>
        <ProductsPage />
        <Link
          href="/products"
          className="flex items-center justify-center mt-10 gap-2"
        >
          View All <IconArrowUpRight className="size-4" />
        </Link>
      </div>
      <Footer />
    </div>
  );
}
