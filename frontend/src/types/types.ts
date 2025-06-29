export interface PreviewItemDto {
  id: number;
  title: string;
  price: number;
  currency: string;
  placeName: string;
  postalCode: string;
  country: string;
  category?: string;
  condition: string;
}

export interface CreateItemDto {
  title: string;
  price: number;
  phoneNumber: string;
  email: string;
  currency: string;
  locationId: number;
  category: string;
  subcategory: string;
  condition: string;
  description: string;
  images: File[];
}

export interface UpdateItemDto {
  title: string;
  price: number;
  phoneNumber: string;
  email: string;
  currency: string;
  locationId: number;
  category: string;
  subcategory: string;
  condition: string;
  description: string;
  images: File[];
}

export interface ItemFullDetailsDto {
  id: number;
  title: string;
  description: string;
  images: string[];
  phoneNumber: string;
  username: string;
  email: string;
  memberSince: string;
  price: number;
  currency: string;
  locationId: number;
  placeName: string;
  postalCode: string;
  country: string;
  category: string;
  condition: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  body: T;
  message: string;
  statusCode: number;
}

export interface SearchItemsResponse {
  items: PreviewItemDto[];
  totalItems: number;
}

export interface SearchFilterDto {
  locationId?: number;
  minPrice?: number;
  maxPrice?: number;
  dateAdded?: string;
  condition?: string;
  searchText?: string;
  sorting?: string;
  maxMeterDistance?: number;
}

export interface CategorySearchFilterDto {
  category: string;
  subcategory: string;
  locationId?: number;
  minPrice?: number;
  maxPrice?: number;
  dateAdded?: string;
  condition?: string;
  searchText?: string;
  sorting?: string;
  maxMeterDistance?: number;
}

export interface SearchItemsParams {
  searchFilter: SearchFilterDto;
  page?: number;
  pageSize?: number;
}