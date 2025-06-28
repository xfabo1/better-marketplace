"use client";

import { getItemById } from "@/api/itemApi";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatDate } from "@/utils/CommonUtils";
import { useEffect, useState } from "react";
import { ItemFullDetailsDto } from "@/types/types";

export default function ListingDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [item, setItem] = useState<ItemFullDetailsDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch item data from backend
  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);

        const itemData = await getItemById(id.toString(), t);
        setItem(itemData);
      } catch (error) {
        console.error("Error fetching item:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(t("failed_fetch_item"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-4 text-gray-600">{t("loading_listing")}</p>
          </div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error || !item) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">{t("listing_not_found")}</h1>
            <p className="text-gray-600 mb-6">{error || t("listing_error")}</p>
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">
              {t("home")}
            </Link>{" "}
            &gt;{" "}
            <Link href="/listings" className="hover:text-primary">
              {t("listings")}
            </Link>{" "}
            &gt;{" "}
            <Link
              href={`/listings?category=${encodeURIComponent(item.category)}`}
              className="hover:text-primary"
            >
              <span className="capitalize">{t(item.category)}</span>
            </Link>{" "}
            &gt; <span className="text-gray-700">{item.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Images and details */}
            <div className="lg:col-span-2">
              {/* Image gallery */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="relative h-64 sm:h-96 w-full">
                  <Image
                    src={item.images[activeImageIndex]}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    className="object-contain"
                  />
                </div>

                {/* Thumbnails */}
                {item.images.length > 1 && (
                  <div className="flex p-4 gap-2 overflow-x-auto">
                    {item.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 ${
                          activeImageIndex === index
                            ? "border-primary"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${item.title} - image ${index + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Listing details */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h1 className="text-2xl font-medium text-gray-900 mb-2">{item.title}</h1>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{t(item.category)}</span>
                    <span className="mx-2">•</span>
                    <span>{item.placeName}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {t("added")}: {formatDate(item.updatedAt)}
                    </span>
                  </div>

                  <div className="text-3xl font-bold text-gray-900 mb-6">
                    {item.price.toLocaleString()} {item.currency}
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">{t("condition")}</h2>
                    <p className="text-gray-700">{t(item.condition)}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-3">{t("description")}</h2>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      {item.description.split("\n").map((paragraph: string, index: number) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Seller info & actions */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">{t("seller_info")}</h2>
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center text-gray-500">
                        <span className="text-xl font-medium">{item.username.charAt(0)}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item.username}</p>
                        <p className="text-xs text-gray-500">
                          {t("member_since")} {item.memberSince}
                        </p>
                      </div>
                    </div>
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
                          <p className="text-sm text-gray-900">{item.email}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">{t("email")}</p>
                          <p className="text-sm text-gray-900">{item.email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">{t("location")}</h2>
                    <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">{t("map_placeholder")}</p>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      {item.placeName}, {item.postalCode}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">{t("actions")}</h2>
                    <div className="space-y-3">
                      <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        {t("save_to_favorites")}
                      </button>
                      <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        {t("report_listing")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
