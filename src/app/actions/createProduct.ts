// actions/products.ts
"use server";

import { createClient } from "@/lib/supabse/server";
// import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function createProduct(formData: {
  name: string;
  price: number;
  description?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Authentication required");

  // Verify user role
  const userData = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (userData?.role !== "SELLER") throw new Error("Unauthorized access");

  // Create Stripe product
  //   const stripeProduct = await stripe.products.create({
  //     name: formData.name,
  //     default_price_data: {
  //       currency: "USD",
  //       unit_amount: Math.round(formData.price * 100),
  //     },
  //     metadata: {
  //       seller_id: user.id,
  //     },
  //   });

  // Create database record
  await prisma.product.create({
    data: {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      sellerId: user.id,
    },
  });
}
