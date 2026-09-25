// Categories are identified by English ids, which are also the translation keys (t(category.id))
export interface Category {
  id: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
}

export const categories: Category[] = [
  {
    id: "transport",
    subcategories: [
      { id: "cars" },
      { id: "motorcycles" },
      { id: "trucks" },
      { id: "buses" },
      { id: "trailers" },
      { id: "spare_parts" },
      { id: "tires_discs" },
      { id: "car_accessories" },
      { id: "boats" },
      { id: "bicycles" },
    ],
  },
  {
    id: "electronics",
    subcategories: [
      { id: "mobile_phones" },
      { id: "tablets" },
      { id: "laptops" },
      { id: "computers" },
      { id: "tv_audio_video" },
      { id: "cameras" },
      { id: "gaming_consoles" },
      { id: "pc_accessories" },
      { id: "smart_watches" },
      { id: "network_devices" },
    ],
  },
  {
    id: "household",
    subcategories: [
      { id: "furniture" },
      { id: "appliances" },
      { id: "kitchen_appliances" },
      { id: "home_appliances" },
      { id: "decorations" },
      { id: "lighting" },
      { id: "household_items" },
      { id: "cleaning_equipment" },
      { id: "bathroom" },
    ],
  },
  {
    id: "garden_workshop",
    subcategories: [
      { id: "garden_tools" },
      { id: "machines_mowers" },
      { id: "garden_furniture" },
      { id: "plants" },
      { id: "grills" },
      { id: "tools" },
      { id: "building_materials" },
    ],
  },
  {
    id: "fashion",
    subcategories: [
      { id: "men" },
      { id: "women" },
      { id: "children_clothes" },
      { id: "footwear" },
      { id: "accessories" },
      { id: "jewelry_watches" },
      { id: "bags" },
    ],
  },
  {
    id: "sport_hobby",
    subcategories: [
      { id: "fitness" },
      { id: "cycling" },
      { id: "winter_sports" },
      { id: "ball_games" },
      { id: "camping" },
      { id: "fishing" },
      { id: "shooting" },
      { id: "musical_instruments" },
      { id: "modeling" },
    ],
  },
  {
    id: "children",
    subcategories: [
      { id: "toys" },
      { id: "strollers" },
      { id: "children_furniture" },
      { id: "car_seats" },
      { id: "equipment" },
    ],
  },
  {
    id: "animals",
    subcategories: [
      { id: "dogs" },
      { id: "cats" },
      { id: "small_animals" },
      { id: "terrarium" },
      { id: "aquarium" },
      { id: "accessories_for_animals" },
    ],
  },
  {
    id: "culture_education",
    subcategories: [
      { id: "books" },
      { id: "textbooks" },
      { id: "cds_dvds" },
      { id: "posters_pictures" },
    ],
  },
]; 
/** URL of a category page, e.g. /category/transport/motorcycles */
export function categoryHref(categoryId: string, subcategoryId?: string): string {
  return subcategoryId ? `/category/${categoryId}/${subcategoryId}` : `/category/${categoryId}`;
}
