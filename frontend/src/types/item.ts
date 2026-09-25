// Shapes of the item data exchanged with the backend (see the DTOs in backend/.../api/dto/item)

/** An item in search results (PreviewItemDto). */
export interface PreviewItem {
  id: number;
  name: string;
  price: number;
  currency: string;
  imageUrl: string | null;
  condition: string;
  createdAt: string;
}

/** Everything shown on the listing detail page (ItemFullDetailsDto). */
export interface ItemDetails {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  currency: string;
  category: string | null;
  subcategory: string | null;
  condition: string;
  username: string | null;
  sellerMemberSince: string | null;
  email: string;
  phoneNumber: string;
  placeName: string;
  city: string;
  postalCode: string;
  createdAt: string;
}

/** Body of POST /v1/items/item (CreateItemDto). */
export interface CreateItemRequest {
  name: string;
  price: number;
  currency: string;
  description: string;
  imageUrl: string;
  locationId: number;
  email: string;
  phoneNumber: string;
  category?: string;
  subcategory?: string;
  condition: string;
}

/** Body of PUT /v1/items/item/{id} (UpdateItemDto); only the given fields change. */
export interface UpdateItemRequest {
  name?: string;
  description?: string;
  currency?: string;
  price?: number;
  locationId?: number;
  imageUrl?: string;
  email?: string;
  phoneNumber?: string;
}
