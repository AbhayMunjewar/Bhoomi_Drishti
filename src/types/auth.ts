export type UserRole = 
  | 'ADMIN'
  | 'HIGHER_AUTHORITY'
  | 'DATA_GIS_OFFICER'
  | 'RESEARCHER'
  | 'POLICY_PLANNING_OFFICER'
  | 'INSTITUTION_USER'
  | 'PUBLIC_USER';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  officialId: string;
  role: UserRole;
  department: string;
  jurisdictionState?: string;
  jurisdictionDistrict?: string;
  organization?: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  token: string | null;
}
