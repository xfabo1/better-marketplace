// Types
import { conditions } from "./conditions";

export interface Listing {
  id: number | string;
  title: string;
  price: number;
  location: string;
  postalCode: string;
  image: string;
  category: string;
  condition: string;
  conditionId: string;
  createdAt: string;
  subcategory?: string;
}

// Mock listings data
export const allListings: Listing[] = [
  {
    id: 1,
    title: "Toyota Camry 2019 - Výborný stav",
    price: 350000,
    location: "Praha",
    postalCode: "110 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Toyota+Camry",
    category: "transport",
    condition: "used_very_good",
    conditionId: "used_very_good",
    createdAt: "2023-10-15",
  },
  {
    id: 2,
    title: "iPhone 14 Pro Max - Jako nový",
    price: 22000,
    location: "Brno",
    postalCode: "602 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=iPhone+14",
    category: "electronics",
    condition: "used_like_new",
    conditionId: "used_like_new",
    createdAt: "2023-10-12",
  },
  {
    id: 3,
    title: "Moderní pohovka - Pohodlná a stylová",
    price: 11500,
    location: "Ostrava",
    postalCode: "702 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Pohovka",
    category: "household",
    condition: "used_good",
    conditionId: "used_good",
    createdAt: "2023-10-10",
  },
  {
    id: 4,
    title: "Horské kolo - Trek X-Caliber 8",
    price: 18500,
    location: "Plzeň",
    postalCode: "301 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Horské+kolo",
    category: "sport_hobby",
    condition: "used_very_good",
    conditionId: "used_very_good",
    createdAt: "2023-10-08",
  },
  {
    id: 5,
    title: "Značkové šaty - Velikost M",
    price: 2990,
    location: "Liberec",
    postalCode: "460 01",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Šaty",
    category: "fashion",
    condition: "new",
    conditionId: "new",
    createdAt: "2023-10-05",
  },
  {
    id: 6,
    title: "PlayStation 5 se 2 ovladači",
    price: 12500,
    location: "Olomouc",
    postalCode: "779 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=PlayStation+5",
    category: "electronics",
    condition: "used_like_new",
    conditionId: "used_like_new",
    createdAt: "2023-10-03",
  },
  {
    id: 7,
    title: "Dětská postýlka s matrací",
    price: 3500,
    location: "Praha",
    postalCode: "140 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dětská+postýlka",
    category: "children",
    condition: "used_good",
    conditionId: "used_good",
    createdAt: "2023-10-01",
  },
  {
    id: 8,
    title: "MacBook Pro 2022 - M2 chip",
    price: 38000,
    location: "Praha",
    postalCode: "120 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=MacBook+Pro",
    category: "electronics",
    condition: "used_like_new",
    conditionId: "used_like_new",
    createdAt: "2023-09-28",
  },
  {
    id: 9,
    title: "Zahradní nábytek - Set 6 kusů",
    price: 8500,
    location: "Brno",
    postalCode: "639 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Zahradní+nábytek",
    category: "garden_workshop",
    condition: "used_good",
    conditionId: "used_good",
    createdAt: "2023-09-25",
  },
  {
    id: 10,
    title: "Elektrická koloběžka Xiaomi",
    price: 9900,
    location: "Praha",
    postalCode: "160 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Koloběžka",
    category: "sport_hobby",
    condition: "used_very_good",
    conditionId: "used_very_good",
    createdAt: "2023-09-22",
  },
  {
    id: 11,
    title: "Zimní bunda - Velikost L",
    price: 1800,
    location: "Ostrava",
    postalCode: "710 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Zimní+bunda",
    category: "fashion",
    condition: "used_good",
    conditionId: "used_good",
    createdAt: "2023-09-20",
  },
  {
    id: 12,
    title: "Kuchyňský robot Kenwood",
    price: 4500,
    location: "Plzeň",
    postalCode: "326 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Kuchyňský+robot",
    category: "household",
    condition: "used_fair",
    conditionId: "used_fair",
    createdAt: "2023-09-18",
  },
  {
    id: 13,
    title: "Dámské kolo Specialized",
    price: 12000,
    location: "Praha",
    postalCode: "190 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dámské+kolo",
    category: "sport_hobby",
    condition: "used_very_good",
    conditionId: "used_very_good",
    createdAt: "2023-09-16",
  },
  {
    id: 14,
    title: "Herní počítač - RTX 3080",
    price: 45000,
    location: "Brno",
    postalCode: "612 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Herní+PC",
    category: "electronics",
    condition: "used_like_new",
    conditionId: "used_like_new",
    createdAt: "2023-09-14",
  },
  {
    id: 15,
    title: "Dětské oblečení - Set 0-6 měsíců",
    price: 1200,
    location: "Ostrava",
    postalCode: "700 30",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dětské+oblečení",
    category: "children",
    condition: "used_good",
    conditionId: "used_good",
    createdAt: "2023-09-12",
  },
  {
    id: 16,
    title: "IKEA pohovka KIVIK",
    price: 8000,
    location: "Praha",
    postalCode: "170 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=IKEA+pohovka",
    category: "household",
    condition: "used_good",
    conditionId: "used_good",
    createdAt: "2023-09-10",
  },
  {
    id: 17,
    title: "Dámské lodičky - Velikost 39",
    price: 1500,
    location: "Brno",
    postalCode: "602 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dámské+lodičky",
    category: "fashion",
    condition: "used_like_new",
    conditionId: "used_like_new",
    createdAt: "2023-09-08",
  },
  {
    id: 18,
    title: "Elektrická vrtačka Bosch",
    price: 2800,
    location: "Plzeň",
    postalCode: "301 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Vrtačka+Bosch",
    category: "household",
    condition: "used_fair",
    conditionId: "used_fair",
    createdAt: "2023-09-06",
  },
];

