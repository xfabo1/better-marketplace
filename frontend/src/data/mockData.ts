// Types
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

// Condition options for filtering
export const conditions = [
  { id: "all", name: "all_conditions" },
  { id: "nove", name: "new" },
  { id: "jako_nove", name: "used_like_new" },
  { id: "velmi_dobre", name: "used_very_good" },
  { id: "dobre", name: "used_good" },
  { id: "horsi", name: "used_fair" }
];

// Sort options
export const sortOptions = [
  { label: "newest", value: "newest" },
  { label: "oldest", value: "oldest" },
  { label: "price_lowest", value: "price_asc" },
  { label: "price_highest", value: "price_desc" },
];

// Date filter options
export const dateFilterOptions = [
  { label: "all_dates", value: "all" },
  { label: "today", value: "today" },
  { label: "this_week", value: "week" },
  { label: "this_month", value: "month" },
];

// Mock listings data
export const allListings: Listing[] = [
  {
    id: 1,
    title: "Toyota Camry 2019 - Výborný stav",
    price: 350000,
    location: "Praha",
    postalCode: "110 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Toyota+Camry",
    category: "Automobily",
    condition: "used_very_good",
    conditionId: "velmi_dobre",
    createdAt: "2023-10-15",
  },
  {
    id: 2,
    title: "iPhone 14 Pro Max - Jako nový",
    price: 22000,
    location: "Brno",
    postalCode: "602 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=iPhone+14",
    category: "Elektronika",
    condition: "used_like_new",
    conditionId: "jako_nove",
    createdAt: "2023-10-12",
  },
  {
    id: 3,
    title: "Moderní pohovka - Pohodlná a stylová",
    price: 11500,
    location: "Ostrava",
    postalCode: "702 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Pohovka",
    category: "Nábytek",
    condition: "used_good",
    conditionId: "dobre",
    createdAt: "2023-10-10",
  },
  {
    id: 4,
    title: "Horské kolo - Trek X-Caliber 8",
    price: 18500,
    location: "Plzeň",
    postalCode: "301 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Horské+kolo",
    category: "Sport",
    condition: "used_very_good",
    conditionId: "velmi_dobre",
    createdAt: "2023-10-08",
  },
  {
    id: 5,
    title: "Značkové šaty - Velikost M",
    price: 2990,
    location: "Liberec",
    postalCode: "460 01",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Šaty",
    category: "Oblečení",
    condition: "new",
    conditionId: "nove",
    createdAt: "2023-10-05",
  },
  {
    id: 6,
    title: "PlayStation 5 se 2 ovladači",
    price: 12500,
    location: "Olomouc",
    postalCode: "779 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=PlayStation+5",
    category: "Elektronika",
    condition: "used_like_new",
    conditionId: "jako_nove",
    createdAt: "2023-10-03",
  },
  {
    id: 7,
    title: "Dětská postýlka s matrací",
    price: 3500,
    location: "Praha",
    postalCode: "140 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dětská+postýlka",
    category: "Dětské zboží",
    condition: "used_good",
    conditionId: "dobre",
    createdAt: "2023-10-01",
  },
  {
    id: 8,
    title: "MacBook Pro 2022 - M2 chip",
    price: 38000,
    location: "Praha",
    postalCode: "120 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=MacBook+Pro",
    category: "Elektronika",
    condition: "used_like_new",
    conditionId: "jako_nove",
    createdAt: "2023-09-28",
  },
  {
    id: 9,
    title: "Zahradní nábytek - Set 6 kusů",
    price: 8500,
    location: "Brno",
    postalCode: "639 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Zahradní+nábytek",
    category: "Nábytek",
    condition: "used_good",
    conditionId: "dobre",
    createdAt: "2023-09-25",
  },
  {
    id: 10,
    title: "Elektrická koloběžka Xiaomi",
    price: 9900,
    location: "Praha",
    postalCode: "160 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Koloběžka",
    category: "Sport",
    condition: "used_very_good",
    conditionId: "velmi_dobre",
    createdAt: "2023-09-22",
  },
  {
    id: 11,
    title: "Zimní bunda - Velikost L",
    price: 1800,
    location: "Ostrava",
    postalCode: "710 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Zimní+bunda",
    category: "Oblečení",
    condition: "used_good",
    conditionId: "dobre",
    createdAt: "2023-09-20",
  },
  {
    id: 12,
    title: "Kuchyňský robot Kenwood",
    price: 4500,
    location: "Plzeň",
    postalCode: "326 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Kuchyňský+robot",
    category: "Elektronika",
    condition: "used_fair",
    conditionId: "horsi",
    createdAt: "2023-09-18",
  },
  {
    id: 13,
    title: "Dámské kolo Specialized",
    price: 12000,
    location: "Praha",
    postalCode: "190 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dámské+kolo",
    category: "Sport",
    condition: "used_very_good",
    conditionId: "velmi_dobre",
    createdAt: "2023-09-16",
  },
  {
    id: 14,
    title: "Herní počítač - RTX 3080",
    price: 45000,
    location: "Brno",
    postalCode: "612 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Herní+PC",
    category: "Elektronika",
    condition: "used_like_new",
    conditionId: "jako_nove",
    createdAt: "2023-09-14",
  },
  {
    id: 15,
    title: "Dětské oblečení - Set 0-6 měsíců",
    price: 1200,
    location: "Ostrava",
    postalCode: "700 30",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dětské+oblečení",
    category: "Dětské zboží",
    condition: "used_good",
    conditionId: "dobre",
    createdAt: "2023-09-12",
  },
  {
    id: 16,
    title: "IKEA pohovka KIVIK",
    price: 8000,
    location: "Praha",
    postalCode: "170 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=IKEA+pohovka",
    category: "Nábytek",
    condition: "used_good",
    conditionId: "dobre",
    createdAt: "2023-09-10",
  },
  {
    id: 17,
    title: "Dámské lodičky - Velikost 39",
    price: 1500,
    location: "Brno",
    postalCode: "602 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Dámské+lodičky",
    category: "Oblečení",
    condition: "used_like_new",
    conditionId: "jako_nove",
    createdAt: "2023-09-08",
  },
  {
    id: 18,
    title: "Elektrická vrtačka Bosch",
    price: 2800,
    location: "Plzeň",
    postalCode: "301 00",
    image: "https://placehold.co/600x400/e6f7ef/10b981/png?text=Vrtačka+Bosch",
    category: "Elektronika",
    condition: "used_fair",
    conditionId: "horsi",
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
    const conditionId = randomCondition?.id || "dobre";
    
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

// Categories data structure
export const categories = [
  {
    id: "doprava",
    name: "Doprava",
    href: "/category/doprava",
    subcategories: [
      { id: "automobily", name: "Automobily", href: "/category/doprava/automobily" },
      { id: "motorky", name: "Motorky", href: "/category/doprava/motorky" },
      { id: "nakladni-vozidla", name: "Nákladní vozidla", href: "/category/doprava/nakladni-vozidla" },
      { id: "autobusy", name: "Autobusy", href: "/category/doprava/autobusy" },
      { id: "privesy-navesy", name: "Přívěsy a návěsy", href: "/category/doprava/privesy-navesy" },
      { id: "nahradni-dily", name: "Náhradní díly", href: "/category/doprava/nahradni-dily" },
      { id: "pneumatiky-disky", name: "Pneumatiky a disky", href: "/category/doprava/pneumatiky-disky" },
      { id: "autoprislusenstvi", name: "Autopříslušenství", href: "/category/doprava/autoprislusenstvi" },
      { id: "lode-cluny", name: "Lodě a čluny", href: "/category/doprava/lode-cluny" },
      { id: "kola", name: "Kola a elektrokola", href: "/category/doprava/kola" },
    ],
  },
  {
    id: "elektronika",
    name: "Elektronika",
    href: "/category/elektronika",
    subcategories: [
      { id: "mobilni-telefony", name: "Mobilní telefony", href: "/category/elektronika/mobilni-telefony" },
      { id: "tablety", name: "Tablety", href: "/category/elektronika/tablety" },
      { id: "notebooky", name: "Notebooky", href: "/category/elektronika/notebooky" },
      { id: "pocitace", name: "Počítače", href: "/category/elektronika/pocitace" },
      { id: "tv-audio-video", name: "TV, audio, video", href: "/category/elektronika/tv-audio-video" },
      { id: "fotoaparaty", name: "Fotoaparáty a kamery", href: "/category/elektronika/fotoaparaty" },
      { id: "herni-konzole", name: "Herní konzole a hry", href: "/category/elektronika/herni-konzole" },
      { id: "pc-prislusenstvi", name: "PC příslušenství", href: "/category/elektronika/pc-prislusenstvi" },
      { id: "smart-hodinky", name: "Chytré hodinky a náramky", href: "/category/elektronika/smart-hodinky" },
      { id: "sitove-prvky", name: "Síťové prvky a routery", href: "/category/elektronika/sitove-prvky" },
    ],
  },
  {
    id: "domacnost",
    name: "Domácnost",
    href: "/category/domacnost",
    subcategories: [
      { id: "nabytek", name: "Nábytek", href: "/category/domacnost/nabytek" },
      { id: "bila-technika", name: "Bílá technika", href: "/category/domacnost/bila-technika" },
      { id: "kuchynske-spotrebice", name: "Kuchyňské spotřebiče", href: "/category/domacnost/kuchynske-spotrebice" },
      { id: "domaci-spotrebice", name: "Domácí spotřebiče", href: "/category/domacnost/domaci-spotrebice" },
      { id: "dekorace", name: "Dekorace", href: "/category/domacnost/dekorace" },
      { id: "osvetleni", name: "Osvětlení", href: "/category/domacnost/osvetleni" },
      { id: "domaci-potreby", name: "Domácí potřeby", href: "/category/domacnost/domaci-potreby" },
      { id: "cistici-technika", name: "Čisticí technika", href: "/category/domacnost/cistici-technika" },
      { id: "koupelna", name: "Koupelna a WC", href: "/category/domacnost/koupelna" },
    ],
  },
  {
    id: "zahrada-dilna",
    name: "Zahrada a dílna",
    href: "/category/zahrada-dilna",
    subcategories: [
      { id: "zahradni-naradi", name: "Zahradní nářadí", href: "/category/zahrada-dilna/zahradni-naradi" },
      { id: "stroje-sekacky", name: "Stroje a sekačky", href: "/category/zahrada-dilna/stroje-sekacky" },
      { id: "zahradni-nabytek", name: "Nábytek na zahradu", href: "/category/zahrada-dilna/zahradni-nabytek" },
      { id: "rostliny", name: "Rostliny a květiny", href: "/category/zahrada-dilna/rostliny" },
      { id: "grily", name: "Grily a vybavení", href: "/category/zahrada-dilna/grily" },
      { id: "naradi", name: "Nářadí a vybavení dílny", href: "/category/zahrada-dilna/naradi" },
      { id: "stavebni-material", name: "Stavební materiál", href: "/category/zahrada-dilna/stavebni-material" },
    ],
  },
  {
    id: "moda",
    name: "Móda",
    href: "/category/moda",
    subcategories: [
      { id: "muzi", name: "Oblečení - muži", href: "/category/moda/muzi" },
      { id: "zeny", name: "Oblečení - ženy", href: "/category/moda/zeny" },
      { id: "deti", name: "Dětské oblečení", href: "/category/moda/deti" },
      { id: "obuv", name: "Obuv", href: "/category/moda/obuv" },
      { id: "doplnky", name: "Doplňky", href: "/category/moda/doplnky" },
      { id: "sperky-hodinky", name: "Šperky a hodinky", href: "/category/moda/sperky-hodinky" },
      { id: "kabelky-tasky", name: "Kabelky a tašky", href: "/category/moda/kabelky-tasky" },
    ],
  },
  {
    id: "sport-hobby",
    name: "Sport a hobby",
    href: "/category/sport-hobby",
    subcategories: [
      { id: "fitness", name: "Fitness a posilování", href: "/category/sport-hobby/fitness" },
      { id: "cyklistika", name: "Cyklistika", href: "/category/sport-hobby/cyklistika" },
      { id: "zimni-sporty", name: "Zimní sporty", href: "/category/sport-hobby/zimni-sporty" },
      { id: "micove-hry", name: "Míčové hry", href: "/category/sport-hobby/micove-hry" },
      { id: "kempovani", name: "Kempování a turistika", href: "/category/sport-hobby/kempovani" },
      { id: "rybareni", name: "Rybaření", href: "/category/sport-hobby/rybareni" },
      { id: "strelectvi", name: "Střelectví a airsoft", href: "/category/sport-hobby/strelectvi" },
      { id: "hudebni-nastroje", name: "Hudební nástroje", href: "/category/sport-hobby/hudebni-nastroje" },
      { id: "modelarstvi", name: "Modelářství", href: "/category/sport-hobby/modelarstvi" },
    ],
  },
  {
    id: "deti",
    name: "Děti",
    href: "/category/deti",
    subcategories: [
      { id: "hracky", name: "Hračky", href: "/category/deti/hracky" },
      { id: "kocarky", name: "Kočárky", href: "/category/deti/kocarky" },
      { id: "nabytek", name: "Dětský nábytek", href: "/category/deti/nabytek" },
      { id: "obleceni", name: "Dětské oblečení", href: "/category/deti/obleceni" },
      { id: "autosedacky", name: "Autosedačky", href: "/category/deti/autosedacky" },
      { id: "vybaveni", name: "Potřebné vybavení", href: "/category/deti/vybaveni" },
    ],
  },
  {
    id: "zvirata",
    name: "Zvířata",
    href: "/category/zvirata",
    subcategories: [
      { id: "psi", name: "Psi", href: "/category/zvirata/psi" },
      { id: "kocky", name: "Kočky", href: "/category/zvirata/kocky" },
      { id: "hlodavci", name: "Hlodavci", href: "/category/zvirata/hlodavci" },
      { id: "teraristika", name: "Teraristika", href: "/category/zvirata/teraristika" },
      { id: "akvarium", name: "Akvária a ryby", href: "/category/zvirata/akvarium" },
      { id: "potreby", name: "Krmivo a potřeby", href: "/category/zvirata/potreby" },
    ],
  },
  {
    id: "kultura-vzdelavani",
    name: "Kultura a vzdělávání",
    href: "/category/kultura-vzdelavani",
    subcategories: [
      { id: "knihy", name: "Knihy", href: "/category/kultura-vzdelavani/knihy" },
      { id: "ucebnice", name: "Učebnice", href: "/category/kultura-vzdelavani/ucebnice" },
      { id: "cd-dvd", name: "CD, DVD, Blu-ray", href: "/category/kultura-vzdelavani/cd-dvd" },
      { id: "obrazy", name: "Plakáty a obrazy", href: "/category/kultura-vzdelavani/obrazy" },
    ],
  },
];