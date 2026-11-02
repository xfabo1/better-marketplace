import { categories } from "@/constants/categories";
import { notFound, redirect } from "next/navigation";

// /category/transport or /category/transport/motorcycles shows the listings page filtered by that category
export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const [categoryId, subcategoryId, ...rest] = slug;

  const category = categories.find(candidate => candidate.id === categoryId);
  if (!category || rest.length > 0) {
    notFound();
  }

  if (!subcategoryId) {
    redirect(`/listings?category=${category.id}`);
  }

  if (!category.subcategories?.some(subcategory => subcategory.id === subcategoryId)) {
    notFound();
  }
  redirect(`/listings?category=${category.id}&subcategory=${subcategoryId}`);
}
