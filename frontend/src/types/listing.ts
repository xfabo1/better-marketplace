// Shared interface for listings used across the application
export interface Listing {
  // Backend fields from PreviewItemDto
  name: string;
  country: string;
  postalCode: string;
  placeName: string;
  price: number;
  currency: string;
  category: string;
  condition: string;
  
  // Frontend specific fields that need to be added
  id?: string; // Will be provided by backend eventually
  imageUrl?: string; // Will be provided by backend eventually
} 