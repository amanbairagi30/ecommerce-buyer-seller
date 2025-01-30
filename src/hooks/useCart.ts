import { useEffect, useState } from "react";
import {
  addToCartStorage,
  removeFromCartStorage,
  type CartItem,
  getCartItems,
} from "@/lib/storage";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCartItems());
  }, []);

  return {
    cart,
    count: cart.reduce((total, item) => total + item.quantity, 0),
    addItem: (productId: string) => {
      const newCart = addToCartStorage(productId);
      setCart(newCart);
    },
    removeItem: (productId: string) => {
      const newCart = removeFromCartStorage(productId);
      setCart(newCart);
    },
  };
}
