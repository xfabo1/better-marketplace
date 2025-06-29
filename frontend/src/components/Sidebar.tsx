"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleCategory = (categoryId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  const navigateToCategory = (categoryId: string, subcategoryId?: string) => {
    const params = new URLSearchParams(searchParams);
    
    // Clear existing category/subcategory params
    params.delete('category');
    params.delete('subcategory');
    
    // Set new category
    params.set('category', categoryId);
    
    // Set subcategory if provided
    if (subcategoryId) {
      params.set('subcategory', subcategoryId);
    }
    
    // Navigate to listings with query params
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <div className="bg-white border-r border-gray-100 w-full md:w-64 flex-shrink-0">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">{t('categories')}</h2>
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
                <div className="flex">
                  <button
                    onClick={() => navigateToCategory(category.id)}
                    className="flex-1 flex items-center px-3 py-2 text-sm font-medium rounded-l-md text-gray-600 hover:text-primary hover:bg-gray-50"
                  >
                    <span>{t(category.id)}</span>
                  </button>
                  {category.subcategories && (
                    <button
                      onClick={(e) => toggleCategory(category.id || '', e)}
                      className="px-2 py-2 text-sm font-medium rounded-r-md text-gray-400 hover:text-primary hover:bg-gray-50"
                    >
                      {expandedCategory === category.id ? (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                
                {/* Subcategories */}
                {expandedCategory === category.id && category.subcategories && (
                  <div className="ml-4 mt-1 pl-2 border-l border-gray-200">
                    {category.subcategories.map((subcategory) => (
                      subcategory && (
                        <button
                          key={subcategory.id || `subcategory-${Math.random()}`}
                          onClick={() => navigateToCategory(category.id, subcategory.id)}
                          className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md text-left"
                        >
                          {t(subcategory.id)}
                        </button>
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