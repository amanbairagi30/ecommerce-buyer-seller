// app/seller/dashboard/products/page.tsx
"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/app/actions/createProduct";
import { Textarea } from "@/components/ui/textarea";
interface ProductFormData {
  name: string;
  price: string;
  description: string;
}
export default function ProductForm() {
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      price: "", // Keep this as a string, it will be converted later
      description: "",
    },
  });

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const formattedData = {
        ...data,
        price: parseFloat(data.price), // Convert price to a float
      };
      await createProduct(formattedData);
      form.reset();
      // Add toast notification
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 max-w-2xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} required />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} required />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Create Product</Button>
      </form>
    </Form>
  );
}
