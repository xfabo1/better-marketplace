"use client";

import { searchItems } from "@/api/itemApi";
import { SearchFilterDto, PreviewItemDto } from "@/types/types";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import ItemGrid from "@/components/ItemGrid";
import Pagination from "@/components/Pagination";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 30;

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
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
      const category = searchParams.get("category");
      const subcategory = searchParams.get("subcategory");

      if (q) setSearchQuery(q);
      if (location) setLocationQuery(location);
      if (condition) setSelectedCondition(condition);
      if (date) setDateFilter(date);
      if (min) setMinPrice(min);
      if (max) setMaxPrice(max);
      if (category) setSelectedCategory(category);
      if (subcategory) setSelectedSubcategory(subcategory);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const searchFilter: SearchFilterDto = {
          searchText: searchQuery || undefined,
          minPrice: minPrice ? parseFloat(minPrice) : undefined,
          maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
          condition: selectedCondition !== "all" ? selectedCondition : undefined,
          sorting: sortBy,
          locationId: undefined,
          maxMeterDistance: undefined,
          dateAdded: undefined,
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
  }, [searchQuery, minPrice, maxPrice, selectedCondition, sortBy, currentPage, selectedCategory, selectedSubcategory]);

  const sortedListings = listings;

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.append("q", searchQuery);
    if (locationQuery) params.append("location", locationQuery);
    if (selectedCondition !== "all") params.append("condition", selectedCondition);
    if (dateFilter !== "all") params.append("date", dateFilter);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedSubcategory) params.append("subcategory", selectedSubcategory);
    
    const queryString = params.toString();
    window.location.href = `/listings${queryString ? `?${queryString}` : ''}`;
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePriceChange = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
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
          {/* Breadcrumb */}
          {(selectedCategory || selectedSubcategory) && (
            <nav className="mb-4">
              <ol className="flex text-sm text-gray-500">
                <li className="flex items-center">
                  <a href="/" className="hover:text-primary">{t('home')}</a>
                  <svg className="h-4 w-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                {selectedCategory && (
                  <li className="flex items-center">
                    <span className="text-gray-900 font-medium">{t(selectedCategory)}</span>
                    {selectedSubcategory && (
                      <>
                        <svg className="h-4 w-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900 font-medium">{t(selectedSubcategory)}</span>
                      </>
                    )}
                  </li>
                )}
              </ol>
            </nav>
          )}

          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              {selectedCategory ? t(selectedCategory) : t("all_listings")}
              {selectedSubcategory && ` - ${t(selectedSubcategory)}`}
            </h1>
            <p className="text-gray-600">
              {selectedCategory ? t("browse_category_items") : t("browse_all_items")}
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-6">
            <SearchBar 
              searchQuery={searchQuery}
              location={locationQuery}
              condition={selectedCondition}
              dateFilter={dateFilter}
              minPrice={minPrice}
              maxPrice={maxPrice}
              sortBy={sortBy}
              onSearchQueryChange={setSearchQuery}
              onLocationChange={setLocationQuery}
              onConditionChange={setSelectedCondition}
              onDateFilterChange={setDateFilter}
              onSortChange={handleSortChange}
              onPriceChange={handlePriceChange}
              onSearch={handleSearch}
            />
          </div>

          {/* Results count */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              {isLoading ? (
                t("loading")
              ) : (
                `${totalItems} ${t("results_found")}`
              )}
            </div>
          </div>

          {/* Error state */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Listings grid */}
          <ItemGrid 
            items={sortedListings}
            isLoading={isLoading}
            layout="grid"
            showCategory={false}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}
