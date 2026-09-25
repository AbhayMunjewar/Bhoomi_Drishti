import { create } from 'zustand';
import { UserProfile, UserRole } from '../types/auth';
import { MOCK_USERS } from '../data/mockAuth';

interface AuthStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  getAuthorizedPortalPath: () => string;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null, // Unauthenticated by default until an authorized user logs in at /login
  isAuthenticated: false,

  login: (role: UserRole) => {
    const userProfile = MOCK_USERS[role] || MOCK_USERS['PUBLIC_USER'];
    set({ user: userProfile, isAuthenticated: true });
  },

  loginAsRole: (role: UserRole) => {
    const userProfile = MOCK_USERS[role] || MOCK_USERS['PUBLIC_USER'];
    set({ user: userProfile, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  getAuthorizedPortalPath: () => {
    const user = get().user;
    if (!user) return '/public';

    switch (user.role) {
      case 'ADMIN':
        return '/admin/dashboard';
      case 'DATA_GIS_OFFICER':
        return '/data/dashboard';
      case 'RESEARCHER':
        return '/research/dashboard';
      case 'POLICY_PLANNING_OFFICER':
        return '/government/dashboard';
      case 'INSTITUTION_USER':
        return '/institution/dashboard';
      case 'PUBLIC_USER':
      default:
        return '/public';
    }
  }
}));
