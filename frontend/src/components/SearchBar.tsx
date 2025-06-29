"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { conditions } from "@/data/conditions";
import { sortOptions } from "@/data/sortOptions";

const dateFilterOptions = [
  { label: "all_dates", value: "all" },
  { label: "today", value: "today" },
  { label: "this_week", value: "week" },
  { label: "this_month", value: "month" },
];

export interface SearchFilters {
  searchQuery: string;
  location: string;
  condition: string;
  dateFilter: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
}

interface SearchBarProps {
  searchQuery: string;
  location: string;
  condition: string;
  dateFilter: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  onSearchQueryChange: (searchQuery: string) => void;
  onLocationChange: (location: string) => void;
  onConditionChange: (condition: string) => void;
  onDateFilterChange: (dateFilter: string) => void;
  onSortChange: (sortBy: string) => void;
  onPriceChange: (minPrice: string, maxPrice: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  searchQuery,
  location,
  condition,
  dateFilter,
  minPrice,
  maxPrice,
  sortBy,
  onSearchQueryChange,
  onLocationChange,
  onConditionChange,
  onDateFilterChange,
  onSortChange,
  onPriceChange,
  onSearch,
}: SearchBarProps) {
  const { t } = useLanguage();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleLocationChangeInternal = (newLocation: string) => {
    onLocationChange(newLocation);
  };

  const handleConditionChangeInternal = (newCondition: string) => {
    onConditionChange(newCondition);
  };

  const handleDateFilterChangeInternal = (newDateFilter: string) => {
    onDateFilterChange(newDateFilter);
  };

  const handleSortChangeInternal = (newSort: string) => {
    setIsSortMenuOpen(false);
    onSortChange(newSort);
  };

  const handlePriceChangeInternal = (field: 'min' | 'max', value: string) => {
    onPriceChange(field === 'min' ? value : minPrice, field === 'max' ? value : maxPrice);
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
              onChange={(e) => onSearchQueryChange(e.target.value)}
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
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-3 border border-gray-200 text-sm font-medium rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              >
                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                {t('sort_by')}
              </button>
              
              {isSortMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSortChangeInternal(option.value)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          sortBy === option.value
                            ? "bg-gray-100 text-primary font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
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
                {t('location')}
              </label>
              <input
                type="text"
                id="location"
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                placeholder={t('enter_city')}
                value={location}
                onChange={(e) => handleLocationChangeInternal(e.target.value)}
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
                onChange={(e) => handleConditionChangeInternal(e.target.value)}
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
                {t('date_added')}
              </label>
              <select
                id="dateFilter"
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                value={dateFilter}
                onChange={(e) => handleDateFilterChangeInternal(e.target.value)}
              >
                {dateFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(option.label)}
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
                  onChange={(e) => handlePriceChangeInternal('min', e.target.value)}
                  min="0"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  id="maxPrice"
                  placeholder={t('to')}
                  className="block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                  value={maxPrice}
                  onChange={(e) => handlePriceChangeInternal('max', e.target.value)}
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