// Helper function to generate mock listings for a specific category
export const generateMockListings = (category: string, subcategory: string | null): Listing[] => {
  // Generate some mock listings for demo purposes
  const mockListings: Listing[] = [];
  const count = Math.floor(Math.random() * 15) + 10; // 10-25 listings for better pagination demo
  
  const cities = [
    { name: "Praha", postalCodes: ["110 00", "120 00", "130 00", "140 00", "150 00"] },
    { name: "Brno", postalCodes: ["602 00", "603 00", "612 00", "639 00"] },
    { name: "Ostrava", postalCodes: ["702 00", "710 00", "700 30"] },
    { name: "Plzeň", postalCodes: ["301 00", "326 00"] },
    { name: "Liberec", postalCodes: ["460 01", "460 05"] }
  ];
  
  const categoryTitles: {[key: string]: string[]} = {
    "elektronika": ["iPhone", "MacBook Pro", "PlayStation 5", "Samsung TV", "Herní počítač"],
    "automobily": ["Toyota Camry", "Škoda Octavia", "Volkswagen Golf", "BMW X5", "Audi A4"],
    "nabytek": ["Pohovka", "Jídelní stůl", "Skříň", "Postel", "Křeslo"],
    "sport": ["Horské kolo", "Běžecké boty", "Lyže", "Tenisová raketa", "Fotbalový míč"],
    "obleceni": ["Zimní bunda", "Značkové šaty", "Pánský oblek", "Sportovní obuv", "Dámská kabelka"]
  };
  
  const defaultTitles = ["Produkt", "Zboží", "Item", "Věc", "Předmět"];
  
  const formatCategoryName = (slug: string) => {
    if (!slug) return "Neznámá kategorie";
    // Convert slug to display name (e.g., "doprava" -> "Doprava")
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  };
  
  for (let i = 1; i <= count; i++) {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomPostalCode = randomCity.postalCodes[Math.floor(Math.random() * randomCity.postalCodes.length)];
    
    // Make sure we get a valid condition
    let randomCondition;
    if (conditions && conditions.length > 1) {
      // Skip the "all" condition at index 0
      const index = Math.floor(Math.random() * (conditions.length - 1)) + 1;
      randomCondition = conditions[index];
    }
    
    // Use default values if no condition was found
    const conditionId = randomCondition?.id || "used_good";
    
    // Try to get a relevant title for the category
    let titleOptions = defaultTitles;
    const normalizedCategory = category ? category.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
    if (normalizedCategory && categoryTitles[normalizedCategory]) {
      titleOptions = categoryTitles[normalizedCategory];
    }
    
    const baseTitle = titleOptions[Math.floor(Math.random() * titleOptions.length)];
    const title = subcategory 
      ? `${baseTitle} - ${formatCategoryName(subcategory)} ${i}` 
      : `${baseTitle} - ${formatCategoryName(category)} ${i}`;
    
    mockListings.push({
      id: `${category}-${i}`,
      title: title,
      price: Math.floor(Math.random() * 50000) + 500,
      location: randomCity.name,
      postalCode: randomPostalCode,
      image: `https://placehold.co/600x400/e6f7ef/10b981/png?text=${encodeURIComponent(baseTitle)}`,
      category: category,
      condition: randomCondition?.name || "used_good",
      conditionId: conditionId,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subcategory: subcategory ? subcategory : undefined,
    });
  }
  
  return mockListings;
};
