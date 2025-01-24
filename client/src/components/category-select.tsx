import { getStrapiURL } from "@/lib/utils";
import CategoryButton from "./category-button";

async function loader() {
  const { fetchData } = await import("@/lib/fetch");
  const path = "/api/categories";
  const baseUrl = getStrapiURL();
  const url = new URL(path, baseUrl);
  const data = await fetchData(url.href);
  return data;
}

interface Category {
  name: string;
  documentId: string;
}

export async function CategorySelect() {
  const data = await loader();
  const categories = data?.data;
  if (!categories) return null;

  return (
    <div className="w-full flex gap-2 justify-center items-center">
      {categories.map((category: Category) => (
        <CategoryButton key={category.documentId} value={category.name}>
          {category.name}
        </CategoryButton>
      ))}
      <CategoryButton value="">all</CategoryButton>
    </div>
  );
}
