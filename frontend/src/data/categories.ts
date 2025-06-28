
export interface Category {
  id: string;
  href: string;
  subcategories?: Subcategory[];
}
export interface Subcategory {
  id: string;
  href: string;
}
export const categories: Category[] = [
  {
    id: "transport",
    href: "/category/transport",
    subcategories: [
      { id: "cars", href: "/category/transport/cars" },
      { id: "motorcycles", href: "/category/transport/motorcycles" },
      { id: "trucks", href: "/category/transport/trucks" },
      { id: "buses", href: "/category/transport/buses" },
      { id: "trailers", href: "/category/transport/trailers" },
      { id: "spare_parts", href: "/category/transport/spare-parts" },
      { id: "tires_discs", href: "/category/transport/tires-discs" },
      { id: "car_accessories", href: "/category/transport/car-accessories" },
      { id: "boats", href: "/category/transport/boats" },
      { id: "bicycles", href: "/category/transport/bicycles" },
    ],
  },
  {
    id: "electronics",
    href: "/category/electronics",
    subcategories: [
      { id: "mobile_phones", href: "/category/electronics/mobile-phones" },
      { id: "tablets", href: "/category/electronics/tablets" },
      { id: "laptops", href: "/category/electronics/laptops" },
      { id: "computers", href: "/category/electronics/computers" },
      { id: "tv_audio_video", href: "/category/electronics/tv-audio-video" },
      { id: "cameras", href: "/category/electronics/cameras" },
      { id: "gaming_consoles", href: "/category/electronics/gaming-consoles" },
      { id: "pc_accessories", href: "/category/electronics/pc-accessories" },
      { id: "smart_watches", href: "/category/electronics/smart-watches" },
      { id: "network_devices", href: "/category/electronics/network-devices" },
    ],
  },
  {
    id: "household",
    href: "/category/household",
    subcategories: [
      { id: "furniture", href: "/category/household/furniture" },
      { id: "appliances", href: "/category/household/appliances" },
      { id: "kitchen_appliances", href: "/category/household/kitchen-appliances" },
      { id: "home_appliances", href: "/category/household/home-appliances" },
      { id: "decorations", href: "/category/household/decorations" },
      { id: "lighting", href: "/category/household/lighting" },
      { id: "household_items", href: "/category/household/household-items" },
      { id: "cleaning_equipment", href: "/category/household/cleaning-equipment" },
      { id: "bathroom", href: "/category/household/bathroom" },
    ],
  },
  {
    id: "garden_workshop",
    href: "/category/garden-workshop",
    subcategories: [
      { id: "garden_tools", href: "/category/garden-workshop/garden-tools" },
      { id: "machines_mowers", href: "/category/garden-workshop/machines-mowers" },
      { id: "garden_furniture", href: "/category/garden-workshop/garden-furniture" },
      { id: "plants", href: "/category/garden-workshop/plants" },
      { id: "grills", href: "/category/garden-workshop/grills" },
      { id: "tools", href: "/category/garden-workshop/tools" },
      { id: "building_materials", href: "/category/garden-workshop/building-materials" },
    ],
  },
  {
    id: "fashion",
    href: "/category/fashion",
    subcategories: [
      { id: "men", href: "/category/fashion/men" },
      { id: "women", href: "/category/fashion/women" },
      { id: "children_clothes", href: "/category/fashion/children-clothes" },
      { id: "footwear", href: "/category/fashion/footwear" },
      { id: "accessories", href: "/category/fashion/accessories" },
      { id: "jewelry_watches", href: "/category/fashion/jewelry-watches" },
      { id: "bags", href: "/category/fashion/bags" },
    ],
  },
  {
    id: "sport_hobby",
    href: "/category/sport-hobby",
    subcategories: [
      { id: "fitness", href: "/category/sport-hobby/fitness" },
      { id: "cycling", href: "/category/sport-hobby/cycling" },
      { id: "winter_sports", href: "/category/sport-hobby/winter-sports" },
      { id: "ball_games", href: "/category/sport-hobby/ball-games" },
      { id: "camping", href: "/category/sport-hobby/camping" },
      { id: "fishing", href: "/category/sport-hobby/fishing" },
      { id: "shooting", href: "/category/sport-hobby/shooting" },
      { id: "musical_instruments", href: "/category/sport-hobby/musical-instruments" },
      { id: "modeling", href: "/category/sport-hobby/modeling" },
    ],
  },
  {
    id: "children",
    href: "/category/children",
    subcategories: [
      { id: "toys", href: "/category/children/toys" },
      { id: "strollers", href: "/category/children/strollers" },
      { id: "children_furniture", href: "/category/children/children-furniture" },
      { id: "car_seats", href: "/category/children/car-seats" },
      { id: "equipment", href: "/category/children/equipment" },
    ],
  },
  {
    id: "animals",
    href: "/category/animals",
    subcategories: [
      { id: "dogs", href: "/category/animals/dogs" },
      { id: "cats", href: "/category/animals/cats" },
      { id: "small_animals", href: "/category/animals/small-animals" },
      { id: "terrarium", href: "/category/animals/terrarium" },
      { id: "aquarium", href: "/category/animals/aquarium" },
      { id: "accessories_for_animals", href: "/category/animals/accessories" },
    ],
  },
  {
    id: "culture_education",
    href: "/category/culture-education",
    subcategories: [
      { id: "books", href: "/category/culture-education/books" },
      { id: "textbooks", href: "/category/culture-education/textbooks" },
      { id: "cds_dvds", href: "/category/culture-education/cds-dvds" },
      { id: "posters_pictures", href: "/category/culture-education/posters-pictures" },
    ],
  },
]; 