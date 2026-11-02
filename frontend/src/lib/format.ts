/** "25.09.2026" */
export function formatDate(dateString: string): string {
  return new Date(dateString)
    .toLocaleDateString("cs-CZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\s/g, "");
}

/** "229,000 CZK" (the number uses the browser's locale) */
export function formatPrice(price: number, currency: string): string {
  return `${price.toLocaleString()} ${currency}`;
}
