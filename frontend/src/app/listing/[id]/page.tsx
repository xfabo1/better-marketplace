"use client";

import { getItemById } from "@/api/itemApi";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatDate } from "@/utils/CommonUtils";
import { useEffect, useState } from "react";

// Interface for Item from backend
interface Item {
  id: number;
  name: string;
  price: number;
  currency: string;
  description: string;
  imageUrl: string;
  locationId: number;
  creatorId: number;
}

// Mock data for similar listings (to be replaced with API call later)
const similarListings = [
  {
    id: "2",
    title: "iPhone 13 Pro, 128GB",
    price: 15000,
    location: "Praha",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=iPhone+13+Pro",
    category: "mobile_phones",
  },
  {
    id: "3",
    title: "Samsung Galaxy S22 Ultra",
    price: 18500,
    location: "Ostrava",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Samsung+S22",
    category: "mobile_phones",
  },
  {
    id: "4",
    title: "Google Pixel 7 Pro",
    price: 16000,
    location: "Brno",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Pixel+7+Pro",
    category: "mobile_phones",
  },
];

export default function ListingDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Enhanced listing with frontend-specific fields
  const [listing, setListing] = useState<any>(null);

  // Fetch item data from backend
  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const itemData = await getItemById(id.toString());
        setItem(itemData);
        
        // Transform backend item to match frontend listing structure
        setListing({
          ...itemData,
          title: itemData.name,
          category: "other", // Default category
          condition: "Used", // Default condition
          conditionId: "used", // Default condition ID
          location: "Unknown", // This should come from locationId
          postalCode: "000 00",
          createdAt: new Date().toISOString(), // Default to current date
          seller: {
            name: "Unknown Seller",
            memberSince: "2023-01",
            otherListings: 0,
          },
          contactPhone: "+420 000 000 000",
          contactEmail: "example@example.com",
          images: [
            itemData.imageUrl || "https://placehold.co/800x600/e6f7ef/10b981/png?text=No+Image",
            "https://placehold.co/800x600/e6f7ef/10b981/png?text=Placeholder+2",
            "https://placehold.co/800x600/e6f7ef/10b981/png?text=Placeholder+3",
          ],
        });
      } catch (error) {
        setError("Failed to load listing. Please try again later.");
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
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-4 text-gray-600">{t('loading_listing')}</p>
          </div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error || !listing) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">{t('listing_not_found')}</h1>
            <p className="text-gray-600 mb-6">{error || t('listing_error')}</p>
            <Link
              href="/listings"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {t('back_to_listings')}
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
              {t('home')}
            </Link>{" "}
            &gt;{" "}
            <Link href="/listings" className="hover:text-primary">
              {t('listings')}
            </Link>{" "}
            &gt;{" "}
            <Link
              href={`/listings?category=${encodeURIComponent(
                listing.category
              )}`}
              className="hover:text-primary"
            >
              <span className="capitalize">{t(listing.category)}</span>
            </Link>{" "}
            &gt; <span className="text-gray-700">{listing.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Images and details */}
            <div className="lg:col-span-2">
              {/* Image gallery */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="relative h-64 sm:h-96 w-full">
                  <Image
                    src={listing.images[activeImageIndex]}
                    alt={listing.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    className="object-contain"
                  />
                </div>

                {/* Thumbnails */}
                {listing.images.length > 1 && (
                  <div className="flex p-4 gap-2 overflow-x-auto">
                    {listing.images.map((image: string, index: number) => (
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
                          alt={`${listing.title} - obrázek ${index + 1}`}
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
                  <h1 className="text-2xl font-medium text-gray-900 mb-2">
                    {listing.title}
                  </h1>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{t(listing.category)}</span>
                    <span className="mx-2">•</span>
                    <span>{listing.location}</span>
                    <span className="mx-2">•</span>
                    <span>{t('added')}: {formatDate(listing.createdAt)}</span>
                  </div>

                  <div className="text-3xl font-bold text-gray-900 mb-6">
                    {listing.price.toLocaleString()} {listing.currency}
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">
                      {t('condition')}
                    </h2>
                    <p className="text-gray-700">{t(listing.conditionId)}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-3">
                      {t('description')}
                    </h2>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      {listing.description
                        .split("\n")
                        .map((paragraph: string, index: number) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar listings */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {t('similar_items')}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {similarListings.map((item) => (
                      <Link href={`/listing/${item.id}`} key={item.id} className="group">
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
                          <div className="relative h-32 w-full">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 33vw, 25vw"
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3 flex-grow flex flex-col">
                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 mb-1 line-clamp-2">
                              {item.title}
                            </h3>
                            <div className="mt-auto flex justify-between items-center">
                              <span className="text-sm font-bold text-gray-900">
                                {item.price.toLocaleString()} Kč
                              </span>
                              <span className="text-xs text-gray-500">
                                {item.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Seller info & actions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {t('seller_info')}
                  </h2>
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center text-gray-500">
                      <span className="text-xl font-medium">{listing.seller.name.charAt(0)}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{listing.seller.name}</p>
                      <p className="text-xs text-gray-500">
                        {t('member_since')} {listing.seller.memberSince}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {listing.seller.otherListings} {t('other_listings')}
                  </p>
                  <button
                    onClick={() => setShowContactInfo(!showContactInfo)}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {showContactInfo ? t('hide_contact') : t('show_contact')}
                  </button>
                  
                  {showContactInfo && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-500">{t('phone')}</p>
                        <p className="text-sm text-gray-900">{listing.contactPhone}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">{t('email')}</p>
                        <p className="text-sm text-gray-900">{listing.contactEmail}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {t('location')}
                  </h2>
                  <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">{t('map_placeholder')}</p>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    {listing.location}, {listing.postalCode}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {t('actions')}
                  </h2>
                  <div className="space-y-3">
                    <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      {t('save_to_favorites')}
                    </button>
                    <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      {t('report_listing')}
                    </button>
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
