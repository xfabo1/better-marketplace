"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";

// Mock data for listings
const allListings = [
  {
    id: 1,
    title: "Toyota Camry 2019 - Výborný stav",
    price: 350000,
    location: "Praha",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Toyota+Camry",
    category: "Automobily",
    createdAt: "2023-10-15",
  },
  {
    id: 2,
    title: "iPhone 14 Pro Max - Jako nový",
    price: 22000,
    location: "Brno",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=iPhone+14",
    category: "Elektronika",
    createdAt: "2023-10-12",
  },
  {
    id: 3,
    title: "Moderní pohovka - Pohodlná a stylová",
    price: 11500,
    location: "Ostrava",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Pohovka",
    category: "Nábytek",
    createdAt: "2023-10-10",
  },
  {
    id: 4,
    title: "Horské kolo - Trek X-Caliber 8",
    price: 18500,
    location: "Plzeň",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Horské+kolo",
    category: "Sport",
    createdAt: "2023-10-08",
  },
  {
    id: 5,
    title: "Značkové šaty - Velikost M",
    price: 2990,
    location: "Liberec",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Šaty",
    category: "Oblečení",
    createdAt: "2023-10-05",
  },
  {
    id: 6,
    title: "PlayStation 5 se 2 ovladači",
    price: 12500,
    location: "Olomouc",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=PlayStation+5",
    category: "Elektronika",
    createdAt: "2023-10-03",
  },
  {
    id: 7,
    title: "Dětská postýlka s matrací",
    price: 3500,
    location: "Praha",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dětská+postýlka",
    category: "Dětské zboží",
    createdAt: "2023-10-01",
  },
  {
    id: 8,
    title: "MacBook Pro 2022 - M2 chip",
    price: 38000,
    location: "Praha",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=MacBook+Pro",
    category: "Elektronika",
    createdAt: "2023-09-28",
  },
  {
    id: 9,
    title: "Zahradní nábytek - Set 6 kusů",
    price: 8500,
    location: "Brno",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Zahradní+nábytek",
    category: "Nábytek",
    createdAt: "2023-09-25",
  },
  {
    id: 10,
    title: "Elektrická koloběžka Xiaomi",
    price: 9900,
    location: "Praha",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Koloběžka",
    category: "Sport",
    createdAt: "2023-09-22",
  },
  {
    id: 11,
    title: "Zimní bunda - Velikost L",
    price: 1800,
    location: "Ostrava",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Zimní+bunda",
    category: "Oblečení",
    createdAt: "2023-09-20",
  },
  {
    id: 12,
    title: "Kuchyňský robot Kenwood",
    price: 4500,
    location: "Plzeň",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Kuchyňský+robot",
    category: "Elektronika",
    createdAt: "2023-09-18",
  },
  {
    id: 13,
    title: "Dámské kolo Specialized",
    price: 12000,
    location: "Praha",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dámské+kolo",
    category: "Sport",
    createdAt: "2023-09-16",
  },
  {
    id: 14,
    title: "Herní počítač - RTX 3080",
    price: 45000,
    location: "Brno",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Herní+PC",
    category: "Elektronika",
    createdAt: "2023-09-14",
  },
  {
    id: 15,
    title: "Dětské oblečení - Set 0-6 měsíců",
    price: 1200,
    location: "Ostrava",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dětské+oblečení",
    category: "Dětské zboží",
    createdAt: "2023-09-12",
  },
  {
    id: 16,
    title: "IKEA pohovka KIVIK",
    price: 8000,
    location: "Praha",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=IKEA+pohovka",
    category: "Nábytek",
    createdAt: "2023-09-10",
  },
  {
    id: 17,
    title: "Dámské lodičky - Velikost 39",
    price: 1500,
    location: "Brno",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dámské+lodičky",
    category: "Oblečení",
    createdAt: "2023-09-08",
  },
  {
    id: 18,
    title: "Elektrická vrtačka Bosch",
    price: 2800,
    location: "Plzeň",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Vrtačka+Bosch",
    category: "Elektronika",
    createdAt: "2023-09-06",
  },
];

// Locations for filtering
const locations = [
  "Všechny lokality",
  "Praha",
  "Brno",
  "Ostrava",
  "Plzeň",
  "Liberec",
  "Olomouc",
];

