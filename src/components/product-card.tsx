// components/ProductCard.tsx
"use client";

import { AddToCart } from "./add-to-cart";
import { WishlistButton } from "./wishlist-button";
import { Product } from "@prisma/client";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <WishlistButton productId={product.id} />
      </div>
      <p className="text-gray-500 mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">${product.price}</p>
        <AddToCart productId={product.id} />
      </div>
    </div>
  );
}
