export interface DateFilterOption {
  value: string;
}

export const dateFilterOptions: DateFilterOption[] = [
  { value: "all_dates" },
  { value: "today" },
  { value: "this_week" },
  { value: "this_month" },
];