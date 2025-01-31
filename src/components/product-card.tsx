"use client";

import Image from "next/image";
import { AddToCart } from "./add-to-cart";
import { WishlistButton } from "./wishlist-button";
import type { Product } from "@prisma/client";
import { product1 } from "@/constants/image";
import { useWishlist } from "@/hooks/useWishlist";

export function ProductCard({ product }: { product: Product }) {
  const { isInWishlist } = useWishlist();
  const isActive = isInWishlist(product.id);
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="aspect-square relative m-4 border rounded-lg overflow-hidden">
        <Image
          src={product1}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={`absolute top-0  rounded-xl size-10 flex items-center justify-center right-0 p-2 translate-x-full transition-transform duration-300 group-hover:translate-x-[-10px] group-hover:translate-y-[10px] ${
            isActive ? "border-2 border-red-500" : " border-2 "
          }`}
        >
          <WishlistButton productId={product.id} />
        </div>
      </div>

      <div className="p-4 bg-white">
        <h3 className="font-bold font-serif text-3xl text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <AddToCart productId={product.id} />
        </div>
      </div>
    </div>
  );
}
