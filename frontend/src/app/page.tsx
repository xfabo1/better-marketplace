"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <div className="flex-grow flex flex-col md:flex-row">
        <aside className="hidden md:block md:w-64 shrink-0">
          <div className="sticky top-16 h-[calc(100vh-4rem)]">
            <Sidebar />
          </div>
        </aside>
        
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-medium text-gray-900 sm:text-5xl">
                {t('find_anything')}
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                {t('buy_sell_easily')}
              </p>
            </div>
            
            <div className="md:hidden mb-8">
              <Sidebar />
            </div>
            
            <SearchBar />
          </div>
        </main>
      </div>
    </div>
  );
}
