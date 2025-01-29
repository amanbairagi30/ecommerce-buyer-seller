import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabse/server";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const userId = data?.user?.id;

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      email: true,
    },
  });

  return Response.json(userData);
}
