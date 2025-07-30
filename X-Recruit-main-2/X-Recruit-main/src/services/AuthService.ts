const API_BASE_URL = 'http://localhost:3001/api';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: User;
  };
}

export interface ApiError {
  success: false;
  message: string;
}

class AuthService {
  private getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success && data.data?.token) {
        this.setToken(data.data.token);
        this.setUser(data.data.user);
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  }

  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success && data.data?.token) {
        this.setToken(data.data.token);
        this.setUser(data.data.user);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  }

  async getUserProfile(): Promise<{ success: boolean; data?: { user: User }; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  }

  async checkApiHealth(): Promise<{ success: boolean; message: string; timestamp?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      return {
        success: false,
        message: 'Backend server is not responding. Please make sure the server is running.',
      };
    }
  }

  setToken(token: string): void {
    localStorage.setItem('xrecruit_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('xrecruit_token');
  }

  setUser(user: User): void {
    localStorage.setItem('xrecruit_user', JSON.stringify(user));
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('xrecruit_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Basic JWT structure check
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('xrecruit_token');
    localStorage.removeItem('xrecruit_user');
  }

  // Utility method to handle API errors consistently
  handleApiError(error: any): ApiError {
    if (error.message && error.success === false) {
      return error;
    }
    
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

// Export a singleton instance
export const authService = new AuthService();
export default authService;
