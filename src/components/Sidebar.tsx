"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/mockData";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  return (
    <div className="bg-white border-r border-gray-100 w-full md:w-64 flex-shrink-0">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Kategórie</h2>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        
        <div className={`space-y-1 ${isExpanded ? 'block' : 'hidden md:block'}`}>
          {categories && categories.map((category) => (
            category && (
              <div key={category.id || `category-${Math.random()}`} className="mb-2">
                <button
                  onClick={(e) => toggleCategory(category.id || '', e)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-primary hover:bg-gray-50"
                >
                  <span>{category.name}</span>
                  <span className="text-gray-400">
                    {expandedCategory === category.id ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </span>
                </button>
                
                {/* Subcategories */}
                {expandedCategory === category.id && category.subcategories && (
                  <div className="ml-4 mt-1 pl-2 border-l border-gray-200">
                    {category.subcategories.map((subcategory) => (
                      subcategory && (
                        <Link
                          key={subcategory.id || `subcategory-${Math.random()}`}
                          href={subcategory.href || '#'}
                          className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                        >
                          {subcategory.name}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
} 