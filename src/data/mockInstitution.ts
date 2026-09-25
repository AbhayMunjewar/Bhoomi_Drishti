import { InstitutionProfile, InstitutionResearcher } from '../types/institution';

export const MOCK_INSTITUTION_PROFILE: InstitutionProfile = {
  id: 'inst-vjti-01',
  name: 'Veermata Jijabai Technological Institute (VJTI)',
  code: 'VJTI-MUMBAI',
  type: 'University',
  city: 'Mumbai',
  state: 'Maharashtra',
  researchersCount: 24,
  projectsCount: 12,
  publicationsCount: 38,
  datasetsCount: 8
};

export const MOCK_RESEARCHERS: InstitutionResearcher[] = [
  {
    id: 'res-101',
    name: 'Dr. Vikramaditya Joshi',
    designation: 'Associate Professor',
    department: 'Geoinformatics & Civil Engineering',
    email: 'v.joshi@vjti.ac.in',
    activeProjects: 3,
    publications: 14
  },
  {
    id: 'res-102',
    name: 'Prof. Smita Kulkarni',
    designation: 'Head of Department',
    department: 'Urban Land Governance Cell',
    email: 's.kulkarni@vjti.ac.in',
    activeProjects: 4,
    publications: 22
  },
  {
    id: 'res-103',
    name: 'Er. Rahul Deshmukh',
    designation: 'Senior Research Fellow',
    department: 'GIS & Hydrological Modeling',
    email: 'r.deshmukh@vjti.ac.in',
    activeProjects: 2,
    publications: 6
  }
];
