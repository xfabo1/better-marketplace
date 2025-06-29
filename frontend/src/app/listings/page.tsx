"use client";

import { searchItems } from "@/api/itemApi";
import { SearchFilterDto } from "@/types/types";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/data/categories";
import { conditions } from "@/data/conditions";
import { dateFilterOptions } from "@/data/dateFilterOptions";
import { sortOptions } from "@/data/sortOptions";
import { PreviewItemDto } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 30;

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("all_conditions");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("all_dates");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [listings, setListings] = useState<PreviewItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

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

  // Fetch items from backend using the new search API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Create search filter based on current state
        const searchFilter: SearchFilterDto = {
          searchText: searchQuery || undefined,
          minPrice: minPrice ? parseFloat(minPrice) : undefined,
          maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
          condition: selectedCondition !== "all_conditions" ? selectedCondition : undefined,
          sorting: sortBy,
          // For now, we don't have location filtering implemented
          locationId: undefined,
          maxMeterDistance: undefined,
          dateAdded: undefined, // We'll handle date filtering on frontend for now
        };

        const response = await searchItems({
          searchFilter,
          page: currentPage - 1,
          pageSize: ITEMS_PER_PAGE,
        }, t);

        setListings(response.items);
        setTotalItems(response.totalItems);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(t("failed_search_items"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [searchQuery, minPrice, maxPrice, selectedCondition, sortBy, currentPage]);

  // Backend handles sorting, so we don't need to sort again
  const sortedListings = listings;

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

  // Add this helper function to map category slugs to proper translation keys
  const getCategoryTranslationKey = (category: string): string => {
    // Check if it's a main category
    const mainCategory = categories.find(cat => cat.id === category);
    if (mainCategory) {
      return category;
    }

    // Check if it's a subcategory
    for (const cat of categories) {
      if (cat.subcategories) {
        const subcategory = cat.subcategories.find(subcat => subcat.id === category);
        if (subcategory) {
          return category;
        }
      }
    }

    // Check if it's a slug that needs to be converted to id
    const slugCategory = categories.find(cat => {
      const slugPart = cat.href.split("/").pop();
      return slugPart === category;
    });

    if (slugCategory) {
      return slugCategory.id;
    }

    // Check if it's a subcategory slug
    for (const cat of categories) {
      if (cat.subcategories) {
        const slugSubcategory = cat.subcategories.find(subcat => {
          const slugPart = subcat.href.split("/").pop();
          return slugPart === category;
        });

        if (slugSubcategory) {
          return slugSubcategory.id;
        }
      }
    }

    // If not found, return the original category
    return category;
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
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-0 transition duration-150 ease-in-out"
                placeholder={t("search_anything")}
                value={localSearchQuery}
                onChange={e => setLocalSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
            >
              {t("search")}
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-3 border border-gray-200 text-sm font-medium rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <svg
                className="h-5 w-5 mr-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              {t("filters")}
            </button>
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-3 border border-gray-200 text-sm font-medium rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              >
                <svg
                  className="h-5 w-5 mr-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                {t(sortBy)}
              </button>

              {isSortMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`block px-4 py-2 text-sm text-left w-full ${
                          sortBy === option.value
                            ? "bg-gray-100 text-primary"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        role="menuitem"
                        onClick={() => handleSortChange(option.value)}
                      >
                        {t(option.value)}
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
                  {t("location")}
                </label>
                <input
                  type="text"
                  id="location"
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                  placeholder={t("enter_city")}
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                  {t("condition")}
                </label>
                <select
                  id="condition"
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                  value={condition}
                  onChange={e => setCondition(e.target.value)}
                >
                  {conditions.map((cond) => (
                    <option key={cond.value} value={cond.value}>
                      {t(cond.value)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700">
                  {t("date_added")}
                </label>
                <select
                  id="dateFilter"
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                  value={localDateFilter}
                  onChange={e => setLocalDateFilter(e.target.value)}
                >
                  {dateFilterOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {t(option.value)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
                  {t("price_range")}
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    type="number"
                    id="minPrice"
                    placeholder={t("from")}
                    className="block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                    value={localMinPrice}
                    onChange={e => setLocalMinPrice(e.target.value)}
                    min="0"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    id="maxPrice"
                    placeholder={t("to")}
                    className="block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                    value={localMaxPrice}
                    onChange={e => setLocalMaxPrice(e.target.value)}
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
            <h1 className="text-2xl font-medium text-gray-900 mb-4">{t("browse_listings")}</h1>

            <div className="mb-6">
              <CustomSearchBar />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="mb-4 sm:mb-0">
                <span className="text-sm text-gray-500">
                  {totalItems} {totalItems === 1 ? t("listing_singular") : totalItems >= 2 && totalItems <= 4 ? t("listing_few") : t("listing_many")}
                </span>
              </div>

              <div className="md:hidden flex items-center">
                <span className="text-sm text-gray-700 mr-2">{t("sort_by")}:</span>
                <select
                  value={sortBy}
                  onChange={e => handleSortChange(e.target.value)}
                  className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:border-primary focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.value)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-gray-500">{t("loading")}</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            </div>
          ) : sortedListings.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {sortedListings.map((listing, index) => (
                  <div key={`${listing.title}-${index}`} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
                      <div className="relative h-32 w-full bg-gray-200 flex items-center justify-center">
                        {/* Placeholder for image since backend doesn't provide imageUrl yet */}
                        <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="p-2 flex-grow flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-xs text-primary font-medium truncate max-w-[70%]">
                            {t(getCategoryTranslationKey(listing.category || ""))}
                          </div>
                          <div className="text-xs text-gray-500 hidden sm:block">
                            {/* TODO: Show date when backend provides createdAt */}
                          </div>
                        </div>
                        <h3 className="text-xs font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 mb-1 line-clamp-2">
                          {listing.title}
                        </h3>
                        <div className="text-xs text-gray-600 mb-1 hidden sm:block">
                          {listing.condition ? t(listing.condition) : ""}
                        </div>
                        <div className="mt-auto">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold text-gray-900">
                              {listing.price.toLocaleString()} {listing.currency}
                            </span>
                            <span className="text-xs text-gray-500 truncate max-w-[40%]">
                              {listing.placeName}
                            </span>
                          </div>
                          <div className="flex justify-end items-center text-xs text-gray-400">
                            <span className="truncate">
                              {listing.postalCode} • {listing.country}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      &laquo; {t("previous")}
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
                      {t("next")} &raquo;
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
              <h3 className="mt-2 text-sm font-medium text-gray-900">{t("no_listings")}</h3>
              <p className="mt-1 text-sm text-gray-500">{t("no_listings_found")}</p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setLocationQuery("");
                    setSelectedCondition("all_conditions");
                    setSearchQuery("");
                    setSortBy("newest");
                    setDateFilter("all_dates");
                    setMinPrice("");
                    setMaxPrice("");
                    setCurrentPage(1);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {t("reset_filters")}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
