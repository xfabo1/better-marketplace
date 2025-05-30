// Item condition definitions

// Condition option interface
export interface ConditionOption {
  id: string;
  name: string; // Translation key
}

// Condition options available for filtering and selection
export const conditions: ConditionOption[] = [
  { id: "all", name: "all_conditions" },
  { id: "new", name: "new" },
  { id: "used_like_new", name: "used_like_new" },
  { id: "used_very_good", name: "used_very_good" },
  { id: "used_good", name: "used_good" },
  { id: "used_fair", name: "used_fair" }
]; 