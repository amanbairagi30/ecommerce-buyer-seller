// app/api/auth/signup/route.ts
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabse";

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  // 1. Create Supabase auth user
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role } },
  });

  if (error) return new Response(error.message, { status: 400 });

  // 2. Create Prisma user record
  await prisma.user.create({
    data: {
      id: user!.id,
      email: user!.email!,
      role,
    },
  });

  return new Response("User created", { status: 201 });
}
