// Define available languages
export type Language = 'cs' | 'sk' | 'en';

// Translation data structure
export type TranslationData = {
  [key in Language]: {
    [key: string]: string;
  };
};

// All translations for the site
export const translations: TranslationData = {
  cs: {
    // Header
    "browse": "Procházet",
    "sell": "Prodat",
    "my_listings": "Moje inzeráty",
    "profile": "Profil",
    "settings": "Nastavení",
    "logout": "Odhlásit",
    "login": "Přihlásit",
    "register": "Registrovat",
    "open_menu": "Otevřít menu",
    
    // Navigation
    "home": "Domů",
    
    // Home page
    "find_anything": "Najděte cokoliv potřebujete",
    "buy_sell_easily": "Nakupujte a prodávejte jednoduše na Lepším Tržišti",
    
    // Sidebar
    "categories": "Kategorie",
    
    // Category names
    "transport": "Doprava",
    "electronics": "Elektronika",
    "household": "Domácnost",
    "garden_workshop": "Zahrada a dílna",
    "fashion": "Móda",
    "sport_hobby": "Sport a hobby",
    "children": "Děti",
    "animals": "Zvířata",
    
    // Subcategories - Transport
    "cars": "Automobily",
    "motorcycles": "Motorky",
    "trucks": "Nákladní vozidla",
    "buses": "Autobusy",
    "trailers": "Přívěsy a návěsy",
    "spare_parts": "Náhradní díly",
    "tires_discs": "Pneumatiky a disky",
    "car_accessories": "Autopříslušenství",
    "boats": "Lodě a čluny",
    "bicycles": "Kola a elektrokola",
    
    // Subcategories - Electronics
    "mobile_phones": "Mobilní telefony",
    "tablets": "Tablety",
    "laptops": "Notebooky",
    "computers": "Počítače",
    "tv_audio_video": "TV, audio, video",
    "cameras": "Fotoaparáty a kamery",
    "gaming_consoles": "Herní konzole a hry",
    "pc_accessories": "PC příslušenství",
    "smart_watches": "Chytré hodinky a náramky",
    "network_devices": "Síťové prvky a routery",
    
    // Subcategories - Household
    "furniture": "Nábytek",
    "appliances": "Bílá technika",
    "kitchen_appliances": "Kuchyňské spotřebiče",
    "home_appliances": "Domácí spotřebiče",
    "decorations": "Dekorace",
    "lighting": "Osvětlení",
    "household_items": "Domácí potřeby",
    "cleaning_equipment": "Čisticí technika",
    "bathroom": "Koupelna a WC",
    
    // Subcategories - Garden & Workshop
    "garden_tools": "Zahradní nářadí",
    "machines_mowers": "Stroje a sekačky",
    "garden_furniture": "Nábytek na zahradu",
    "plants": "Rostliny a květiny",
    "grills": "Grily a vybavení",
    "tools": "Nářadí a vybavení dílny",
    "building_materials": "Stavební materiál",
    
    // Subcategories - Fashion
    "men": "Oblečení - muži",
    "women": "Oblečení - ženy",
    "children_clothes": "Dětské oblečení",
    "footwear": "Obuv",
    "accessories": "Doplňky",
    "jewelry_watches": "Šperky a hodinky",
    "bags": "Kabelky a tašky",
    
    // Subcategories - Sports & Hobbies
    "fitness": "Fitness a posilování",
    "cycling": "Cyklistika",
    "winter_sports": "Zimní sporty",
    "ball_games": "Míčové hry",
    "camping": "Kempování a turistika",
    "fishing": "Rybaření",
    "shooting": "Střelectví a airsoft",
    "musical_instruments": "Hudební nástroje",
    "modeling": "Modelářství",
    
    // Subcategories - Children
    "toys": "Hračky",
    "strollers": "Kočárky",
    "children_furniture": "Dětský nábytek",
    "car_seats": "Autosedačky",
    "equipment": "Potřebné vybavení",
    
    // Subcategories - Animals
    "dogs": "Psi",
    "cats": "Kočky",
    "small_animals": "Malá zvířata",
    "farm_animals": "Hospodářská zvířata",
    "aquarium": "Akvaristika",
    "terrarium": "Teraristika",
    "accessories_for_animals": "Chovatelské potřeby",
    "food": "Krmivo",
    
    // Condition options
    "all_conditions": "Všechny stavy",
    "new": "Nové",
    "used_like_new": "Použité - jako nové",
    "used_very_good": "Použité - velmi dobrý stav",
    "used_good": "Použité - dobrý stav",
    "used_fair": "Použité - horší stav",
    
    // Sort options
    "newest": "Nejnovější",
    "oldest": "Nejstarší",
    "price_lowest": "Nejlevnější",
    "price_highest": "Nejdražší",
    
    // Date filter options
    "all_dates": "Všechny",
    "today": "Dnes",
    "this_week": "Tento týden",
    "this_month": "Tento měsíc",
    
    // Search
    "search_anything": "Hledat cokoliv...",
    "search": "Hledat",
    "filters": "Filtry",
    "location": "Lokalita",
    "enter_city": "Zadejte město nebo PSČ...",
    "condition": "Stav",
    "date_added": "Datum přidání",
    "price_range": "Cenové rozmezí",
    "from": "Od",
    "to": "Do",
    
    // Listings page
    "browse_listings": "Procházet inzeráty",
    "listing_singular": "inzerát",
    "listing_few": "inzeráty",
    "listing_many": "inzerátů",
    "sort_by": "Řazení",
    "previous": "Předchozí",
    "next": "Další",
    "no_listings": "Žádné inzeráty",
    "no_listings_found": "Pro vaše vyhledávání nebyly nalezeny žádné inzeráty.",
    "no_listings_in_category": "V této kategorii zatím nejsou žádné inzeráty.",
    "reset_filters": "Resetovat filtry",
    
    // Profile page
    "personal_info": "Osobní údaje",
    "edit_profile": "Upravit profil",
    "change_password": "Změnit heslo",
    "notifications": "Oznámení",
    "messages": "Zprávy",
    "saved_listings": "Uložené inzeráty",
    "account_settings": "Nastavení účtu",
    "payment_methods": "Platební metody",
    "shipping_addresses": "Dodací adresy",
    "privacy_settings": "Nastavení soukromí",
    "delete_account": "Smazat účet",
    "login_to_view_profile": "Přihlaste se pro zobrazení profilu",
    "profile_login_message": "Pro zobrazení vašeho profilu se musíte nejprve přihlásit.",
    "member_since": "Členem od",
    "name": "Jméno",
    "email": "Email",
    "phone": "Telefon",
    "registration": "Registrace",
    "overview": "Přehled",
    "activity_stats": "Statistiky vašich aktivit na Better Marketplace",
    "total": "Celkem",
    "active": "Aktivní",
    "sold": "Prodané",
    
    // Item details
    "description": "Popis",
    "specifications": "Specifikace",
    "seller_info": "Informace o prodejci",
    "contact_seller": "Kontaktovat prodejce",
    "location_info": "Lokalita",
    "delivery_options": "Možnosti doručení",
    "payment_options": "Možnosti platby",
    "similar_items": "Podobné položky",
    "report_item": "Nahlásit inzerát",
    "share": "Sdílet",
    "favorite": "Přidat do oblíbených",
    "item_posted": "Inzerát přidán",
    "no_longer_available": "Již není dostupné",
  },
  
  sk: {
    // Header
    "browse": "Prehliadať",
    "sell": "Predať",
    "my_listings": "Moje inzeráty",
    "profile": "Profil",
    "settings": "Nastavenia",
    "logout": "Odhlásiť",
    "login": "Prihlásiť",
    "register": "Registrovať",
    "open_menu": "Otvoriť menu",
    
    // Navigation
    "home": "Domov",
    
    // Home page
    "find_anything": "Nájdite čokoľvek potrebujete",
    "buy_sell_easily": "Nakupujte a predávajte jednoducho na Lepšom Trhovisku",
    
    // Sidebar
    "categories": "Kategórie",
    
    // Category names
    "transport": "Doprava",
    "electronics": "Elektronika",
    "household": "Domácnosť",
    "garden_workshop": "Záhrada a dielňa",
    "fashion": "Móda",
    "sport_hobby": "Šport a hobby",
    "children": "Deti",
    "animals": "Zvieratá",
    
    // Subcategories - Transport
    "cars": "Automobily",
    "motorcycles": "Motorky",
    "trucks": "Nákladné vozidlá",
    "buses": "Autobusy",
    "trailers": "Prívesy a návesy",
    "spare_parts": "Náhradné diely",
    "tires_discs": "Pneumatiky a disky",
    "car_accessories": "Autopríslušenstvo",
    "boats": "Lode a člny",
    "bicycles": "Bicykle a elektrobicykle",
    
    // Subcategories - Electronics
    "mobile_phones": "Mobilné telefóny",
    "tablets": "Tablety",
    "laptops": "Notebooky",
    "computers": "Počítače",
    "tv_audio_video": "TV, audio, video",
    "cameras": "Fotoaparáty a kamery",
    "gaming_consoles": "Herné konzoly a hry",
    "pc_accessories": "PC príslušenstvo",
    "smart_watches": "Chytré hodinky a náramky",
    "network_devices": "Sieťové prvky a routery",
    
    // Subcategories - Household
    "furniture": "Nábytok",
    "appliances": "Biela technika",
    "kitchen_appliances": "Kuchynské spotrebiče",
    "home_appliances": "Domáce spotrebiče",
    "decorations": "Dekorácie",
    "lighting": "Osvetlenie",
    "household_items": "Domáce potreby",
    "cleaning_equipment": "Čistiaca technika",
    "bathroom": "Kúpeľňa a WC",
    
    // Subcategories - Garden & Workshop
    "garden_tools": "Záhradné náradie",
    "machines_mowers": "Stroje a kosačky",
    "garden_furniture": "Nábytok do záhrady",
    "plants": "Rastliny a kvety",
    "grills": "Grily a vybavenie",
    "tools": "Náradie a vybavenie dielne",
    "building_materials": "Stavebný materiál",
    
    // Subcategories - Fashion
    "men": "Oblečenie - muži",
    "women": "Oblečenie - ženy",
    "children_clothes": "Detské oblečenie",
    "footwear": "Obuv",
    "accessories": "Doplnky",
    "jewelry_watches": "Šperky a hodinky",
    "bags": "Kabelky a tašky",
    
    // Subcategories - Sports & Hobbies
    "fitness": "Fitness a posilňovanie",
    "cycling": "Cyklistika",
    "winter_sports": "Zimné športy",
    "ball_games": "Loptové hry",
    "camping": "Kempovanie a turistika",
    "fishing": "Rybárčenie",
    "shooting": "Streľba a airsoft",
    "musical_instruments": "Hudobné nástroje",
    "modeling": "Modelárstvo",
    
    // Subcategories - Children
    "toys": "Hračky",
    "strollers": "Kočíky",
    "children_furniture": "Detský nábytok",
    "car_seats": "Autosedačky",
    "equipment": "Potrebné vybavenie",
    
    // Subcategories - Animals
    "dogs": "Psy",
    "cats": "Mačky",
    "small_animals": "Malé zvieratá",
    "farm_animals": "Hospodárske zvieratá",
    "aquarium": "Akvaristika",
    "terrarium": "Teraristika",
    "accessories_for_animals": "Chovateľské potreby",
    "food": "Krmivo",
    
    // Condition options
    "all_conditions": "Všetky stavy",
    "new": "Nové",
    "used_like_new": "Použité - ako nové",
    "used_very_good": "Použité - veľmi dobrý stav",
    "used_good": "Použité - dobrý stav",
    "used_fair": "Použité - horší stav",
    
    // Sort options
    "newest": "Najnovšie",
    "oldest": "Najstaršie",
    "price_lowest": "Najlacnejšie",
    "price_highest": "Najdrahšie",
    
    // Date filter options
    "all_dates": "Všetky",
    "today": "Dnes",
    "this_week": "Tento týždeň",
    "this_month": "Tento mesiac",
    
    // Search
    "search_anything": "Hľadať čokoľvek...",
    "search": "Hľadať",
    "filters": "Filtre",
    "location": "Lokalita",
    "enter_city": "Zadajte mesto alebo PSČ...",
    "condition": "Stav",
    "date_added": "Dátum pridania",
    "price_range": "Cenové rozpätie",
    "from": "Od",
    "to": "Do",
    
    // Listings page
    "browse_listings": "Prehliadať inzeráty",
    "listing_singular": "inzerát",
    "listing_few": "inzeráty",
    "listing_many": "inzerátov",
    "sort_by": "Zoradiť podľa",
    "previous": "Predchádzajúce",
    "next": "Ďalšie",
    "no_listings": "Žiadne inzeráty",
    "no_listings_found": "Pre vaše vyhľadávanie neboli nájdené žiadne inzeráty.",
    "no_listings_in_category": "V tejto kategórii zatiaľ nie sú žiadne inzeráty.",
    "reset_filters": "Resetovať filtre",
    
    // Profile page
    "personal_info": "Osobné údaje",
    "edit_profile": "Upraviť profil",
    "change_password": "Zmeniť heslo",
    "notifications": "Oznámenia",
    "messages": "Správy",
    "saved_listings": "Uložené inzeráty",
    "account_settings": "Nastavenia účtu",
    "payment_methods": "Platobné metódy",
    "shipping_addresses": "Dodacie adresy",
    "privacy_settings": "Nastavenia súkromia",
    "delete_account": "Zmazať účet",
    "login_to_view_profile": "Prihláste sa pre zobrazenie profilu",
    "profile_login_message": "Pre zobrazenie vášho profilu sa musíte najprv prihlásiť.",
    "member_since": "Členom od",
    "name": "Meno",
    "email": "Email",
    "phone": "Telefón",
    "registration": "Registrácia",
    "overview": "Prehľad",
    "activity_stats": "Štatistiky vašich aktivít na Lepšom Trhovisku",
    "total": "Celkom",
    "active": "Aktívne",
    "sold": "Predané",
    
    // Item details
    "description": "Popis",
    "specifications": "Špecifikácie",
    "seller_info": "Informácie o predajcovi",
    "contact_seller": "Kontaktovať predajcu",
    "location_info": "Lokalita",
    "delivery_options": "Možnosti doručenia",
    "payment_options": "Možnosti platby",
    "similar_items": "Podobné položky",
    "report_item": "Nahlásiť inzerát",
    "share": "Zdieľať",
    "favorite": "Pridať do obľúbených",
    "item_posted": "Inzerát pridaný",
    "no_longer_available": "Už nie je dostupné",
  },
  
  en: {
    // Header
    "browse": "Browse",
    "sell": "Sell",
    "my_listings": "My Listings",
    "profile": "Profile",
    "settings": "Settings",
    "logout": "Logout",
    "login": "Login",
    "register": "Register",
    "open_menu": "Open menu",
    
    // Navigation
    "home": "Home",
    
    // Home page
    "find_anything": "Find anything you need",
    "buy_sell_easily": "Buy and sell easily on Better Marketplace",
    
    // Sidebar
    "categories": "Categories",
    
    // Category names
    "transport": "Transport",
    "electronics": "Electronics",
    "household": "Household",
    "garden_workshop": "Garden & Workshop",
    "fashion": "Fashion",
    "sport_hobby": "Sports & Hobbies",
    "children": "Children",
    "animals": "Animals",
    
    // Subcategories - Transport
    "cars": "Cars",
    "motorcycles": "Motorcycles",
    "trucks": "Trucks",
    "buses": "Buses",
    "trailers": "Trailers",
    "spare_parts": "Spare Parts",
    "tires_discs": "Tires & Discs",
    "car_accessories": "Car Accessories",
    "boats": "Boats",
    "bicycles": "Bicycles & E-bikes",
    
    // Subcategories - Electronics
    "mobile_phones": "Mobile Phones",
    "tablets": "Tablets",
    "laptops": "Laptops",
    "computers": "Computers",
    "tv_audio_video": "TV, Audio & Video",
    "cameras": "Cameras",
    "gaming_consoles": "Gaming Consoles",
    "pc_accessories": "PC Accessories",
    "smart_watches": "Smart Watches",
    "network_devices": "Network Devices",
    
    // Subcategories - Household
    "furniture": "Furniture",
    "appliances": "Appliances",
    "kitchen_appliances": "Kitchen Appliances",
    "home_appliances": "Home Appliances",
    "decorations": "Decorations",
    "lighting": "Lighting",
    "household_items": "Household Items",
    "cleaning_equipment": "Cleaning Equipment",
    "bathroom": "Bathroom & WC",
    
    // Subcategories - Garden & Workshop
    "garden_tools": "Garden Tools",
    "machines_mowers": "Machines & Mowers",
    "garden_furniture": "Garden Furniture",
    "plants": "Plants & Flowers",
    "grills": "Grills & Equipment",
    "tools": "Tools & Workshop Equipment",
    "building_materials": "Building Materials",
    
    // Subcategories - Fashion
    "men": "Men's Clothing",
    "women": "Women's Clothing",
    "children_clothes": "Children's Clothing",
    "footwear": "Footwear",
    "accessories": "Accessories",
    "jewelry_watches": "Jewelry & Watches",
    "bags": "Bags & Handbags",
    
    // Subcategories - Sports & Hobbies
    "fitness": "Fitness & Training",
    "cycling": "Cycling",
    "winter_sports": "Winter Sports",
    "ball_games": "Ball Games",
    "camping": "Camping & Hiking",
    "fishing": "Fishing",
    "shooting": "Shooting & Airsoft",
    "musical_instruments": "Musical Instruments",
    "modeling": "Modeling",
    
    // Subcategories - Children
    "toys": "Toys",
    "strollers": "Strollers",
    "children_furniture": "Children's Furniture",
    "car_seats": "Car Seats",
    "equipment": "Equipment",
    
    // Subcategories - Animals
    "dogs": "Dogs",
    "cats": "Cats",
    "small_animals": "Small Animals",
    "farm_animals": "Farm Animals",
    "aquarium": "Aquarium",
    "terrarium": "Terrarium",
    "accessories_for_animals": "Pet Supplies",
    "food": "Pet Food",
    
    // Condition options
    "all_conditions": "All Conditions",
    "new": "New",
    "used_like_new": "Used - Like New",
    "used_very_good": "Used - Very Good",
    "used_good": "Used - Good",
    "used_fair": "Used - Fair",
    
    // Sort options
    "newest": "Newest",
    "oldest": "Oldest",
    "price_lowest": "Lowest Price",
    "price_highest": "Highest Price",
    
    // Date filter options
    "all_dates": "All",
    "today": "Today",
    "this_week": "This Week",
    "this_month": "This Month",
    
    // Search
    "search_anything": "Search anything...",
    "search": "Search",
    "filters": "Filters",
    "location": "Location",
    "enter_city": "Enter city or ZIP code...",
    "condition": "Condition",
    "date_added": "Date Added",
    "price_range": "Price Range",
    "from": "From",
    "to": "To",
    
    // Listings page
    "browse_listings": "Browse Listings",
    "listing_singular": "listing",
    "listing_few": "listings",
    "listing_many": "listings",
    "sort_by": "Sort by",
    "previous": "Previous",
    "next": "Next",
    "no_listings": "No Listings",
    "no_listings_found": "No listings were found for your search.",
    "no_listings_in_category": "No listings found in this category.",
    "reset_filters": "Reset Filters",
    
    // Profile page
    "personal_info": "Personal Information",
    "edit_profile": "Edit Profile",
    "change_password": "Change Password",
    "notifications": "Notifications",
    "messages": "Messages",
    "saved_listings": "Saved Listings",
    "account_settings": "Account Settings",
    "payment_methods": "Payment Methods",
    "shipping_addresses": "Shipping Addresses",
    "privacy_settings": "Privacy Settings",
    "delete_account": "Delete Account",
    "login_to_view_profile": "Login to view your profile",
    "profile_login_message": "You need to be logged in to view your profile.",
    "member_since": "Member since",
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "registration": "Registration",
    "overview": "Overview",
    "activity_stats": "Statistics of your activities on Better Marketplace",
    "total": "Total",
    "active": "Active",
    "sold": "Sold",
    
    // Item details
    "description": "Description",
    "specifications": "Specifications",
    "seller_info": "Seller Information",
    "contact_seller": "Contact Seller",
    "location_info": "Location",
    "delivery_options": "Delivery Options",
    "payment_options": "Payment Options",
    "similar_items": "Similar Items",
    "report_item": "Report Item",
    "share": "Share",
    "favorite": "Add to Favorites",
    "item_posted": "Posted",
    "no_longer_available": "No Longer Available",
  }
};

