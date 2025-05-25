"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

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
  category: "Mobilní telefony",
  condition: "Použité - jako nové",
  location: "Brno",
  createdAt: "2023-10-12",
  seller: {
    name: "Jan Novák",
    memberSince: "2021-05",
    otherListings: 5
  },
  contactPhone: "+420 123 456 789",
  contactEmail: "jan.novak@example.com",
  images: [
    "https://placehold.co/800x600/e6f7ef/10b981/png?text=iPhone+14+Pro+Max+1",
    "https://placehold.co/800x600/e6f7ef/10b981/png?text=iPhone+14+Pro+Max+2",
    "https://placehold.co/800x600/e6f7ef/10b981/png?text=iPhone+14+Pro+Max+3",
    "https://placehold.co/800x600/e6f7ef/10b981/png?text=iPhone+14+Pro+Max+4"
  ]
};

// Similar listings data
const similarListings = [
  {
    id: "2",
    title: "iPhone 13 Pro, 128GB",
    price: 15000,
    location: "Praha",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=iPhone+13+Pro",
    category: "Mobilní telefony",
  },
  {
    id: "3",
    title: "Samsung Galaxy S22 Ultra",
    price: 18500,
    location: "Ostrava",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Samsung+S22",
    category: "Mobilní telefony",
  },
  {
    id: "4",
    title: "Google Pixel 7 Pro",
    price: 16000,
    location: "Brno",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Pixel+7+Pro",
    category: "Mobilní telefony",
  }
];

export default function ListingDetailPage() {
  // In a real app, we would use useParams() to get the listing ID
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // In a real app, you would fetch the listing data based on the id
  // For now, we'll just use the mock data
  const listing = mockListing;

  // Format the date
  const formattedDate = new Date(listing.createdAt).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

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
            <Link href={`/listings?category=${encodeURIComponent(listing.category)}`} className="hover:text-primary">
              {listing.category}
            </Link>{" "}
            &gt;{" "}
            <span className="text-gray-700">{listing.title}</span>
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
                    <span>{listing.category}</span>
                    <span className="mx-2">•</span>
                    <span>{listing.location}</span>
                    <span className="mx-2">•</span>
                    <span>Přidáno: {formattedDate}</span>
                  </div>

                  <div className="text-3xl font-bold text-gray-900 mb-6">
                    {listing.price.toLocaleString()} Kč
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">
                      Stav
                    </h2>
                    <p className="text-gray-700">{listing.condition}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-3">
                      Popis
                    </h2>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      {listing.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Seller info and actions */}
            <div>
              {/* Price and action buttons (mobile) */}
              <div className="lg:hidden bg-white rounded-lg shadow-sm overflow-hidden mb-6 p-4">
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  {listing.price.toLocaleString()} Kč
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowContactInfo(!showContactInfo)}
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {showContactInfo ? "Skrýt kontakt" : "Zobrazit kontakt"}
                  </button>
                  <a
                    href={`tel:${listing.contactPhone}`}
                    className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Zavolat
                  </a>
                </div>
              </div>

              {/* Seller info */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Prodávající
                  </h2>
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-gray-600 font-medium text-lg">
                      {listing.seller.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {listing.seller.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Na Lepším Tržišti od {listing.seller.memberSince}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-6">
                    Počet inzerátů: {listing.seller.otherListings}
                  </div>

                  {/* Contact info */}
                  <div className="hidden lg:block">
                    <button
                      onClick={() => setShowContactInfo(!showContactInfo)}
                      className="w-full mb-3 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      {showContactInfo ? "Skrýt kontakt" : "Zobrazit kontakt"}
                    </button>
                    <a
                      href={`tel:${listing.contactPhone}`}
                      className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Zavolat
                    </a>
                  </div>

                  {showContactInfo && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-700">Telefon:</div>
                        <a href={`tel:${listing.contactPhone}`} className="text-primary hover:underline">
                          {listing.contactPhone}
                        </a>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">E-mail:</div>
                        <a href={`mailto:${listing.contactEmail}`} className="text-primary hover:underline">
                          {listing.contactEmail}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Location info without map */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-3">
                    Lokalita
                  </h2>
                  <div className="text-gray-700">{listing.location}</div>
                </div>
              </div>

              {/* Safety tips */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-3">
                    Bezpečnostní tipy
                  </h2>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>Nikdy neposílejte peníze předem.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>Setkávejte se na veřejných místech.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>Zkontrolujte zboží před zaplacením.</span>
                    </li>
                  </ul>
                  <Link 
                    href="/bezpecnost" 
                    className="mt-4 inline-block text-sm text-primary hover:underline"
                  >
                    Více o bezpečném nakupování
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Similar listings */}
          <div className="mt-12">
            <h2 className="text-xl font-medium text-gray-900 mb-6">
              Podobné inzeráty
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarListings.map((item) => (
                <Link href={`/listing/${item.id}`} key={item.id} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="text-xs text-primary font-medium mb-1">{item.category}</div>
                      <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">{item.price.toLocaleString()} Kč</span>
                        <span className="text-sm text-gray-500">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 