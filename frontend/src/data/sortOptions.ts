export interface SortOption {
  value: string;
}

export const sortOptions: SortOption[] = [
  { value: "newest" },
  { value: "oldest" },
  { value: "price_asc" },
  { value: "price_desc" },
];