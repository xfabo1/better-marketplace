// Item condition definitions

// Condition option interface
export interface ConditionOption {
  id: string;
  value: string; // Translation key
}

// Condition options available for filtering (includes "all" option)
export const conditions: ConditionOption[] = [
  { id: "all", value: "all_conditions" },
  { id: "new", value: "new" },
  { id: "used_like_new", value: "used_like_new" },
  { id: "used_very_good", value: "used_very_good" },
  { id: "used_good", value: "used_good" },
  { id: "used_fair", value: "used_fair" }
];

// Condition options for creating listings (excludes "all" option)
export const createConditions: ConditionOption[] = [
  { id: "new", value: "new" },
  { id: "used_like_new", value: "used_like_new" },
  { id: "used_very_good", value: "used_very_good" },
  { id: "used_good", value: "used_good" },
  { id: "used_fair", value: "used_fair" }
]; 