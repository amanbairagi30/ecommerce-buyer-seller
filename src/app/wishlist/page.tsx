// app/wishlist/page.tsx
"use client";

import { useWishlist } from "@/hooks/useWishlist";
import { ProductCard } from "@/components/product-card";
import { useState } from "react";
import { useEffect } from "react";
import { Product } from "@prisma/client";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      if (wishlist.length > 0) {
        const response = await fetch(`/api/products?ids=${wishlist.join(",")}`);
        const data = await response.json();
        setProducts(data);
      }
    }
    fetchProducts();
  }, [wishlist]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
