"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import { Listing, sortOptions, generateMockListings } from "@/data/mockData";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const itemsPerPage = 15; 

  useEffect(() => {
    // Extract category and subcategory from URL params
    const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];
    const mainCategory = slugArray[0] || "";
    const subCategory = slugArray.length > 1 ? slugArray[1] : null;

    // Set the category and subcategory names for display
    setCategoryName(formatCategoryName(mainCategory));
    if (subCategory) {
      setSubcategoryName(formatCategoryName(subCategory));
    }

    // Fetch listings based on category/subcategory
    fetchListings(mainCategory, subCategory || null);
    
    // Reset sorting to default when changing category
    setSortBy("newest");
    setIsSortMenuOpen(false);
  }, [params]);

  const formatCategoryName = (slug: string) => {
    // Convert slug to display name (e.g., "doprava" -> "Doprava")
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  };

  const fetchListings = async (category: string, subcategory: string | null) => {
    setLoading(true);
    try {
      // Use the mock data generator from our mockData file
      const mockListings = generateMockListings(category, subcategory);
      setListings(mockListings);
      setCurrentPage(1); // Reset to first page when changing category
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    // Redirect to the listings page with the search query and category filter
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (categoryName) params.append("category", categoryName);
    if (subcategoryName) params.append("subcategory", subcategoryName);
    
    router.push(`/listings${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
    setIsSortMenuOpen(false);
  };

  // Sort listings based on selected sort option
  const sortedListings = [...listings].sort((a, b) => {
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

  // Pagination logic
  const totalPages = Math.ceil(sortedListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedListings = sortedListings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-grow flex flex-col md:flex-row">
          <aside className="hidden md:block md:w-64 shrink-0">
            <div className="sticky top-16 h-[calc(100vh-4rem)]">
              <Sidebar />
            </div>
          </aside>

          <main className="flex-grow p-4 md:p-8">
            {/* Breadcrumb */}
            <nav className="mb-4">
              <ol className="flex text-sm text-gray-500">
                <li className="flex items-center">
                  <a href="/" className="hover:text-primary">Domů</a>
                  <svg className="h-4 w-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-900 font-medium">{categoryName}</span>
                  {subcategoryName && (
                    <>
                      <svg className="h-4 w-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-gray-900 font-medium">{subcategoryName}</span>
                    </>
                  )}
                </li>
              </ol>
            </nav>

            {/* Category title */}
            <h1 className="text-2xl font-medium text-gray-900 mb-4">
              {subcategoryName ? subcategoryName : categoryName}
            </h1>

            {/* Search bar with sort button */}
            <div className="mb-6">
              <div className="w-full max-w-4xl mx-auto py-6">
                <form onSubmit={(e) => { e.preventDefault(); handleSearch((e.target as any).searchQuery?.value || ""); }}>
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="searchQuery"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-0 transition duration-150 ease-in-out"
                        placeholder="Hledat cokoliv..."
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
                </form>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="mb-4 sm:mb-0">
                <span className="text-sm text-gray-500">
                  {sortedListings.length} {sortedListings.length === 1 ? "inzerát" : 
                    sortedListings.length >= 2 && sortedListings.length <= 4 ? "inzeráty" : "inzerátů"}
                </span>
              </div>
              
              {/* Mobile sorting */}
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

            {/* Listings */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : sortedListings.length > 0 ? (
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
                  <div className="flex justify-center mt-8">
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
                  V této kategorii zatím nejsou žádné inzeráty.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
} 