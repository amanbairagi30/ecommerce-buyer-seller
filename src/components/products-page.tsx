// app/products/page.tsx
import { ProductCard } from "./product-card";
import { SearchForm } from "./search";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

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
  const whereConditions: Prisma.ProductWhereInput = {};

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
    <div className="max-w-7xl mx-auto p-4">
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
