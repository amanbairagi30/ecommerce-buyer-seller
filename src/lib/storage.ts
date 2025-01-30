// lib/storage.ts
export type CartItem = {
  productId: string;
  quantity: number;
};

export type WishlistItem = {
  productId: string;
};

export const getCartItems = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const items = localStorage.getItem("cart");
  return items ? JSON.parse(items) : [];
};

export const addToCartStorage = (productId: string) => {
  const items = getCartItems();
  const existing = items.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(items));
  return items;
};

export const removeFromCartStorage = (productId: string) => {
  const items = getCartItems();
  const index = items.findIndex((item) => item.productId === productId);

  if (index > -1) {
    if (items[index].quantity > 1) {
      items[index].quantity -= 1;
    } else {
      items.splice(index, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(items));
  return items;
};

export const getWishlistItems = (): string[] => {
  if (typeof window === "undefined") return [];
  const items = localStorage.getItem("wishlist");
  return items ? JSON.parse(items) : [];
};

export const toggleWishlistStorage = (productId: string) => {
  const items = getWishlistItems();
  const index = items.indexOf(productId);

  if (index > -1) {
    items.splice(index, 1);
  } else {
    items.push(productId);
  }

  localStorage.setItem("wishlist", JSON.stringify(items));
  return items;
};
