"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log({
      searchQuery,
      location,
      postalCode,
      priceRange: { min: minPrice, max: maxPrice },
    });
    
    // Call the onSearch prop if provided
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
              placeholder="Hledat cokoliv..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        </div>
        
        {isFiltersOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Lokalita
              </label>
              <input
                type="text"
                id="location"
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                placeholder="Město, kraj..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                PSČ
              </label>
              <input
                type="text"
                id="postal-code"
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                placeholder="Zadejte PSČ"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="min-price" className="block text-sm font-medium text-gray-700">
                Min. cena
              </label>
              <input
                type="number"
                id="min-price"
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                placeholder="Od"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="max-price" className="block text-sm font-medium text-gray-700">
                Max. cena
              </label>
              <input
                type="number"
                id="max-price"
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-primary focus:ring-0 bg-white"
                placeholder="Do"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 