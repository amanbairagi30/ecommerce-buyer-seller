// app/api/products/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids")?.split(",") || [];

  const products = await prisma.product.findMany({
    where: {
      id: { in: ids },
    },
    include: {
      seller: true,
    },
  });

  return NextResponse.json(products);
}
