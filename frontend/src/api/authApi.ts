import { ApiError, apiFetch } from "@/lib/api-client";

export async function loginUser(email: string, password: string) {
  try {
    return await apiFetch("/auth/login", { method: "POST", body: { email, password } });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      throw new ApiError(401, "invalid_credentials");
    }
    throw error;
  }
}

export async function registerUser(userData: { username: string; email: string; password: string }) {
  return apiFetch<string>("/auth/register", { method: "POST", body: userData, responseType: "text" });
}

export async function logoutUser() {
  await apiFetch("/auth/logout", { method: "POST", responseType: "none" });
  return true;
}
