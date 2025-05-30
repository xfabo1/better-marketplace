// Categories and subcategories data structure for the application

// Category interface
export interface Category {
  id: string;
  name: string;
  href: string;
  subcategories?: Subcategory[];
}

// Subcategory interface
export interface Subcategory {
  id: string;
  name: string;
  href: string;
}

// Categories data structure
export const categories: Category[] = [
  {
    id: "transport",
    name: "Doprava",
    href: "/category/doprava",
    subcategories: [
      { id: "cars", name: "Automobily", href: "/category/doprava/automobily" },
      { id: "motorcycles", name: "Motorky", href: "/category/doprava/motorky" },
      { id: "trucks", name: "Nákladní vozidla", href: "/category/doprava/nakladni-vozidla" },
      { id: "buses", name: "Autobusy", href: "/category/doprava/autobusy" },
      { id: "trailers", name: "Přívěsy a návěsy", href: "/category/doprava/privesy-navesy" },
      { id: "spare_parts", name: "Náhradní díly", href: "/category/doprava/nahradni-dily" },
      { id: "tires_discs", name: "Pneumatiky a disky", href: "/category/doprava/pneumatiky-disky" },
      { id: "car_accessories", name: "Autopříslušenství", href: "/category/doprava/autoprislusenstvi" },
      { id: "boats", name: "Lodě a čluny", href: "/category/doprava/lode-cluny" },
      { id: "bicycles", name: "Kola a elektrokola", href: "/category/doprava/kola" },
    ],
  },
  {
    id: "electronics",
    name: "Elektronika",
    href: "/category/elektronika",
    subcategories: [
      { id: "mobile_phones", name: "Mobilní telefony", href: "/category/elektronika/mobilni-telefony" },
      { id: "tablets", name: "Tablety", href: "/category/elektronika/tablety" },
      { id: "laptops", name: "Notebooky", href: "/category/elektronika/notebooky" },
      { id: "computers", name: "Počítače", href: "/category/elektronika/pocitace" },
      { id: "tv_audio_video", name: "TV, audio, video", href: "/category/elektronika/tv-audio-video" },
      { id: "cameras", name: "Fotoaparáty a kamery", href: "/category/elektronika/fotoaparaty" },
      { id: "gaming_consoles", name: "Herní konzole a hry", href: "/category/elektronika/herni-konzole" },
      { id: "pc_accessories", name: "PC příslušenství", href: "/category/elektronika/pc-prislusenstvi" },
      { id: "smart_watches", name: "Chytré hodinky a náramky", href: "/category/elektronika/smart-hodinky" },
      { id: "network_devices", name: "Síťové prvky a routery", href: "/category/elektronika/sitove-prvky" },
    ],
  },
  {
    id: "household",
    name: "Domácnost",
    href: "/category/domacnost",
    subcategories: [
      { id: "furniture", name: "Nábytek", href: "/category/domacnost/nabytek" },
      { id: "appliances", name: "Bílá technika", href: "/category/domacnost/bila-technika" },
      { id: "kitchen_appliances", name: "Kuchyňské spotřebiče", href: "/category/domacnost/kuchynske-spotrebice" },
      { id: "home_appliances", name: "Domácí spotřebiče", href: "/category/domacnost/domaci-spotrebice" },
      { id: "decorations", name: "Dekorace", href: "/category/domacnost/dekorace" },
      { id: "lighting", name: "Osvětlení", href: "/category/domacnost/osvetleni" },
      { id: "household_items", name: "Domácí potřeby", href: "/category/domacnost/domaci-potreby" },
      { id: "cleaning_equipment", name: "Čisticí technika", href: "/category/domacnost/cistici-technika" },
      { id: "bathroom", name: "Koupelna a WC", href: "/category/domacnost/koupelna" },
    ],
  },
  {
    id: "garden_workshop",
    name: "Zahrada a dílna",
    href: "/category/zahrada-dilna",
    subcategories: [
      { id: "garden_tools", name: "Zahradní nářadí", href: "/category/zahrada-dilna/zahradni-naradi" },
      { id: "machines_mowers", name: "Stroje a sekačky", href: "/category/zahrada-dilna/stroje-sekacky" },
      { id: "garden_furniture", name: "Nábytek na zahradu", href: "/category/zahrada-dilna/zahradni-nabytek" },
      { id: "plants", name: "Rostliny a květiny", href: "/category/zahrada-dilna/rostliny" },
      { id: "grills", name: "Grily a vybavení", href: "/category/zahrada-dilna/grily" },
      { id: "tools", name: "Nářadí a vybavení dílny", href: "/category/zahrada-dilna/naradi" },
      { id: "building_materials", name: "Stavební materiál", href: "/category/zahrada-dilna/stavebni-material" },
    ],
  },
  {
    id: "fashion",
    name: "Móda",
    href: "/category/moda",
    subcategories: [
      { id: "men", name: "Oblečení - muži", href: "/category/moda/muzi" },
      { id: "women", name: "Oblečení - ženy", href: "/category/moda/zeny" },
      { id: "children_clothes", name: "Dětské oblečení", href: "/category/moda/deti" },
      { id: "footwear", name: "Obuv", href: "/category/moda/obuv" },
      { id: "accessories", name: "Doplňky", href: "/category/moda/doplnky" },
      { id: "jewelry_watches", name: "Šperky a hodinky", href: "/category/moda/sperky-hodinky" },
      { id: "bags", name: "Kabelky a tašky", href: "/category/moda/kabelky-tasky" },
    ],
  },
  {
    id: "sport_hobby",
    name: "Sport a hobby",
    href: "/category/sport-hobby",
    subcategories: [
      { id: "fitness", name: "Fitness a posilování", href: "/category/sport-hobby/fitness" },
      { id: "cycling", name: "Cyklistika", href: "/category/sport-hobby/cyklistika" },
      { id: "winter_sports", name: "Zimní sporty", href: "/category/sport-hobby/zimni-sporty" },
      { id: "ball_games", name: "Míčové hry", href: "/category/sport-hobby/micove-hry" },
      { id: "camping", name: "Kempování a turistika", href: "/category/sport-hobby/kempovani" },
      { id: "fishing", name: "Rybaření", href: "/category/sport-hobby/rybareni" },
      { id: "shooting", name: "Střelectví a airsoft", href: "/category/sport-hobby/strelectvi" },
      { id: "musical_instruments", name: "Hudební nástroje", href: "/category/sport-hobby/hudebni-nastroje" },
      { id: "modeling", name: "Modelářství", href: "/category/sport-hobby/modelarstvi" },
    ],
  },
  {
    id: "children",
    name: "Děti",
    href: "/category/deti",
    subcategories: [
      { id: "toys", name: "Hračky", href: "/category/deti/hracky" },
      { id: "strollers", name: "Kočárky", href: "/category/deti/kocarky" },
      { id: "children_furniture", name: "Dětský nábytek", href: "/category/deti/nabytek" },
      { id: "car_seats", name: "Autosedačky", href: "/category/deti/autosedacky" },
      { id: "equipment", name: "Potřebné vybavení", href: "/category/deti/vybaveni" },
    ],
  },
  {
    id: "animals",
    name: "Zvířata",
    href: "/category/zvirata",
    subcategories: [
      { id: "dogs", name: "Psi", href: "/category/zvirata/psi" },
      { id: "cats", name: "Kočky", href: "/category/zvirata/kocky" },
      { id: "small_animals", name: "Hlodavci", href: "/category/zvirata/hlodavci" },
      { id: "terrarium", name: "Teraristika", href: "/category/zvirata/teraristika" },
      { id: "aquarium", name: "Akvária a ryby", href: "/category/zvirata/akvarium" },
      { id: "accessories_for_animals", name: "Krmivo a potřeby", href: "/category/zvirata/potreby" },
    ],
  },
  {
    id: "culture_education",
    name: "Kultura a vzdělávání",
    href: "/category/kultura-vzdelavani",
    subcategories: [
      { id: "books", name: "Knihy", href: "/category/kultura-vzdelavani/knihy" },
      { id: "textbooks", name: "Učebnice", href: "/category/kultura-vzdelavani/ucebnice" },
      { id: "cds_dvds", name: "CD, DVD, Blu-ray", href: "/category/kultura-vzdelavani/cd-dvd" },
      { id: "posters_pictures", name: "Plakáty a obrazy", href: "/category/kultura-vzdelavani/obrazy" },
    ],
  },
]; 