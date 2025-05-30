"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data for a single listing
const mockListing = {
  id: "1",
  title: "iPhone 14 Pro Max - Jako nový",
  price: 22000,
  description: `
    Prodám iPhone 14 Pro Max, 256GB, barva Deep Purple.
    
    Telefon je v perfektním stavu, bez škrábanců či jiných vad. Byl vždy v ochranném pouzdře a s ochranným sklem.
    
    Telefon byl zakoupen v prosinci 2022, je tedy stále v záruce.
    
    Součástí je originální balení, nabíječka, kabel a nepoužitá sluchátka.
    
    Důvod prodeje je přechod na jiný model.
    
    Možnost osobního předání v Brně nebo zaslání přes zásilkovnu.
  `,
  category: "mobile_phones",
  condition: "Použité - jako nové",
  conditionId: "used_like_new",
  location: "Brno",
  postalCode: "602 00",
  createdAt: "2023-10-12",
  seller: {
    name: "Jan Novák",
    memberSince: "2021-05",
    otherListings: 5,
  },
  contactPhone: "+420 123 456 789",
  contactEmail: "jan.novak@example.com",
  images: [
    "https://placehold.co/800x600/e6f7ef/10b981/png?text=iPhone+14+Pro+Max+1",
    "https://placehold.co/800x600/e6f7ef/10b981/png?text=iPhone+14+Pro+Max+2",
    "https://placehold.co/800x600/e6f7ef/10b981/png?text=iPhone+14+Pro+Max+3",
    "https://placehold.co/800x600/e6f7ef/10b981/png?text=iPhone+14+Pro+Max+4",
  ],
};

// Similar listings data
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

  // In a real app, you would fetch the listing data based on the id
  // For now, we'll just use the mock data
  const listing = mockListing;

  // Format the date
  const formattedDate = new Date(listing.createdAt).toLocaleDateString(
    "cs-CZ",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  ).replace(/\s/g, '');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">
              Domů
            </Link>{" "}
            &gt;{" "}
            <Link href="/listings" className="hover:text-primary">
              Inzeráty
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
                    {listing.images.map((image, index) => (
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
                    <span>{t('added')}: {formattedDate}</span>
                  </div>

                  <div className="text-3xl font-bold text-gray-900 mb-6">
                    {listing.price.toLocaleString()} Kč
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
                        .map((paragraph, index) => (
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
                  <div className="mb-4">
                    <div className="font-medium">{listing.seller.name}</div>
                    <div className="text-sm text-gray-500">
                      {t('member_since')} {listing.seller.memberSince}
                    </div>
                    <div className="text-sm text-gray-500">
                      {listing.seller.otherListings} {t('active')} {t('listing_many').toLowerCase()}
                    </div>
                  </div>
                  
                  {!showContactInfo ? (
                    <button
                      onClick={() => setShowContactInfo(true)}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      {t('contact_seller')}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-gray-500">
                          {t('phone')}
                        </div>
                        <a href={`tel:${listing.contactPhone}`} className="text-primary hover:underline">
                          {listing.contactPhone}
                        </a>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">
                          {t('email')}
                        </div>
                        <a href={`mailto:${listing.contactEmail}`} className="text-primary hover:underline">
                          {listing.contactEmail}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {t('location_info')}
                  </h2>
                  <div>
                    <div className="font-medium">{listing.location}</div>
                    <div className="text-sm text-gray-500">{listing.postalCode}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 space-y-4">
                  <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {t('share')}
                  </button>
                  
                  <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {t('favorite')}
                  </button>
                  
                  <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                    {t('report_item')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
