import { UserProfile } from '../types/auth';

export const MOCK_USERS: Record<string, UserProfile> = {
  ADMIN: {
    id: 'usr-admin-01',
    name: 'System Administrator',
    email: 'sysadmin@bhoomidrishti.gov.in',
    officialId: 'SYS-ADM-0001',
    role: 'ADMIN',
    department: 'National Land Intelligence Data Center',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  DATA_GIS_OFFICER: {
    id: 'usr-data-02',
    name: 'Shri Manoj Deshmukh',
    email: 'gis.officer@bhoomidrishti.gov.in',
    officialId: 'GIS-MH-HQ-9921',
    role: 'DATA_GIS_OFFICER',
    department: 'State Remote Sensing & Cadastral GIS Cell',
    jurisdictionState: 'Maharashtra',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  RESEARCHER: {
    id: 'usr-res-03',
    name: 'Dr. Vikramaditya Joshi',
    email: 'v.joshi@vjti.ac.in',
    officialId: 'RES-VJTI-2026',
    role: 'RESEARCHER',
    organization: 'Veermata Jijabai Technological Institute (VJTI)',
    department: 'Geoinformatics & Urban Governance Lab',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  POLICY_PLANNING_OFFICER: {
    id: 'usr-govt-pol-04',
    name: 'Smt. Ananya Deshmukh',
    email: 'policy.officer@niti.gov.in',
    officialId: 'GOV-NITI-POL-1092',
    role: 'POLICY_PLANNING_OFFICER',
    department: 'NITI Aayog & Planning Commission',
    jurisdictionState: 'Maharashtra',
    jurisdictionDistrict: 'Nagpur',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  INSTITUTION_USER: {
    id: 'usr-inst-05',
    name: 'Prof. Smita Kulkarni',
    email: 'admin.research@vjti.ac.in',
    officialId: 'INST-VJTI-ADM-01',
    role: 'INSTITUTION_USER',
    organization: 'VJTI Mumbai',
    department: 'Research & Consultancy Cell',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  PUBLIC_USER: {
    id: 'usr-pub-06',
    name: 'Public Citizen Access',
    email: 'citizen@open-data.in',
    officialId: 'PUBLIC-OPEN-ACCESS',
    role: 'PUBLIC_USER',
    department: 'Open Data Information Portal',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  HIGHER_AUTHORITY: {
    id: 'usr-auth-07',
    name: 'Dr. K. S. Rajan (IAS)',
    email: 'higher.authority@dolr.gov.in',
    officialId: 'GOV-DoLR-SEC-001',
    role: 'HIGHER_AUTHORITY',
    department: 'Department of Land Resources (DoLR), MoRD',
    jurisdictionState: 'National',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
};
