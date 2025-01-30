// components/WishlistButton.tsx
"use client";

import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

export function WishlistButton({ productId }: { productId: string }) {
  const { toggleItem, isInWishlist } = useWishlist();
  const isActive = isInWishlist(productId);

  return (
    <Button variant="ghost" size="icon" onClick={() => toggleItem(productId)}>
      <Heart
        className={`h-4 w-4 ${isActive ? "fill-red-500 stroke-red-500" : ""}`}
      />
    </Button>
  );
}
