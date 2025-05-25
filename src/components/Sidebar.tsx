"use client";

import Link from "next/link";
import { useState } from "react";

// Categories data structure with subcategories
const categories = [
  {
    name: "Doprava",
    href: "/category/doprava",
    subcategories: [
      { name: "Automobily", href: "/category/doprava/automobily" },
      { name: "Motorky", href: "/category/doprava/motorky" },
      { name: "Nákladné vozidlá", href: "/category/doprava/nakladne-vozidla" },
      { name: "Autobusy", href: "/category/doprava/autobusy" },
      { name: "Prívesy a návesy", href: "/category/doprava/privesy-navěsy" },
      { name: "Náhradné diely", href: "/category/doprava/nahradne-diely" },
      { name: "Pneumatiky a disky", href: "/category/doprava/pneumatiky-disky" },
      { name: "Autopríslušenstvo", href: "/category/doprava/autoprislusenstvo" },
      { name: "Lode a člny", href: "/category/doprava/lode-clny" },
      { name: "Bicykle a elektrobicykle", href: "/category/doprava/bicykle" },
    ],
  },
  {
    name: "Elektronika",
    href: "/category/elektronika",
    subcategories: [
      { name: "Mobilné telefóny", href: "/category/elektronika/mobilne-telefony" },
      { name: "Tablety", href: "/category/elektronika/tablety" },
      { name: "Notebooky", href: "/category/elektronika/notebooky" },
      { name: "Počítače", href: "/category/elektronika/pocitace" },
      { name: "TV, audio, video", href: "/category/elektronika/tv-audio-video" },
      { name: "Fotoaparáty a kamery", href: "/category/elektronika/fotoaparaty" },
      { name: "Herné konzoly a hry", href: "/category/elektronika/herne-konzoly" },
      { name: "PC príslušenstvo", href: "/category/elektronika/pc-prislusenstvo" },
      { name: "Chytré hodinky a náramky", href: "/category/elektronika/smart-hodinky" },
      { name: "Sieťové prvky a routery", href: "/category/elektronika/sietove-prvky" },
    ],
  },
  {
    name: "Domácnosť",
    href: "/category/domacnost",
    subcategories: [
      { name: "Nábytok", href: "/category/domacnost/nabytok" },
      { name: "Biela technika", href: "/category/domacnost/biela-technika" },
      { name: "Kuchynské spotrebiče", href: "/category/domacnost/kuchynske-spotrebice" },
      { name: "Domáce spotrebiče", href: "/category/domacnost/domace-spotrebice" },
      { name: "Dekorácie", href: "/category/domacnost/dekoracie" },
      { name: "Osvetlenie", href: "/category/domacnost/osvetlenie" },
      { name: "Domáce potreby", href: "/category/domacnost/domace-potreby" },
      { name: "Čistiaca technika", href: "/category/domacnost/cistiaca-technika" },
      { name: "Kúpeľňa a WC", href: "/category/domacnost/kupelna" },
    ],
  },
  {
    name: "Záhrada a dielňa",
    href: "/category/zahrada-dielna",
    subcategories: [
      { name: "Záhradné náradie", href: "/category/zahrada-dielna/zahradne-naradie" },
      { name: "Stroje a kosačky", href: "/category/zahrada-dielna/stroje-kosacky" },
      { name: "Nábytok na záhradu", href: "/category/zahrada-dielna/zahradny-nabytok" },
      { name: "Rastliny a kvety", href: "/category/zahrada-dielna/rastliny" },
      { name: "Grily a vybavenie", href: "/category/zahrada-dielna/grily" },
      { name: "Náradie a vybavenie dielne", href: "/category/zahrada-dielna/naradie" },
      { name: "Stavebný materiál", href: "/category/zahrada-dielna/stavebny-material" },
    ],
  },
  {
    name: "Móda",
    href: "/category/moda",
    subcategories: [
      { name: "Oblečenie - muži", href: "/category/moda/muzi" },
      { name: "Oblečenie - ženy", href: "/category/moda/zeny" },
      { name: "Detské oblečenie", href: "/category/moda/deti" },
      { name: "Obuv", href: "/category/moda/obuv" },
      { name: "Doplnky", href: "/category/moda/doplnky" },
      { name: "Šperky a hodinky", href: "/category/moda/sperky-hodinky" },
      { name: "Kabelky a tašky", href: "/category/moda/kabelky-tasky" },
    ],
  },
  {
    name: "Šport a hobby",
    href: "/category/sport-hobby",
    subcategories: [
      { name: "Fitness a posilňovanie", href: "/category/sport-hobby/fitness" },
      { name: "Cyklistika", href: "/category/sport-hobby/cyklistika" },
      { name: "Zimné športy", href: "/category/sport-hobby/zimne-sporty" },
      { name: "Loptové hry", href: "/category/sport-hobby/loptove-hry" },
      { name: "Kempovanie a turistika", href: "/category/sport-hobby/kemping" },
      { name: "Rybolov", href: "/category/sport-hobby/rybolov" },
      { name: "Strelectvo a airsoft", href: "/category/sport-hobby/strelectvo" },
      { name: "Hudobné nástroje", href: "/category/sport-hobby/hudobne-nastroje" },
      { name: "Modelárstvo", href: "/category/sport-hobby/modelarstvo" },
    ],
  },
  {
    name: "Deti",
    href: "/category/deti",
    subcategories: [
      { name: "Hračky", href: "/category/deti/hracky" },
      { name: "Kočíky", href: "/category/deti/kociky" },
      { name: "Detský nábytok", href: "/category/deti/nabytok" },
      { name: "Detské oblečenie", href: "/category/deti/oblecenie" },
      { name: "Autosedačky", href: "/category/deti/autosedacky" },
      { name: "Potrebné vybavenie", href: "/category/deti/vybavenie" },
    ],
  },
  {
    name: "Zvieratá",
    href: "/category/zvierata",
    subcategories: [
      { name: "Psy", href: "/category/zvierata/psy" },
      { name: "Mačky", href: "/category/zvierata/macky" },
      { name: "Hlodavce", href: "/category/zvierata/hlodavce" },
      { name: "Teraristika", href: "/category/zvierata/teraristika" },
      { name: "Akváriá a ryby", href: "/category/zvierata/akvarium" },
      { name: "Krmivo a potreby", href: "/category/zvierata/potreby" },
    ],
  },
  {
    name: "Kultúra a vzdelanie",
    href: "/category/kultura-vzdelanie",
    subcategories: [
      { name: "Knihy", href: "/category/kultura-vzdelanie/knihy" },
      { name: "Učebnice", href: "/category/kultura-vzdelanie/ucebnice" },
      { name: "CD, DVD, Blu-ray", href: "/category/kultura-vzdelanie/cd-dvd" },
      { name: "Plagáty a obrazy", href: "/category/kultura-vzdelanie/obrazky" },
    ],
  },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
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
          {categories.map((category) => (
            <div key={category.name} className="mb-2">
              <div className="flex items-center justify-between">
                <Link
                  href={category.href}
                  className="flex-grow flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-primary hover:bg-gray-50"
                >
                  {category.name}
                </Link>
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="px-2 py-2 text-gray-400 hover:text-gray-600"
                >
                  {expandedCategory === category.name ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Subcategories */}
              {expandedCategory === category.name && (
                <div className="ml-4 mt-1 pl-2 border-l border-gray-200">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      href={subcategory.href}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 