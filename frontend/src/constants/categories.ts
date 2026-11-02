// Categories are identified by English ids, which are also the translation keys (t(category.id))
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
      { id: "spare_parts", href: "/category/transport/spare_parts" },
      { id: "tires_discs", href: "/category/transport/tires_discs" },
      { id: "car_accessories", href: "/category/transport/car_accessories" },
      { id: "boats", href: "/category/transport/boats" },
      { id: "bicycles", href: "/category/transport/bicycles" },
    ],
  },
  {
    id: "electronics",
    href: "/category/electronics",
    subcategories: [
      { id: "mobile_phones", href: "/category/electronics/mobile_phones" },
      { id: "tablets", href: "/category/electronics/tablets" },
      { id: "laptops", href: "/category/electronics/laptops" },
      { id: "computers", href: "/category/electronics/computers" },
      { id: "tv_audio_video", href: "/category/electronics/tv_audio_video" },
      { id: "cameras", href: "/category/electronics/cameras" },
      { id: "gaming_consoles", href: "/category/electronics/gaming_consoles" },
      { id: "pc_accessories", href: "/category/electronics/pc_accessories" },
      { id: "smart_watches", href: "/category/electronics/smart_watches" },
      { id: "network_devices", href: "/category/electronics/network_devices" },
    ],
  },
  {
    id: "household",
    href: "/category/household",
    subcategories: [
      { id: "furniture", href: "/category/household/furniture" },
      { id: "appliances", href: "/category/household/appliances" },
      { id: "kitchen_appliances", href: "/category/household/kitchen_appliances" },
      { id: "home_appliances", href: "/category/household/home_appliances" },
      { id: "decorations", href: "/category/household/decorations" },
      { id: "lighting", href: "/category/household/lighting" },
      { id: "household_items", href: "/category/household/household_items" },
      { id: "cleaning_equipment", href: "/category/household/cleaning_equipment" },
      { id: "bathroom", href: "/category/household/bathroom" },
    ],
  },
  {
    id: "garden_workshop",
    href: "/category/garden_workshop",
    subcategories: [
      { id: "garden_tools", href: "/category/garden_workshop/garden_tools" },
      { id: "machines_mowers", href: "/category/garden_workshop/machines_mowers" },
      { id: "garden_furniture", href: "/category/garden_workshop/garden_furniture" },
      { id: "plants", href: "/category/garden_workshop/plants" },
      { id: "grills", href: "/category/garden_workshop/grills" },
      { id: "tools", href: "/category/garden_workshop/tools" },
      { id: "building_materials", href: "/category/garden_workshop/building_materials" },
    ],
  },
  {
    id: "fashion",
    href: "/category/fashion",
    subcategories: [
      { id: "men", href: "/category/fashion/men" },
      { id: "women", href: "/category/fashion/women" },
      { id: "children_clothes", href: "/category/fashion/children_clothes" },
      { id: "footwear", href: "/category/fashion/footwear" },
      { id: "accessories", href: "/category/fashion/accessories" },
      { id: "jewelry_watches", href: "/category/fashion/jewelry_watches" },
      { id: "bags", href: "/category/fashion/bags" },
    ],
  },
  {
    id: "sport_hobby",
    href: "/category/sport_hobby",
    subcategories: [
      { id: "fitness", href: "/category/sport_hobby/fitness" },
      { id: "cycling", href: "/category/sport_hobby/cycling" },
      { id: "winter_sports", href: "/category/sport_hobby/winter_sports" },
      { id: "ball_games", href: "/category/sport_hobby/ball_games" },
      { id: "camping", href: "/category/sport_hobby/camping" },
      { id: "fishing", href: "/category/sport_hobby/fishing" },
      { id: "shooting", href: "/category/sport_hobby/shooting" },
      { id: "musical_instruments", href: "/category/sport_hobby/musical_instruments" },
      { id: "modeling", href: "/category/sport_hobby/modeling" },
    ],
  },
  {
    id: "children",
    href: "/category/children",
    subcategories: [
      { id: "toys", href: "/category/children/toys" },
      { id: "strollers", href: "/category/children/strollers" },
      { id: "children_furniture", href: "/category/children/children_furniture" },
      { id: "car_seats", href: "/category/children/car_seats" },
      { id: "equipment", href: "/category/children/equipment" },
    ],
  },
  {
    id: "animals",
    href: "/category/animals",
    subcategories: [
      { id: "dogs", href: "/category/animals/dogs" },
      { id: "cats", href: "/category/animals/cats" },
      { id: "small_animals", href: "/category/animals/small_animals" },
      { id: "terrarium", href: "/category/animals/terrarium" },
      { id: "aquarium", href: "/category/animals/aquarium" },
      { id: "accessories_for_animals", href: "/category/animals/accessories_for_animals" },
    ],
  },
  {
    id: "culture_education",
    href: "/category/culture_education",
    subcategories: [
      { id: "books", href: "/category/culture_education/books" },
      { id: "textbooks", href: "/category/culture_education/textbooks" },
      { id: "cds_dvds", href: "/category/culture_education/cds_dvds" },
      { id: "posters_pictures", href: "/category/culture_education/posters_pictures" },
    ],
  },
]; 
