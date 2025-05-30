"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data for user's listings
const mockListings = [
  {
    id: "1",
    title: "iPhone 12 Pro Max, 256GB, Pacific Blue",
    price: 18500,
    category: "electronics",
    location: "Praha",
    postalCode: "110 00",
    imageUrl: "https://placehold.co/600x400/3b82f6/ffffff?text=iPhone+12",
    createdAt: "2023-10-15",
    status: "active",
    condition: "Použité - jako nové",
    conditionId: "used_like_new"
  },
  {
    id: "2",
    title: "Kožená sedačka IKEA, 3 místná",
    price: 12000,
    category: "furniture",
    location: "Brno",
    postalCode: "602 00",
    imageUrl: "https://placehold.co/600x400/22c55e/ffffff?text=Sedačka",
    createdAt: "2023-09-28",
    status: "active",
    condition: "Použité - dobrý stav",
    conditionId: "used_good"
  },
  {
    id: "3",
    title: "Horské kolo Trek Marlin 7",
    price: 15000,
    category: "sport_hobby",
    location: "Ostrava",
    postalCode: "702 00",
    imageUrl: "https://placehold.co/600x400/f59e0b/ffffff?text=Kolo",
    createdAt: "2023-08-10",
    status: "sold",
    condition: "Použité - velmi dobrý stav",
    conditionId: "used_very_good"
  }
];

export default function MyListingsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');
  
  const filteredListings = mockListings.filter(listing => 
    activeTab === 'active' ? listing.status === 'active' : listing.status === 'sold'
  );
  
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\s/g, '');
  };

  // Add this helper function to map category slugs to proper translation keys
  const getCategoryTranslationKey = (category: string): string => {
    // Map of possible category slugs to their translation keys
    const categoryMap: Record<string, string> = {
      "zahrada-dilna": "garden_workshop",
      "doprava": "transport",
      "elektronika": "electronics", 
      "domacnost": "household",
      "moda": "fashion",
      "sport-hobby": "sport_hobby",
      "deti": "children",
      "zvirata": "animals",
      "kultura-vzdelavani": "culture_education",
    };
    
    return categoryMap[category] || category;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium text-gray-900">
              {t('my_listings')}
            </h1>
            <Link 
              href="/sell" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              + {t('new_listing')}
            </Link>
          </div>
          
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('active')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'active'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('active')}
              </button>
              <button
                onClick={() => setActiveTab('sold')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'sold'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('sold')}
              </button>
            </nav>
          </div>
          
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={listing.imageUrl}
                      alt={listing.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    {listing.status === 'sold' && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-medium text-lg">{t('sold')}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                        {listing.title}
                      </h3>
                      <span className="text-lg font-medium text-primary">
                        {listing.price.toLocaleString()} Kč
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>{t(getCategoryTranslationKey(listing.category))}</span>
                      <span className="mx-2">•</span>
                      <span>{listing.location}, {listing.postalCode}</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      {t(listing.conditionId)}
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {t('created')}: {formatDate(listing.createdAt)}
                      </span>
                      <div className="space-x-2">
                        <Link
                          href={`/listing/${listing.id}/edit`}
                          className="text-sm font-medium text-primary hover:text-primary-hover px-2 py-1"
                        >
                          {t('edit')}
                        </Link>
                        <button
                          className="text-sm font-medium text-red-600 hover:text-red-800 px-2 py-1"
                          onClick={() => console.log(`Delete listing ${listing.id}`)}
                        >
                          {t('delete')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">{t('no_listings')}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {t('no_listings_of_type').replace('{type}', activeTab === 'active' ? t('active').toLowerCase() : t('sold').toLowerCase())}
              </p>
              {activeTab === 'active' && (
                <div className="mt-6">
                  <Link
                    href="/sell"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {t('create_new_listing')}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 