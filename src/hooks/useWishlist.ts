// hooks/useWishlist.ts
import { useEffect, useState } from "react";
import { getWishlistItems, toggleWishlistStorage } from "@/lib/storage";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setWishlist(getWishlistItems());
  }, []);

  return {
    wishlist,
    toggleItem: (productId: string) => {
      const newWishlist = toggleWishlistStorage(productId);
      setWishlist(newWishlist);
    },
    isInWishlist: (productId: string) => wishlist.includes(productId),
  };
}
