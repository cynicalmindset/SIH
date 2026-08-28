/**
 * Planet Maritime Intelligence — Authentication & Session Service
 * ────────────────────────────────────────────────────────────────
 * Supports dual-mode authentication:
 *   1. Development Auth Bypass (enabled when VITE_DEV_AUTH_BYPASS !== 'false')
 *   2. Real Backend Authentication (calls /api/auth/login and /api/auth/me)
 *
 * Production Readiness Rules:
 *   • Never store plaintext passwords or password hashes in localStorage
 *   • Token storage uses standard JWT session key
 *   • Role authorization comes directly from authenticated user object
 */

const IS_DEV_BYPASS = import.meta.env.VITE_DEV_AUTH_BYPASS !== 'false';
const TOKEN_KEY = 'planet_token';
const USER_KEY = 'planet_user';

export const authService = {
  /**
   * Check if user is currently authenticated
   */
  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },

  /**
   * Get currently authenticated user object
   */
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(USER_KEY);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  /**
   * Get assigned role for current session
   */
  getUserRole() {
    const user = this.getCurrentUser();
    return user?.role || localStorage.getItem('planet_ui_role') || 'ANALYST';
  },

  /**
   * Authenticate user with backend or dev bypass
   */
  async login(email, password) {
    if (IS_DEV_BYPASS) {
      // Development Auth Bypass
      const mockRole = localStorage.getItem('planet_ui_role') || 'ANALYST';
      const mockUser = {
        id: 'usr_dev_01',
        email: email || 'analyst@planet.maritime',
        name: email ? email.split('@')[0] : 'Alexander Wright',
        role: mockRole,
      };
      const mockToken = 'dev_mock_jwt_token_' + Date.now();

      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
      return { success: true, user: mockUser, token: mockToken, isBypass: true };
    }

    // Production Real Backend Authentication
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      return { success: true, user: data.user, token: data.token, isBypass: false };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  /**
   * Validate current session with backend (if connected)
   */
  async validateSession() {
    if (IS_DEV_BYPASS) {
      return this.isAuthenticated();
    }

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;

    try {
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        this.logout();
        return false;
      }
      const user = await response.json();
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return true;
    } catch {
      // Backend offline: keep local session token if available
      return this.isAuthenticated();
    }
  },

  /**
   * Clear session token and user state
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('planet_ui_role');
    localStorage.removeItem('planet_onboarding_step');
    localStorage.removeItem('planet_user_avatar');
  },
};
