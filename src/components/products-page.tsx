// app/products/page.tsx
import { prisma } from "@/lib/prisma";
import { ProductCard } from "./product-card";
import { SearchForm } from "./search";
import Link from "next/link";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    min?: string;
    max?: string;
  };
}) {
  // Build the filter conditions dynamically
  const whereConditions: any = {};

  if (searchParams?.query) {
    whereConditions.name = {
      contains: searchParams.query,
      mode: "insensitive" as const,
    };
  }

  if (searchParams?.min || searchParams?.max) {
    whereConditions.price = {};

    if (searchParams?.min) {
      const minPrice = Number(searchParams.min);
      if (!isNaN(minPrice)) {
        whereConditions.price.gte = minPrice;
      }
    }

    if (searchParams?.max) {
      const maxPrice = Number(searchParams.max);
      if (!isNaN(maxPrice)) {
        whereConditions.price.lte = maxPrice;
      }
    }
  }

  const products = await prisma.product.findMany({
    where: whereConditions,
    include: {
      seller: true,
    },
  });

  console.log(products);

  return (
    <div className="container mx-auto p-4">
      <SearchForm />
      <div className="flex my-8 justify-start space-x-4">
        <Link
          href="/cart"
          className="bg-gray-200 p-2 rounded-md text-black hover:bg-gray-300"
        >
          Cart
        </Link>
        <Link
          href="/wishlist"
          className="bg-gray-200 p-2 rounded-md text-black hover:bg-gray-300"
        >
          Wishlist
        </Link>
      </div>
      {products.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-gray-500">
            No products found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
