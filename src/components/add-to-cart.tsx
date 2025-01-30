"use client";

import { useCart } from "@/hooks/useCart";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";

export function AddToCart({ productId }: { productId: string }) {
  const { cart, addItem, removeItem } = useCart();

  const cartItem = cart.find((item) => item.productId === productId);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addItem(productId);
    toast.success("Added to cart!");
  };

  const handleRemove = () => {
    removeItem(productId);
    toast.success("Removed from cart!");
  };

  if (quantity === 0) {
    return <Button onClick={handleAdd}>Add to Cart</Button>;
  }

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={handleRemove}>
        <Minus className="h-4 w-4" />
      </Button>
      <span>{quantity}</span>
      <Button variant="outline" size="icon" onClick={handleAdd}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
