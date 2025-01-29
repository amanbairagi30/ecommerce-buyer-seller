"use client";

import { createClient } from "@/lib/supabse/client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";

export default function Home() {
  const supabase = createClient();

  // Fetch user data via API
  const { isPending, error, data } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold">Ecomm</h1>
      <div className="flex items-center gap-4">
        {data ? (
          <>
            <div className="flex items-center gap-4">
              {data?.role === "SELLER" ? (
                <Link href="/seller/dashboard">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <Link href="/buyer/profile">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Profile
                  </button>
                </Link>
              )}
            </div>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.reload(); // Refresh to clear session
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Login
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Auth
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
