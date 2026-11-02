/** The logged-in user as the frontend keeps it (in localStorage, until it comes from the backend). */
export interface User {
  name: string;
  email: string;
  phone: string;
}

/** Body of POST /auth/register (RegisterUserDto). */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
