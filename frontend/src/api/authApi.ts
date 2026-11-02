// The backend is on a different origin (port 8080), so requests need credentials: 'include' to send the auth cookie
const API_BASE_URL = 'http://localhost:8080/api/better-marketplace';

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      const error = new Error(errorText || 'Login failed');
      
      if (response.status === 401) {
        error.message = 'invalid_credentials';
      }

      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw Error('Network error: Unable to connect to the server');
    }
    
    throw error;
  }
}

export async function registerUser(userData: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      if (errorText === 'email_used') {
        throw new Error('email_used');
      } else if (errorText === 'username_used') {
        throw new Error('username_used');
      } else {
        throw Error(errorText || 'Registration failed');
      }
    }

    const result = await response.text();
    return result;
  } catch (error) {
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
       throw Error('Network error: Unable to connect to the server');
    }

    throw error;
  }
}

export async function logoutUser() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Logout failed');
    }

    return true;
} 