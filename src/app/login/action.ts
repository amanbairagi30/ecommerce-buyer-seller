"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabse/server";
import { UserRole } from "@prisma/client";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }
  console.log(error);
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const inputData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as UserRole,
  };

  console.log(inputData);

  const { data, error } = await supabase.auth.signUp(inputData);

  if (error) {
    redirect("/error");
  }
  if (data.user) {
    // Sync with Prisma
    const user = await prisma.user.create({
      data: {
        id: data.user.id, // Supabase user ID
        email: data.user.email!,
        role: inputData.role,
      },
    });
    console.log("User created in Prisma:", user);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
