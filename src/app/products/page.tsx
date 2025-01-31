import ProductsPage from "@/components/products-page";
import { SearchForm } from "@/components/search";

export default function Products() {
  return (
    <>
      <section className="max-w-7xl mt-16 mx-auto p-4">
        <SearchForm />
        <ProductsPage />
      </section>
    </>
  );
}
