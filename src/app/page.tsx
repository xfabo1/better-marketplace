import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import FeaturedListings from "@/components/FeaturedListings";

// Temporary authentication state (in a real app, this would come from a proper auth system)
const isLoggedIn = false;

export default function Home() {
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
                Najděte cokoliv potřebujete
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Nakupujte a prodávejte jednoduše na Lepším Tržišti
              </p>
            </div>
            
            <div className="md:hidden mb-8">
              <Sidebar />
            </div>
            
            <SearchBar />
            
            <div className="mt-12">
              <FeaturedListings />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
