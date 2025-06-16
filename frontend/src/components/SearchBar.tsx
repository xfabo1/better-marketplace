"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { conditions } from "@/data/conditions";

// Date filter options
const dateFilterOptions = [
  { label: "all_dates", value: "all" },
  { label: "today", value: "today" },
  { label: "this_week", value: "week" },
  { label: "this_month", value: "month" },
];

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build the query parameters
    const params = new URLSearchParams();
    
    if (searchQuery) params.append("q", searchQuery);
    if (location) params.append("location", location);
    if (condition !== "all") params.append("condition", condition);
    if (dateFilter !== "all") params.append("date", dateFilter);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    
    // Redirect to the listings page with the filters
    const queryString = params.toString();
    router.push(`/listings${queryString ? `?${queryString}` : ''}`);
    
    // Call the onSearch prop if provided (for backward compatibility)
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <form onSubmit={handleSearch}>
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
              placeholder={t('search_anything')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
          >
            {t('search')}
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-3 border border-gray-200 text-sm font-medium rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {t('filters')}
          </button>
        </div>
        
        {isFiltersOpen && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                {t('location')}
              </label>
              <input
                type="text"
                id="location"
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                placeholder={t('enter_city')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                {t('condition')}
              </label>
              <select
                id="condition"
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                {conditions.map((cond) => (
                  <option key={cond.id} value={cond.id}>
                    {t(cond.value)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700">
                {t('date_added')}
              </label>
              <select
                id="dateFilter"
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                                  {dateFilterOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {t(option.value)}
                    </option>
                  ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
                {t('price_range')}
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="number"
                  id="minPrice"
                  placeholder={t('from')}
                  className="block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  id="maxPrice"
                  placeholder={t('to')}
                  className="block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 