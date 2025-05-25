"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { name: "Automobily", href: "/category/automobily" },
  { name: "Motorky", href: "/category/motorky" },
  { name: "Náhradní díly", href: "/category/nahradni-dily" },
  { name: "Elektronika", href: "/category/elektronika" },
  { name: "Mobilní telefony", href: "/category/mobilni-telefony" },
  { name: "Počítače", href: "/category/pocitace" },
  { name: "Nemovitosti", href: "/category/nemovitosti" },
  { name: "Nábytek", href: "/category/nabytek" },
  { name: "Oblečení", href: "/category/obleceni" },
  { name: "Obuv", href: "/category/obuv" },
  { name: "Sport", href: "/category/sport" },
  { name: "Knihy", href: "/category/knihy" },
  { name: "Hračky", href: "/category/hracky" },
  { name: "Zahrada", href: "/category/zahrada" },
  { name: "Domácí mazlíčci", href: "/category/domaci-mazlicci" },
  { name: "Služby", href: "/category/sluzby" },
  { name: "Práce", href: "/category/prace" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border-r border-gray-100 w-full md:w-64 flex-shrink-0">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Kategorie</h2>
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
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-primary hover:bg-gray-50"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 