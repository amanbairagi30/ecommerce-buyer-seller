// app/seller/dashboard/layout.tsx
import { createClient } from "@/lib/supabse/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  const profile = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (profile?.role !== "SELLER") redirect("/");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
      {children}
    </div>
  );
}
