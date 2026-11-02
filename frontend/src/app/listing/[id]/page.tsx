"use client";

import { getItemById, getItems } from "@/api/itemApi";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { NO_IMAGE_URL } from "@/constants/images";
import { formatDate, formatPrice } from "@/lib/format";
import type { ItemDetails, PreviewItem } from "@/types/item";
import { useEffect, useState } from "react";

const SIMILAR_ITEMS_COUNT = 3;

export default function ListingDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [item, setItem] = useState<ItemDetails | null>(null);
  const [similarItems, setSimilarItems] = useState<PreviewItem[]>([]);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setHasError(false);
        setItem(await getItemById(id.toString()));
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  useEffect(() => {
    if (!item?.category) {
      setSimilarItems([]);
      return;
    }

    getItems({
      category: item.category,
      subcategory: item.subcategory ?? undefined,
      pageSize: SIMILAR_ITEMS_COUNT + 1,
    })
      .then(items =>
        setSimilarItems(items.filter(similar => similar.id !== item.id).slice(0, SIMILAR_ITEMS_COUNT))
      )
      .catch(() => setSimilarItems([]));
  }, [item]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-4 text-gray-600">{t("loading_listing")}</p>
          </div>
        </main>
      </div>
    );
  }

  if (hasError || !item) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">{t("listing_not_found")}</h1>
            <p className="text-gray-600 mb-6">{t("listing_error")}</p>
            <Link
              href="/listings"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {t("back_to_listings")}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const categoryHref = `/listings?category=${encodeURIComponent(item.category ?? "")}`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">
              {t("home")}
            </Link>
            {item.category && (
              <>
                {" "}&gt;{" "}
                <Link href={categoryHref} className="hover:text-primary">
                  {t(item.category)}
                </Link>
              </>
            )}
            {item.category && item.subcategory && (
              <>
                {" "}&gt;{" "}
                <Link
                  href={`${categoryHref}&subcategory=${encodeURIComponent(item.subcategory)}`}
                  className="hover:text-primary"
                >
                  {t(item.subcategory)}
                </Link>
              </>
            )}
            {" "}&gt; <span className="text-gray-700">{item.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="relative h-64 sm:h-96 w-full">
                  <Image
                    src={item.imageUrl || NO_IMAGE_URL}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h1 className="text-2xl font-medium text-gray-900 mb-2">{item.name}</h1>

                  <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                    {item.category && (
                      <>
                        <span>{t(item.subcategory ?? item.category)}</span>
                        <span className="mx-2">•</span>
                      </>
                    )}
                    <span>{item.placeName}</span>
                    <span className="mx-2">•</span>
                    <span>{t("added")}: {formatDate(item.createdAt)}</span>
                  </div>

                  <div className="text-3xl font-bold text-gray-900 mb-6">
                    {formatPrice(item.price, item.currency)}
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">{t("condition")}</h2>
                    <p className="text-gray-700">{t(item.condition)}</p>
                  </div>

                  {item.description && (
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-3">{t("description")}</h2>
                      <div className="prose prose-sm max-w-none text-gray-700">
                        {item.description.split("\n").map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {similarItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">{t("similar_items")}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {similarItems.map(similar => (
                        <Link href={`/listing/${similar.id}`} key={similar.id} className="group">
                          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
                            <div className="relative h-32 w-full">
                              <Image
                                src={similar.imageUrl || NO_IMAGE_URL}
                                alt={similar.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 33vw, 25vw"
                                className="object-cover"
                              />
                            </div>
                            <div className="p-3 flex-grow flex flex-col">
                              <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 mb-1 line-clamp-2">
                                {similar.name}
                              </h3>
                              <span className="mt-auto text-sm font-bold text-gray-900">
                                {formatPrice(similar.price, similar.currency)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">{t("seller_info")}</h2>
                  {item.username && (
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center text-gray-500">
                        <span className="text-xl font-medium">{item.username.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item.username}</p>
                        {item.sellerMemberSince && (
                          <p className="text-xs text-gray-500">
                            {t("member_since")} {formatDate(item.sellerMemberSince)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setShowContactInfo(!showContactInfo)}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {showContactInfo ? t("hide_contact") : t("show_contact")}
                  </button>

                  {showContactInfo && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-500">{t("phone")}</p>
                        <p className="text-sm text-gray-900">{item.phoneNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">{t("email")}</p>
                        <p className="text-sm text-gray-900">{item.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">{t("location")}</h2>
                  <p className="text-sm text-gray-900">{item.placeName}</p>
                  <p className="text-sm text-gray-600">
                    {item.postalCode}, {item.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
