// app/cart/page.tsx
"use client";

import { useCart } from "@/hooks/useCart";
import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prisma";
import { useEffect } from "react";
import { useState } from "react";

export default function CartPage() {
  const { cart } = useCart();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(
        `/api/products?ids=${cart.map((item) => item.productId).join(",")}`
      );
      const data = await response.json();
      setProducts(data);
    }

    if (cart.length > 0) fetchProducts();
  }, [cart]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