// Sort options
const sortOptions = [
  { label: "Nejnovější", value: "newest" },
  { label: "Nejstarší", value: "oldest" },
  { label: "Nejlevnější", value: "price_asc" },
  { label: "Nejdražší", value: "price_desc" },
];

// Items per page
const ITEMS_PER_PAGE = 9;

export default function ListingsPage() {
  const [selectedLocation, setSelectedLocation] = useState("Všechny lokality");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  // Filter listings based on selected filters
  const filteredListings = allListings.filter((listing) => {
    // Filter by location
    if (selectedLocation !== "Všechny lokality" && listing.location !== selectedLocation) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort listings based on selected sort option
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "price_asc":
        return a.price - b.price;
      case "price_desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedListings.length / ITEMS_PER_PAGE);
  const paginatedListings = sortedListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
    setIsSortMenuOpen(false);
  };

  // Custom SearchBar with added sort button
  const CustomSearchBar = () => {
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [location, setLocation] = useState(selectedLocation);

    const handleLocalSearch = (e: React.FormEvent) => {
      e.preventDefault();
      handleSearch(localSearchQuery);
      
      if (location !== selectedLocation) {
        handleLocationChange(location);
      }
    };

    return (
      <div className="w-full max-w-4xl mx-auto py-6">
        <form onSubmit={handleLocalSearch}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-0 transition duration-150 ease-in-out"
                placeholder="Hledat cokoliv..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
            >
              Hledat
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-3 border border-gray-200 text-sm font-medium rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtry
            </button>
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-3 border border-gray-200 text-sm font-medium rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              >
                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                Řazení
              </button>
              
              {isSortMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSortChange(option.value)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          sortBy === option.value
                            ? "bg-gray-100 text-primary font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {isFiltersOpen && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Lokalita
                </label>
                <select
                  id="location"
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <div className="flex-grow flex flex-col md:flex-row">
        <aside className="hidden md:block md:w-64 shrink-0">
          <div className="sticky top-16 h-[calc(100vh-4rem)]">
            <Sidebar />
          </div>
        </aside>
        
        <main className="flex-grow p-4 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">Procházet inzeráty</h1>
            
            <div className="mb-6">
              <CustomSearchBar />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="mb-4 sm:mb-0">
                <span className="text-sm text-gray-500">
                  {filteredListings.length} {filteredListings.length === 1 ? "inzerát" : 
                    filteredListings.length >= 2 && filteredListings.length <= 4 ? "inzeráty" : "inzerátů"}
                </span>
              </div>
              
              <div className="md:hidden flex items-center">
                <span className="text-sm text-gray-700 mr-2">Řazení:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:border-primary focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {paginatedListings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedListings.map((listing) => (
                  <Link href={`/listing/${listing.id}`} key={listing.id} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
                      <div className="relative h-48 w-full">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <div className="text-xs text-primary font-medium mb-1">{listing.category}</div>
                        <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 mb-2 line-clamp-2">
                          {listing.title}
                        </h3>
                        <div className="mt-auto flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">{listing.price.toLocaleString()} Kč</span>
                          <span className="text-sm text-gray-500">{listing.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <nav className="flex items-center">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md mr-2 text-sm font-medium border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      &laquo; Předchozí
                    </button>
                    
                    <div className="hidden sm:flex">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        // Show first page, last page, current page, and pages around current
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`mx-1 px-3 py-1 rounded-md text-sm font-medium ${
                                currentPage === pageNum
                                  ? "bg-primary text-white"
                                  : "border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          (pageNum === 2 && currentPage > 3) ||
                          (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                        ) {
                          return (
                            <span key={pageNum} className="mx-1 px-2 text-gray-500">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                    
                    <div className="sm:hidden">
                      <span className="text-sm text-gray-500">
                        {currentPage} / {totalPages}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-md ml-2 text-sm font-medium border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Další &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </>
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
              <h3 className="mt-2 text-sm font-medium text-gray-900">Žádné inzeráty</h3>
              <p className="mt-1 text-sm text-gray-500">
                Pro vaše vyhledávání nebyly nalezeny žádné inzeráty.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSelectedLocation("Všechny lokality");
                    setSearchQuery("");
                    setSortBy("newest");
                    setCurrentPage(1);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Resetovat filtry
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 