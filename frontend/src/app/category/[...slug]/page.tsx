import { categories } from "@/data/categories";
import { notFound, redirect } from "next/navigation";

// The sidebar links use Czech slugs (/category/doprava/motorky); items are stored with the category ids
// (transport / motorcycles), so translate the slug and show the filtered listings page.
export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const href = `/category/${slug.map(decodeURIComponent).join("/")}`;

  for (const category of categories) {
    if (category.href === href) {
      redirect(`/listings?category=${category.id}`);
    }
    const subcategory = category.subcategories?.find(sub => sub.href === href);
    if (subcategory) {
      redirect(`/listings?category=${category.id}&subcategory=${subcategory.id}`);
    }
  }

  notFound();
}
