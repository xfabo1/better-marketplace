import { csTranslations } from './cs';
import { skTranslations } from './sk';
import { enTranslations } from './en';

// Define available languages
export type Language = 'cs' | 'sk' | 'en';

// Translation data structure
export type TranslationData = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Combined translations for the site
export const translations: TranslationData = {
  cs: csTranslations,
  sk: skTranslations,
  en: enTranslations
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
  "nabytek": "furniture",
  "kultura-vzdelavani": "culture_education",
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
  
  // Culture & Education subcategories
  "knihy": "books",
  "ucebnice": "textbooks",
  "cd-dvd": "cds_dvds",
  "obrazy": "posters_pictures",
};

export const conditionTranslationMap: Record<string, string> = {
  "all": "all_conditions",
  "nove": "new",
  "jako_nove": "used_like_new",
  "velmi_dobre": "used_very_good",
  "dobre": "used_good",
  "horsi": "used_fair",
};
