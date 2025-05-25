"use client";

import Image from "next/image";
import Link from "next/link";

// Mock data for featured listings
const featuredListings = [
  {
    id: 1,
    title: "Toyota Camry 2019 - Výborný stav",
    price: 350000,
    location: "Praha",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Toyota+Camry",
    category: "Automobily",
  },
  {
    id: 2,
    title: "iPhone 14 Pro Max - Jako nový",
    price: 22000,
    location: "Brno",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=iPhone+14",
    category: "Mobilní telefony",
  },
  {
    id: 3,
    title: "Moderní pohovka - Pohodlná a stylová",
    price: 11500,
    location: "Ostrava",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Pohovka",
    category: "Nábytek",
  },
  {
    id: 4,
    title: "Horské kolo - Trek X-Caliber 8",
    price: 18500,
    location: "Plzeň",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Horské+kolo",
    category: "Sport",
  },
  {
    id: 5,
    title: "Značkové šaty - Velikost M",
    price: 2990,
    location: "Liberec",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Šaty",
    category: "Oblečení",
  },
  {
    id: 6,
    title: "PlayStation 5 se 2 ovladači",
    price: 12500,
    location: "Olomouc",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=PlayStation+5",
    category: "Elektronika",
  },
];

export default function FeaturedListings() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">Doporučené inzeráty</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredListings.map((listing) => (
          <Link href={`/listing/${listing.id}`} key={listing.id} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <div className="relative h-48 w-full">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-primary font-medium mb-1">{listing.category}</div>
                <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 mb-2 line-clamp-2">
                  {listing.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">{listing.price.toLocaleString()} Kč</span>
                  <span className="text-sm text-gray-500">{listing.location}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/listings"
          className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
        >
          Zobrazit všechny inzeráty
        </Link>
      </div>
    </div>
  );
} 