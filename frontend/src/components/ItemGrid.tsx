"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { PreviewItemDto } from "@/types/types";

interface ItemGridProps {
  items: PreviewItemDto[];
  isLoading: boolean;
  layout?: "grid" | "compact";
  showCategory?: boolean;
  getCategoryTranslationKey?: (category: string) => string;
}

export default function ItemGrid({
  items,
  isLoading,
  layout = "grid",
  showCategory = false,
  getCategoryTranslationKey
}: ItemGridProps) {
  const { t } = useLanguage();

  if (isLoading) {
    const skeletonCount = layout === "compact" ? 15 : 6;
    const gridCols = layout === "compact" 
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" 
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

    return (
      <div className={`grid ${gridCols} gap-${layout === "compact" ? "3" : "6"}`}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className={`bg-gray-200 rounded-lg mb-3 ${
              layout === "compact" ? "h-32" : "aspect-square"
            }`}></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">{t("no_listings_found")}</h3>
        <p className="mt-1 text-sm text-gray-500">{t("try_different_search")}</p>
      </div>
    );
  }

  if (layout === "compact") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {items.map((item) => (
          <Link href={`/listing/${item.id}`} key={item.id} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
              <div className="relative h-32 w-full">
                <Image
                  src="https://placehold.co/800x600/e6f7ef/10b981/png?text=No+Image"
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="p-2 flex-grow flex flex-col">
                {showCategory && getCategoryTranslationKey && item.category && (
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-primary font-medium truncate max-w-[70%]">
                      {t(getCategoryTranslationKey(item.category))}
                    </div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      {/* TODO: Show date when backend provides createdAt */}
                    </div>
                  </div>
                )}
                <h3 className="text-xs font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 mb-1 line-clamp-2">
                  {item.title}
                </h3>
                <div className="text-xs text-gray-600 mb-1 hidden sm:block">
                  {t(item.condition)}
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900">
                    {item.price.toLocaleString()} {item.currency}
                  </span>
                  <span className="text-xs text-gray-500 truncate max-w-[40%]">
                    {item.placeName}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // Default grid layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="group cursor-pointer">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
            <div className="h-full w-full bg-gray-200 flex items-center justify-center group-hover:opacity-75 transition-opacity">
              <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm text-gray-700 truncate">
                <a href={`/listing/${item.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {item.title}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500 truncate">
                {item.placeName}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <p className="text-sm font-medium text-gray-900">
                {item.price} {item.currency}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 