// components/search-form.tsx
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
interface SearchFormData {
  query?: string;
  min?: string;
  max?: string;
}
export function SearchForm() {
  const router = useRouter();
  const form = useForm();
  // remove any and gicve the correct type
  const onSubmit = (data: SearchFormData) => {
    const params = new URLSearchParams();
    if (data.query) params.set("query", data.query);
    if (data.min) params.set("min", data.min);
    if (data.max) params.set("max", data.max);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row gap-4"
    >
      <Input placeholder="Search products..." {...form.register("query")} />
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Min price"
          {...form.register("min")}
          className="w-24"
        />
        <Input
          type="number"
          placeholder="Max price"
          {...form.register("max")}
          className="w-24"
        />
      </div>
      <Button type="submit">Filter</Button>
    </form>
  );
}
