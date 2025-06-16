export const sortOptions = [
  { id: "NEWEST", value: "newest" },
  { id: "OLDEST", value: "oldest" },
  { id: "PRICE_ASC", value: "price_lowest" },
  { id: "PRICE_DESC", value: "price_highest" },
];

// Helper function to map frontend sorting to backend sorting
export const mapSortingToBackend = (frontendSort: string): "NEWEST" | "OLDEST" | "PRICE_ASC" | "PRICE_DESC" => {
  const option = sortOptions.find(opt => opt.value === frontendSort);
  return option?.id as "NEWEST" | "OLDEST" | "PRICE_ASC" | "PRICE_DESC" || "NEWEST";
};