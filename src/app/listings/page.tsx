"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { allListings, conditions, sortOptions, dateFilterOptions } from "@/data/mockData";

// Items per page
const ITEMS_PER_PAGE = 9;

export default function ListingsPage() {
  const searchParams = useSearchParams();
  
  // Initialize state from URL parameters
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Apply URL parameters on component mount
  useEffect(() => {
    if (searchParams) {
      const q = searchParams.get("q");
      const location = searchParams.get("location");
      const condition = searchParams.get("condition");
      const date = searchParams.get("date");
      const min = searchParams.get("minPrice");
      const max = searchParams.get("maxPrice");

      if (q) setSearchQuery(q);
      if (location) setLocationQuery(location);
      if (condition) setSelectedCondition(condition);
      if (date) setDateFilter(date);
      if (min) setMinPrice(min);
      if (max) setMaxPrice(max);
    }
  }, [searchParams]);

  // Filter listings based on selected filters
  const filteredListings = allListings.filter((listing) => {
    // Filter by location (city name or postal code)
    if (locationQuery) {
      const locationMatches = listing.location.toLowerCase().includes(locationQuery.toLowerCase());
      const postalCodeMatches = listing.postalCode.includes(locationQuery);
      if (!locationMatches && !postalCodeMatches) {
        return false;
      }
    }
    
    // Filter by condition
    if (selectedCondition !== "all" && listing.conditionId !== selectedCondition) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by price range
    if (minPrice && listing.price < parseInt(minPrice)) {
      return false;
    }
    
    if (maxPrice && listing.price > parseInt(maxPrice)) {
      return false;
    }
    
    // Filter by date
    if (dateFilter !== "all") {
      const today = new Date();
      const listingDate = new Date(listing.createdAt);
      
      if (dateFilter === "today") {
        if (
          today.getDate() !== listingDate.getDate() ||
          today.getMonth() !== listingDate.getMonth() ||
          today.getFullYear() !== listingDate.getFullYear()
        ) {
          return false;
        }
      } else if (dateFilter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        if (listingDate < weekAgo) {
          return false;
        }
      } else if (dateFilter === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        if (listingDate < monthAgo) {
          return false;
        }
      }
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
    setLocationQuery(location);
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

  const handleDateFilterChange = (filter: string) => {
    setDateFilter(filter);
    setCurrentPage(1);
  };

  // Handle condition change
  const handleConditionChange = (condition: string) => {
    setSelectedCondition(condition);
    setCurrentPage(1);
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Custom SearchBar with added sort button
  const CustomSearchBar = () => {
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [location, setLocation] = useState(locationQuery);
    const [localDateFilter, setLocalDateFilter] = useState(dateFilter);
    const [localMinPrice, setLocalMinPrice] = useState(minPrice);
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
    const [condition, setCondition] = useState(selectedCondition);

    const handleLocalSearch = (e: React.FormEvent) => {
      e.preventDefault();
      handleSearch(localSearchQuery);
      
      if (location !== locationQuery) {
        handleLocationChange(location);
      }
      
      if (condition !== selectedCondition) {
        handleConditionChange(condition);
      }
      
      if (localDateFilter !== dateFilter) {
        handleDateFilterChange(localDateFilter);
      }
      
      if (localMinPrice !== minPrice) {
        setMinPrice(localMinPrice);
        setCurrentPage(1);
      }
      
      if (localMaxPrice !== maxPrice) {
        setMaxPrice(localMaxPrice);
        setCurrentPage(1);
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
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Lokalita
                </label>
                <input
                  type="text"
                  id="location"
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Zadejte město nebo PSČ..."
                />
              </div>
              
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                  Stav
                </label>
                <select
                  id="condition"
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  {conditions.map((cond) => (
                    <option key={cond.id} value={cond.id}>
                      {cond.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700">
                  Datum přidání
                </label>
                <select
                  id="dateFilter"
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                  value={localDateFilter}
                  onChange={(e) => setLocalDateFilter(e.target.value)}
                >
                  {dateFilterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
                  Cenové rozmezí
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    type="number"
                    id="minPrice"
                    placeholder="Od"
                    className="block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                    value={localMinPrice}
                    onChange={(e) => setLocalMinPrice(e.target.value)}
                    min="0"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    id="maxPrice"
                    placeholder="Do"
                    className="block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                    value={localMaxPrice}
                    onChange={(e) => setLocalMaxPrice(e.target.value)}
                    min="0"
                  />
                </div>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {paginatedListings.map((listing) => (
                  <Link href={`/listing/${listing.id}`} key={listing.id} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
                      <div className="relative h-32 w-full">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2 flex-grow flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-xs text-primary font-medium truncate max-w-[70%]">{listing.category}</div>
                          <div className="text-xs text-gray-500 hidden sm:block">{formatDate(listing.createdAt)}</div>
                        </div>
                        <h3 className="text-xs font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 mb-1 line-clamp-2">
                          {listing.title}
                        </h3>
                        <div className="text-xs text-gray-600 mb-1 hidden sm:block">
                          {listing.condition}
                        </div>
                        <div className="mt-auto flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-900">{listing.price.toLocaleString()} Kč</span>
                          <span className="text-xs text-gray-500 truncate max-w-[40%]">{listing.location}</span>
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
                    setLocationQuery("");
                    setSelectedCondition("all");
                    setSearchQuery("");
                    setSortBy("newest");
                    setDateFilter("all");
                    setMinPrice("");
                    setMaxPrice("");
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