export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/better-marketplace";

export const NETWORK_ERROR_MESSAGE = "Network error: Unable to connect to the server";

/**
 * A failed API call. {@code message} is the response body, which for this backend is a short code such as
 * "email_used" or "invalid_password"; {@code status} is 0 when the server could not be reached at all.
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ResponseType = "json" | "text" | "none";

interface ApiRequest {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  responseType?: ResponseType;
}

export async function apiFetch<T = void>(
  path: string,
  { method = "GET", body, responseType = "json" }: ApiRequest = {}
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      // The backend is on a different origin, so the auth cookie is only sent with credentials: "include"
      credentials: "include",
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, NETWORK_ERROR_MESSAGE);
  }

  if (!response.ok) {
    throw new ApiError(response.status, (await response.text()) || response.statusText);
  }

  if (responseType === "none") return undefined as T;
  if (responseType === "text") return (await response.text()) as T;
  return (await response.json()) as T;
}

/** Builds "?a=1&b=2" from the defined, non-empty values; empty string when there are none. */
export function toQueryString(params: Record<string, string | number | undefined>): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  }
  const text = query.toString();
  return text ? `?${text}` : "";
}