// Map category and condition IDs to translation keys
export const categoryTranslationMap: Record<string, string> = {
  "doprava": "transport",
  "elektronika": "electronics",
  "domacnost": "household",
  "zahrada-dilna": "garden_workshop",
  "moda": "fashion",
  "sport-hobby": "sport_hobby",
  "deti": "children",
  "zvirata": "animals",
};

// Map subcategory IDs to translation keys
export const subcategoryTranslationMap: Record<string, string> = {
  // Transport subcategories
  "automobily": "cars",
  "motorky": "motorcycles",
  "nakladni-vozidla": "trucks",
  "autobusy": "buses",
  "privesy-navesy": "trailers",
  "nahradni-dily": "spare_parts",
  "pneumatiky-disky": "tires_discs",
  "autoprislusenstvi": "car_accessories",
  "lode-cluny": "boats",
  "kola": "bicycles",
  
  // Electronics subcategories
  "mobilni-telefony": "mobile_phones",
  "tablety": "tablets",
  "notebooky": "laptops",
  "pocitace": "computers",
  "tv-audio-video": "tv_audio_video",
  "fotoaparaty": "cameras",
  "herni-konzole": "gaming_consoles",
  "pc-prislusenstvi": "pc_accessories",
  "smart-hodinky": "smart_watches",
  "sitove-prvky": "network_devices",
  
  // Household subcategories
  "nabytek": "furniture",
  "bila-technika": "appliances",
  "kuchynske-spotrebice": "kitchen_appliances",
  "domaci-spotrebice": "home_appliances",
  "dekorace": "decorations",
  "osvetleni": "lighting",
  "domaci-potreby": "household_items",
  "cistici-technika": "cleaning_equipment",
  "koupelna": "bathroom",
  
  // Garden & Workshop subcategories
  "zahradni-naradi": "garden_tools",
  "stroje-sekacky": "machines_mowers",
  "zahradni-nabytek": "garden_furniture",
  "rostliny": "plants",
  "grily": "grills",
  "naradi": "tools",
  "stavebni-material": "building_materials",
  
  // Fashion subcategories
  "muzi": "men",
  "zeny": "women",
  "deti": "children_clothes",
  "obuv": "footwear",
  "doplnky": "accessories",
  "sperky-hodinky": "jewelry_watches",
  "kabelky-tasky": "bags",
  
  // Sports & Hobbies subcategories
  "fitness": "fitness",
  "cyklistika": "cycling",
  "zimni-sporty": "winter_sports",
  "micove-hry": "ball_games",
  "kempovani": "camping",
  "rybareni": "fishing",
  "strelectvi": "shooting",
  "hudebni-nastroje": "musical_instruments",
  "modelarstvi": "modeling",
  
  // Children subcategories
  "hracky": "toys",
  "kocarky": "strollers",
  "autosedacky": "car_seats",
  "vybaveni": "equipment",
  
  // Animals subcategories
  "psi": "dogs",
  "kocky": "cats",
  "mala-zvirata": "small_animals",
  "hospodariska-zvirata": "farm_animals",
  "akvaristika": "aquarium",
  "teraristika": "terrarium",
  "chovatelske-potreby": "accessories_for_animals",
  "krmivo": "food",
};

export const conditionTranslationMap: Record<string, string> = {
  "all": "all_conditions",
  "nove": "new",
  "jako_nove": "used_like_new",
  "velmi_dobre": "used_very_good",
  "dobre": "used_good",
  "horsi": "used_fair",
}; 